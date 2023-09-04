const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // top, right, bottom, left

export const generateBoard = (boardWidth, boardHeight, shipTypes) => {
    const board = [];
    const positions = [];

    for (let i = 0; i < boardWidth; i++) {
        for (let j = 0; j < boardHeight; j++) {
            board.push([i, j]);
        }
    }

    Object.entries(shipTypes).forEach(([shipName, ship]) => {
        positions.push({ ship: shipName, positions: generateShipPosition(boardWidth, boardHeight, board, ship) });
    });

    return positions;
};

const generateShipPosition = (boardWidth, boardHeight, board, ship) => {
    let availableDirections = 4;

    const startingX = Math.floor(Math.random() * boardWidth);
    const startingY = Math.floor(Math.random() * boardHeight);

    if (board.findIndex((tile) => tile[0] === startingX && tile[1] === startingY) >= 0) {
        let directionIndex = Math.floor(Math.random() * 4);

        while (availableDirections > 0) {
            const shipPosition = [[startingX, startingY]];
            let isDirectionClear = true;

            for (let i = 1; i < ship.size; i++) {
                const nextPosition = [startingX + directions[directionIndex][0] * i, startingY + directions[directionIndex][1] * i];
                shipPosition.push(nextPosition);

                isDirectionClear = isDirectionClear
                    && (board.findIndex((tile) => tile[0] === nextPosition[0] && tile[1] === nextPosition[1]) >= 0);
            }

            if (isDirectionClear) {
                for (let i = 0; i < shipPosition.length; i++) {
                    let positionInBoard = board.findIndex((tile) => tile[0] === shipPosition[i][0] && tile[1] === shipPosition[i][1]);
                    removeAllAdjacentTiles(board, shipPosition, positionInBoard);

                    positionInBoard = board.findIndex((tile) => tile[0] === shipPosition[i][0] && tile[1] === shipPosition[i][1]);
                    board.splice(positionInBoard, 1);
                }

                return shipPosition;
            }

            availableDirections -= 1;
            directionIndex = (directionIndex + 1) % 4;
        }
    }

    return generateShipPosition(boardWidth, boardHeight, board, ship);
};

const removeAllAdjacentTiles = (board, shipPosition, boardIndex) => {
    const tile = board[boardIndex];

    if (tile) {
        for (let i = 0; i < directions.length; i++) {
            const adjacentTile = [tile[0] + directions[i][0], tile[1] + directions[i][1]];

            if (
                board.findIndex((tile) => tile[0] === adjacentTile[0] && tile[1] === adjacentTile[1]) >= 0 &&
                shipPosition.findIndex((tile) => tile[0] === adjacentTile[0] && tile[1] === adjacentTile[1]) < 0
            ) {
                const adjacentTileIndex = board.findIndex((tile) => tile[0] === adjacentTile[0] && tile[1] === adjacentTile[1]);
                board.splice(adjacentTileIndex, 1);
            }
        }
    }
};

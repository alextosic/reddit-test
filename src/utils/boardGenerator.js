const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // top, right, bottom, left
const diagonalDirections = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

const isPositionInsideBoard = (position, board) => {
    return typeof board[position[0]] !== 'undefined' && typeof board[position[0]][position[1]] !== 'undefined';
};

const removeAllAdjacentTiles = (board, shipPartPosition) => {
    const allDirections = [...directions, ...diagonalDirections];

    for (let i = 0; i < allDirections.length; i++) {
        const adjacentTile = [shipPartPosition[0] + allDirections[i][0], shipPartPosition[1] + allDirections[i][1]];

        if (isPositionInsideBoard(adjacentTile, board)) {
            board[adjacentTile[0]][adjacentTile[1]] = 'X';
        }
    }
};

const generateShipPosition = (boardWidth, boardHeight, board, ship) => {
    let availableDirections = 4;

    const startingX = Math.floor(Math.random() * boardWidth);
    const startingY = Math.floor(Math.random() * boardHeight);

    if (!board[startingX][startingY]) {
        let directionIndex = Math.floor(Math.random() * 4);

        while (availableDirections > 0) {
            const shipPosition = [[startingX, startingY]];
            let isDirectionClear = true;

            for (let i = 1; i < ship.size; i++) {
                const nextPosition = [startingX + directions[directionIndex][0] * i, startingY + directions[directionIndex][1] * i];

                if (isPositionInsideBoard(nextPosition, board)) {
                    shipPosition.push(nextPosition);
                    isDirectionClear = isDirectionClear && !board[nextPosition[0]][nextPosition[1]];
                } else {
                    isDirectionClear = false;
                }
            }

            if (isDirectionClear) {
                for (let i = 0; i < shipPosition.length; i++) {
                    const shipPartPosition = shipPosition[i];

                    board[shipPartPosition[0]][shipPartPosition[1]] = 'X';
                    removeAllAdjacentTiles(board, shipPartPosition);
                }

                return shipPosition;
            }

            availableDirections -= 1;
            directionIndex = (directionIndex + 1) % 4;
        }
    }

    return generateShipPosition(boardWidth, boardHeight, board, ship);
};

export const generateBoard = (boardWidth, boardHeight, shipTypes) => {
    const board = [];
    const positions = [];

    for (let i = 0; i < boardHeight; i++) {
        board[i] = Array(boardWidth);

        for (let j = 0; j < boardWidth; j++) {
            board[i][j] = '';
        }
    }

    Object.entries(shipTypes).forEach(([shipName, ship]) => {
        positions.push({ ship: shipName, positions: generateShipPosition(boardWidth, boardHeight, board, ship) });
    });

    return positions;
};

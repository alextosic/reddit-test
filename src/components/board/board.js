import { useEffect, useState } from 'react';

import Tile from '../tile/tile';
import './board.scss';

function Board({ width, height, shipLayout, isGameOver, onMove }) {
    const [playableBoard, setPlayableBoard] = useState([]);
    const [shipStatus, setShipStatus] = useState({});

    useEffect(() => {
        const playableBoardCopy = [];
        const shipStatusCopy = {};

        for (let i = 0; i < height; i++) {
            playableBoardCopy[i] = Array(width);

            for (let j = 0; j < width; j++) {
                playableBoardCopy[i][j] = { ship: 'none', status: 'none' };
            }
        }

        shipLayout.layout.forEach((singleShipLayout) => {
           shipStatusCopy[singleShipLayout.ship] = {
               size: shipLayout.shipTypes[singleShipLayout.ship].size,
               hits: [],
           };

           singleShipLayout.positions.forEach((position) => {
               playableBoardCopy[position[0]][position[1]] = { ship: singleShipLayout.ship, status: 'none' };
           });
        });

        setPlayableBoard(playableBoardCopy);
        setShipStatus(shipStatusCopy);
    }, [width, height, shipLayout]);

    const onTileClick = ({ xIndex, yIndex }) => {
        if (!isGameOver) {
            const playableBoardCopy = [...playableBoard];
            const shipStatusCopy = { ...shipStatus };

            let currentMove = 'none';
            let shipSunk = false;

            if (playableBoardCopy[xIndex][yIndex].status === 'none') {
                if (playableBoardCopy[xIndex][yIndex].ship === 'none') {
                    currentMove = 'miss';
                } else {
                    shipStatusCopy[playableBoardCopy[xIndex][yIndex].ship].hits.push([xIndex, yIndex]);
                    currentMove = 'hit';

                    if (shipStatusCopy[playableBoardCopy[xIndex][yIndex].ship].hits.length === shipStatusCopy[playableBoardCopy[xIndex][yIndex].ship].size) {
                        shipSunk = true;
                    }
                }
            }

            playableBoardCopy[xIndex][yIndex].status = currentMove;

            setPlayableBoard(playableBoardCopy);
            setShipStatus(shipStatusCopy);

            const gameIsOver = Object.values(shipStatusCopy)
                .reduce((total, currentShip) => total && (currentShip.size === currentShip.hits.length), true);

            onMove({ currentMove, gameIsOver, shipSunk });
        }
    };

    return (
        <div className="board">
            {playableBoard.map((boardRow, rowIndex) => {
                return (
                    <div className="board-row" key={`row-${rowIndex}`}>
                        {boardRow.map((boardColumn, columnIndex) => {
                            return (
                                <Tile
                                    key={`tile-${rowIndex}-${columnIndex}`}
                                    tilesInRow={width}
                                    state={boardColumn.status}
                                    xIndex={rowIndex}
                                    yIndex={columnIndex}
                                    onClick={onTileClick}
                                    isGameOver={isGameOver}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default Board;

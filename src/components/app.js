import { useState } from 'react';

import Board from './board/board';

import shipLayout from '../constants/shipLayout.json';

function App() {
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [latestMove, setLatestMove] = useState('');

    const onBoardMove = ({ currentMove, shipSunk, gameIsOver }) => {
        if (currentMove === 'hit') {
            setHits(hits + 1);
        } else {
            setMisses(misses + 1);
        }

        setIsGameOver(gameIsOver);
        setLatestMove(shipSunk ? 'ship sunk' : currentMove);

        if (shipSunk) {
            alert('Ship sunk!');
        }

        if (isGameOver) {
            alert('Game Over!');
        }
    };

    return (
        <div>
            <Board width={11} height={10} shipLayout={shipLayout} onMove={onBoardMove} isGameOver={isGameOver} />
            {!isGameOver ? (
                <p>Latest move: {latestMove}</p>
            ) : (
                <div>
                    <p>Game over! Reload the page for a new game</p>
                    <p>Total hits: {hits}</p>
                    <p>Total misses: {misses}</p>
                </div>
            )}
        </div>
    );
}

export default App;

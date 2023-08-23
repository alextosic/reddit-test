import './tile.scss';

function Tile({ state, xIndex, yIndex, tilesInRow, onClick, isGameOver }) {
    const onTileClick = () => {
        onClick({ xIndex, yIndex });
    };

    return (
        <div
            className={['tile', state].join(' ')}
            style={{
                width: `${100 / tilesInRow}%`,
                paddingBottom: `${100 / tilesInRow}%`,
                pointerEvents: state === 'none' && !isGameOver ? 'initial' : 'none',
                cursor: state === 'none' && !isGameOver ? 'pointer' : 'initial',
            }}
            onClick={onTileClick}
        />
    );
}

export default Tile;

const Score = ({actualScore, bestScore}) => {
    return (
        <div className="score-banner">
            <div>Score: {actualScore}</div>
            <div>Best: {bestScore}</div>
        </div>
    );
};

export default Score;
import './square.css';

const Square = ({ color, index, food, zIndex }) => {
    return <div className={`square ${food}`} style={{backgroundColor: color, zIndex}}></div>
};

export default Square;
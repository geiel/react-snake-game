import './square.css';

const Square = ({ color, index, food }) => {
    return <div className={`square ${food}`} style={{backgroundColor: color}}></div>
};

export default Square;
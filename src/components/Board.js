import { useEffect } from "react";
import Square from "./Square";

const Board = ({ list, gameOver, food, generateFood, limits }) => {
    const mockIndex = [];
    let count = -1;

    const getSquare = (index) => {
        count++;
        if (index === food) {
            return <Square key={index} index={index} color="yellow" food="food" /> 
        }

        if (list.includes(index)) {
            return <Square key={index} index={index} color="#FFFFFF" /> 
        }

        return <Square key={index} index={index} color={mockIndex[count] % 2 === 0 ? "#7F7F7F" : "#58555A"} /> 
    }

    const getDiv = (index) => {
        limits.push(index);
        return <div key={index} style={{clear: "both"}}></div>
    }

    const validateLimits = () => {
        const found = list.some(l => limits.includes(l));
        const head = list[list.length - 1];
        const tailLose = list.filter((e, i, a) => a.indexOf(e) !== i)
        if (found || head >= 300 || head <= 0 || tailLose.length > 0) {
            gameOver();
        }
    }

    const eatSnakeFood = () => {
        if (list.includes(food)) {
            generateFood();
        }
    }

    useEffect(() => {
        validateLimits();
        eatSnakeFood();
    })

    return (
        <div style={{textAlign: "center"}}>
            {[...Array(300)].map((x, i) => {
                mockIndex.push(i);
                if (i % 20 === 0) {
                    return getDiv(i);
                }
                return getSquare(i)
            })}
        </div>
    );
};

export default Board;
import { useEffect, useRef } from "react";

const Snake = () => {
    const divRef = useRef(null);
    let animation;
  
    useEffect(() => {
        document.addEventListener('keydown', move);
    });

    const move = (e) => {
        const snake = divRef.current;
        const position = snake.getBoundingClientRect();
    
        switch(e.keyCode) {
          case 39:
            clearTimeout(animation);
            moveRight();
            break;
          case 37:
            clearTimeout(animation);
            moveLeft();
            break;
          case 38:
            clearTimeout(animation);
            moveTop();
            break;
          case 40:
            clearTimeout(animation);
            snake.style.top = `${position.y + 10}px`;
            break;
          default:
            break;
        }
    }

    const moveRight = () => {
        const snake = divRef.current;
        const position = snake.getBoundingClientRect();
        if (position.x < 500) {
            snake.style.left = `${position.x + 1}px`;
            animation = setTimeout(moveRight, 10);
        }
    }

    const moveLeft = () => {
        const snake = divRef.current;
        const position = snake.getBoundingClientRect();
        if (position.x > 0) {
            snake.style.left = `${position.x - 1}px`;
            animation = setTimeout(moveLeft, 10);
        }
    }

    const moveTop = () => {
        const snake = divRef.current;
        const position = snake.getBoundingClientRect();
        if (position.x > 0) {
            snake.style.left = `${position.y - 1}px`;
            animation = setTimeout(moveTop, 10);
        }
    }

    return (
        <div className="snake" ref={divRef}></div>
    )
};

export default Snake;
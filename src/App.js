import { useEffect, useState } from "react";
import Board from "./components/Board";
import Score from "./components/Score";

const Keys = {
  RIGHT: 39,
  LEFT: 37,
  TOP: 38,
  BOTTOM: 40
}

function App() {
  const [list, setList] = useState([121, 122, 123]);
  const [direction, setDirection] = useState(1);
  const [start, setStart] = useState(false);
  const [food, setFood] = useState(95);
  const [actualScore, setActualScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  const limits = [];

  const generateFood = () => {
    const foodLimits = [...list, ...limits];
    const foodPosition = Math.floor(Math.random() * (299 - 1) + 1);
    if (!foodLimits.includes(foodPosition)) {
      setActualScore(actualScore + 1);
      setFood(foodPosition);
    }
  }

  const moveSnake = (e) => {
    switch(e.keyCode) {
      case Keys.RIGHT:
        setStart(true);
        manualInterval(1)
        break;
      case Keys.LEFT:
        manualInterval(-1)
        break;
      case Keys.TOP:
        manualInterval(-20)
        break;
      case Keys.BOTTOM:
        manualInterval(20)
        break;
      default:
        break;
    }
  }

  const getOposite = (dir) => {
    if (dir === 1) return -1;
    if (dir === -1) return 1;
    if (dir === 20) return -20;
    if (dir === -20) return 20;
  }
  
  const manualInterval = (dir) => {
    if (start && dir !== direction && getOposite(dir) !== direction) {
      let snake = [...list];
      if (list[list.length - 1] + dir !== food) {
        snake.shift();
      }
      snake.push(list[list.length - 1] + dir);
      setList(snake);
      setDirection(dir);
    }
  }

  const pushInterval = () => {
    if (start) {
      let snake = [...list];
      if (list[list.length - 1] + direction !== food) {
        snake.shift();
      }
      snake.push(list[list.length - 1] + direction);
      setList(snake);
    }
  }

  const gameOver = () => {
    if (actualScore > bestScore) {
      setBestScore(actualScore);
    }
    setList([121, 122, 123]);
    setDirection(1);
    setActualScore(0);
    setStart(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', moveSnake);
    return () => document.removeEventListener('keydown', moveSnake);
  });

  useEffect(() => {
    const interval = setInterval(() => pushInterval(), 150);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <Score actualScore={actualScore} bestScore={bestScore} />
      <Board list={list} gameOver={gameOver} food={food} generateFood={generateFood} limits={limits} />
    </div>
  );
}

export default App;

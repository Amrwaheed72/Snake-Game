import { useEffect, useState } from "react";
import { Direction, GameLoopProps } from "../types";

const useGameLoop = ({
  gameOver,
  isPaused,
  generateFood,
  INITIAL_DIRECTION,
  setSnake,
  GRID_SIZE,
  food,
  setFood,
  setScore,
  setSpeed,
  currentDirRef,
  speed,
  setGameOver,
}: Omit<GameLoopProps, "direction" | "setDirection">) => {

  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const SPEED_INCREMENT = 2;

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        // Move Head
        switch (direction) {
          case "UP":
            newHead.y -= 1;
            break;
          case "DOWN":
            newHead.y += 1;
            break;
          case "LEFT":
            newHead.x -= 1;
            break;
          case "RIGHT":
            newHead.x += 1;
            break;
        }

        // Check Collision (Walls)
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Collision (Self)
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setSpeed((s) => Math.max(50, s - SPEED_INCREMENT));
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        currentDirRef.current = direction;
        return newSnake;
      });
    }, speed);

    return () => clearInterval(moveSnake);
  }, [
    direction,
    gameOver,
    isPaused,
    food,
    generateFood,
    speed,
    setScore,
    setSnake,
    setFood,
    setGameOver,
    setSpeed,
    currentDirRef,
    GRID_SIZE,
  ]);

  return { setDirection };
};

export default useGameLoop;

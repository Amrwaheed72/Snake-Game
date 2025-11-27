import { useEffect, useRef } from "react";
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
}: GameLoopProps) => {
  currentDirRef.current ||= INITIAL_DIRECTION;

  const SPEED_INCREMENT = 2;

  const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);

  const setDirection = (dir: Direction) => {
    const current = currentDirRef.current;
    if (
      (current === "UP" && dir === "DOWN") ||
      (current === "DOWN" && dir === "UP") ||
      (current === "LEFT" && dir === "RIGHT") ||
      (current === "RIGHT" && dir === "LEFT")
    )
      return;

    nextDirectionRef.current = dir;
  };

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const direction = nextDirectionRef.current;
        currentDirRef.current = direction;

        const head = prevSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case "UP":
            newHead.y--;
            break;
          case "DOWN":
            newHead.y++;
            break;
          case "LEFT":
            newHead.x--;
            break;
          case "RIGHT":
            newHead.x++;
            break;
        }

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setSpeed((s) => Math.max(50, s - SPEED_INCREMENT));
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(moveSnake);
  }, [
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
    GRID_SIZE,
    currentDirRef,
  ]);

  return { setDirection };
};

export default useGameLoop;

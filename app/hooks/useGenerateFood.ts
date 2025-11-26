import { useCallback } from "react";
import { Point } from "../types";

const useGenerateFood = (GRID_SIZE: number, snake: Point[]) => {
  const generateFood = useCallback((): Point => {
    let newFood: Point;
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      isOnSnake = snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
    } while (isOnSnake);
    return newFood;
  }, [snake, GRID_SIZE]);
  return { generateFood };
};

export default useGenerateFood;

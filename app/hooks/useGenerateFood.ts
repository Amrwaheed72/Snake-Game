import { useCallback } from "react";
import { Point, Snake } from "../types";

const useGenerateFood = (GRID_SIZE: number, snake: Snake) => {
  const generateFood = useCallback<() => Point>(() => {
    let newFood: Point;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));

    return newFood;
  }, [snake, GRID_SIZE]);

  return { generateFood };
};

export default useGenerateFood;

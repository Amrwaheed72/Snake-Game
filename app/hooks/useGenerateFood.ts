import { useCallback } from "react";
import { Point, Snake } from "../types";
import {
  isValidPoint,
  isValidFoodPosition,
  sanitizePoint,
} from "../utils/validators";

const useGenerateFood = (GRID_SIZE: number, snake: Snake) => {
  const generateFood = useCallback<() => Point>(() => {
    // Validate inputs
    if (!Array.isArray(snake) || snake.length === 0) {
      console.warn("Invalid snake provided to generateFood");
      return { x: 0, y: 0 };
    }

    if (GRID_SIZE < 10 || GRID_SIZE > 50) {
      console.error("Invalid GRID_SIZE:", GRID_SIZE);
      return { x: 0, y: 0 };
    }

    let newFood: Point;
    let attempts = 0;
    const maxAttempts = GRID_SIZE * GRID_SIZE; // Prevent infinite loops

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      attempts++;

      // Safety check: if snake fills entire grid (impossible but defensive)
      if (attempts >= maxAttempts) {
        console.warn("Could not find valid food position after max attempts");

        // Find first available spot systematically
        for (let y = 0; y < GRID_SIZE; y++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const candidateFood = { x, y };
            if (isValidFoodPosition(candidateFood, snake)) {
              return candidateFood;
            }
          }
        }

        // Absolute fallback (should never reach here)
        console.error("Grid completely full - using fallback position");
        return { x: 0, y: 0 };
      }
    } while (
      !isValidPoint(newFood, GRID_SIZE) ||
      !isValidFoodPosition(newFood, snake)
    );

    // Final validation
    const sanitized = sanitizePoint(newFood, GRID_SIZE);

    if (!isValidFoodPosition(sanitized, snake)) {
      console.error("Generated food on snake after sanitization");
      // Try one more time with a corner position
      const cornerPositions = [
        { x: 0, y: 0 },
        { x: GRID_SIZE - 1, y: 0 },
        { x: 0, y: GRID_SIZE - 1 },
        { x: GRID_SIZE - 1, y: GRID_SIZE - 1 },
      ];

      for (const pos of cornerPositions) {
        if (isValidFoodPosition(pos, snake)) {
          return pos;
        }
      }
    }

    return sanitized;
  }, [snake, GRID_SIZE]);

  return { generateFood };
};

export default useGenerateFood;

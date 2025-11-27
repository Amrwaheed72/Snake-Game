import { useEffect, useRef } from "react";
import { Direction, GameLoopProps } from "../types";
import {
  isValidDirection,
  isValidDirectionChange,
  isValidPoint,
  isValidSnake,
} from "../utils/validators";

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
    // Validate direction input
    if (!isValidDirection(dir)) {
      console.error("Invalid direction:", dir);
      return;
    }

    const current = currentDirRef.current;

    // Validate direction change
    if (!isValidDirectionChange(current, dir)) {
      return;
    }

    nextDirectionRef.current = dir;
  };

  useEffect(() => {
    if (gameOver || isPaused) return;

    // Validate speed before starting interval
    if (speed < 50 || speed > 500) {
      console.error("Invalid speed:", speed);
      setSpeed(150); // Reset to default
      return;
    }

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        // Validate previous snake state
        if (!isValidSnake(prevSnake, GRID_SIZE)) {
          console.error("Invalid snake state detected");
          setGameOver(true);
          return prevSnake;
        }

        const direction = nextDirectionRef.current;
        currentDirRef.current = direction;

        const head = prevSnake[0];

        // Validate head exists
        if (!head) {
          console.error("Snake has no head");
          setGameOver(true);
          return prevSnake;
        }

        const newHead = { ...head };

        // Calculate new position
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
          default:
            console.error("Unknown direction:", direction);
            return prevSnake;
        }

        // Validate new head position is within bounds (wall collision)
        if (!isValidPoint(newHead, GRID_SIZE)) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision check
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision - validate food position first
        if (
          isValidPoint(food, GRID_SIZE) &&
          newHead.x === food.x &&
          newHead.y === food.y
        ) {
          try {
            const newFood = generateFood();

            // Validate generated food
            if (!isValidPoint(newFood, GRID_SIZE)) {
              console.error("Generated invalid food position");
              // Fallback to a safe position
              setFood({ x: 0, y: 0 });
            } else {
              setFood(newFood);
            }

            setScore((s) => {
              const newScore = s + 10;
              // Validate score doesn't go negative or become invalid
              return newScore >= 0 ? newScore : s;
            });

            setSpeed((s) => {
              const newSpeed = Math.max(50, s - SPEED_INCREMENT);
              // Validate speed stays within bounds
              return newSpeed >= 50 && newSpeed <= 500 ? newSpeed : s;
            });
          } catch (error) {
            console.error("Error generating food:", error);
          }
        } else {
          newSnake.pop();
        }

        // Final validation before returning
        if (!isValidSnake(newSnake, GRID_SIZE)) {
          console.error("Generated invalid snake state");
          setGameOver(true);
          return prevSnake;
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

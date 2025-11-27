import { useEffect } from "react";
import { KeyboardControlProps } from "../types";

const useKeyboardControls = ({
  setIsPaused,
  gameOver,
  setDirection,
  currentDirRef,
}: KeyboardControlProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.code === "Space") {
        setIsPaused((prev) => !prev);
        return;
      }

      const key = e.key;
      const currentDir = currentDirRef.current;

      if ((key === "ArrowUp" || key === "w") && currentDir !== "DOWN") {
        setDirection("UP");
        setIsPaused(false);
      } else if ((key === "ArrowDown" || key === "s") && currentDir !== "UP") {
        setDirection("DOWN");
        setIsPaused(false);
      } else if (
        (key === "ArrowLeft" || key === "a") &&
        currentDir !== "RIGHT"
      ) {
        setDirection("LEFT");
        setIsPaused(false);
      } else if (
        (key === "ArrowRight" || key === "d") &&
        currentDir !== "LEFT"
      ) {
        setDirection("RIGHT");
        setIsPaused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, currentDirRef, setDirection, setIsPaused]);
};

export default useKeyboardControls;

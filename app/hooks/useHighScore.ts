import { useEffect, useState } from "react";
import { safeStorage } from "../utils/safeStorage";

const HIGH_SCORE_KEY = "snakeHighScore";

interface UseHighScoreReturn {
  highScore: number;
  updateHighScore: (score: number) => void;
}

/**
 * Combined hook for loading and updating high score
 * Uses safe storage that falls back to memory if localStorage unavailable
 */
const useHighScore = (): UseHighScoreReturn => {
  const [highScore, setHighScore] = useState<number>(0);

  // Load high score on mount
  useEffect(() => {
    const savedScore = safeStorage.getItem(HIGH_SCORE_KEY);
    if (savedScore) {
      const parsed = parseInt(savedScore, 10);
      if (!isNaN(parsed)) {
        setHighScore(parsed);
      }
    }
  }, []);

  // Update high score function
  const updateHighScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
      safeStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  };

  return { highScore, updateHighScore };
};

export default useHighScore;
import { useEffect } from "react";
import { UseUpdateHighScoreProps } from "../types";

const useUpdateHighScore = ({
  score,
  highScore,
  setHighScore,
}: UseUpdateHighScoreProps): void => {
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score, highScore, setHighScore]);
};

export default useUpdateHighScore;

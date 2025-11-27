import { useEffect } from "react";

interface UseUpdateHighScoreProps {
  score: number;
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
}

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

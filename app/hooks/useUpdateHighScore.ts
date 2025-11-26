import { useEffect, useState } from "react";

const useUpdateHighScore = (
  highScore: number,
  setHighScore: (state: number) => void
) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score, highScore, setHighScore]);
  return { score, setScore };
};

export default useUpdateHighScore;

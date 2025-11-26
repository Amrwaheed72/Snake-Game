import { useEffect, useState } from "react";

const useLoadHighScore = () => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) {
      setHighScore(parseInt(saved));
    }
  }, []);
  return { highScore, setHighScore };
};

export default useLoadHighScore;

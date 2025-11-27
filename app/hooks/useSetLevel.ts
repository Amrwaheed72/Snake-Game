import { useEffect } from "react";

interface UseSetLevelProps {
  score: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}
const useSetLevel = ({
  score,
  setLevel,
  level,
  setSpeed,
}: UseSetLevelProps) => {
  useEffect(() => {
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10));
    }
  }, [score, level, setSpeed, setLevel]);
};

export default useSetLevel;

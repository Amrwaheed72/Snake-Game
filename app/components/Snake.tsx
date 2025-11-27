import { Point } from "../types";
import { memo } from "react";

interface Props {
  isHead: boolean;
  segment: Point;
  speed: number;
  gridSize: number;
  snakeColor?: string;
  snakeHeadColor?: string;
}

const Snake = memo(
  ({
    isHead,
    segment,
    speed,
    gridSize,
    snakeColor = "#10b981",
    snakeHeadColor = "#34d399",
  }: Props) => {
    const cellSize = 100 / gridSize;

    return (
      <div
        className={`absolute rounded-sm transition-all linear ${isHead ? "z-20" : "z-10"
          }`}
        style={{
          width: `${cellSize}%`,
          height: `${cellSize}%`,
          left: `${segment.x * cellSize}%`,
          top: `${segment.y * cellSize}%`,
          backgroundColor: isHead ? snakeHeadColor : snakeColor,
          opacity: isHead ? 1 : 0.9,
          transitionDuration: `${speed}ms`,
        }}
      >
        {isHead && (
          <div className="relative w-full h-full">
            <div className="absolute top-1 left-1 w-1 h-1 bg-slate-900 rounded-full" />
            <div className="absolute top-1 right-1 w-1 h-1 bg-slate-900 rounded-full" />
          </div>
        )}
      </div>
    );
  }
);

Snake.displayName = "Snake";

export default Snake;

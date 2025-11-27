"use client";

import { useState, useRef } from "react";
import { Trophy, RefreshCcw } from "lucide-react";
import useLoadHighScore from "./hooks/useLoadHighScore";
import useUpdateHighScore from "./hooks/useUpdateHighScore";
import useGenerateFood from "./hooks/useGenerateFood";
import { Direction, Point } from "./types";
import useGameLoop from "./hooks/useGameLoop";
import useKeyboardControls from "./hooks/useKeyboardControls";
import MobileDirections from "./components/MobileDirections";
import PauseStart from "./components/PauseStart";
import Snake from "./components/Snake";
import useSetLevel from "./hooks/useSetLevel";
const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = "UP";

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);

  const currentDirRef = useRef<Direction>(INITIAL_DIRECTION);

  useLoadHighScore({ score, highScore, setHighScore });
  useUpdateHighScore({ score, highScore, setHighScore });
  const { generateFood } = useGenerateFood(GRID_SIZE, snake);

  const { setDirection } = useGameLoop({
    generateFood,
    gameOver,
    isPaused,
    INITIAL_DIRECTION,
    speed,
    snake,
    setSnake,
    GRID_SIZE,
    food,
    setFood,
    setGameOver,
    setScore,
    setSpeed,
    currentDirRef,
  });

  useKeyboardControls({
    setIsPaused,
    gameOver,
    setDirection,
    currentDirRef,
  });
  useSetLevel({ level, setLevel, setSpeed, score });

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("UP");
    currentDirRef.current = "UP";
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
    setSpeed(INITIAL_SPEED);
    setFood({ x: 5, y: 5 });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans p-4">
      <div className="w-full max-w-md flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Score
          </span>
          <span className="text-2xl font-bold text-emerald-400">{score}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Level
          </span>
          <span className="text-2xl font-bold text-cyan-400">{level}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Trophy size={14} className="text-yellow-500" /> High Score
          </div>
          <span className="text-2xl font-bold text-white">{highScore}</span>
        </div>
      </div>

      <div className="relative group">
        <div
          className="relative bg-slate-800 rounded-lg shadow-2xl overflow-hidden border-4 border-slate-700"
          style={{
            width: "min(100vw, 400px)",
            height: "min(100vw, 400px)",
          }}
        >
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div
                key={i}
                className="border-[0.5px] border-slate-700/20 w-full h-full"
              />
            ))}
          </div>

          <div
            className="absolute bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse z-10"
            style={{
              width: "5%",
              height: "5%",
              left: `${food.x * 5}%`,
              top: `${food.y * 5}%`,
              transition: "all 0.2s ease-out",
            }}
          />

          {snake.map((segment, index) => {
            const isHead = index === 0;
            return (
              <Snake
                key={index}
                isHead={isHead}
                segment={segment}
                speed={speed}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-30">
            <h2 className="text-4xl font-black text-red-500 mb-2">GAME OVER</h2>
            <p className="text-slate-300 mb-6">Final Score: {score}</p>
            <button
              type="button"
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCcw size={20} /> Try Again
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <PauseStart score={score} setIsPaused={setIsPaused} />
        )}
      </div>
      <MobileDirections
        setDirection={setDirection}
        setIsPaused={setIsPaused}
        currentDirRef={currentDirRef}
      />
      <div className="mt-8 hidden md:flex gap-4 text-slate-300 text-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-xs">
            Space
          </span>
          <span>Pause/Resume</span>
        </div>
      </div>
    </div>
  );
}

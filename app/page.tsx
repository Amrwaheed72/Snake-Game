"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Trophy, RefreshCcw, Play } from "lucide-react";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type newFood = { x: number; y: number };

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = "UP";

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Ref to track the "current" direction to prevent double-moves in one tick
  const currentDirRef = useRef<Direction>(INITIAL_DIRECTION);

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Update High Score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score, highScore]);

  // Generate Food (Prevent spawning on snake)
  const generateFood = useCallback((): Point => {
    let newFood: newFood;
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if new food is on snake body
      // eslint-disable-next-line no-loop-func
      isOnSnake = snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
    } while (isOnSnake);
    return newFood;
  }, [snake]);

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        // Move Head
        switch (direction) {
          case "UP":
            newHead.y -= 1;
            break;
          case "DOWN":
            newHead.y += 1;
            break;
          case "LEFT":
            newHead.x -= 1;
            break;
          case "RIGHT":
            newHead.x += 1;
            break;
        }

        // Check Collision (Walls)
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Collision (Self)
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setSpeed((s) => Math.max(50, s - SPEED_INCREMENT)); // Increase speed
          setFood(generateFood());
          // Don't pop the tail, so snake grows
        } else {
          newSnake.pop(); // Remove tail
        }

        // Update Ref for next move validation
        currentDirRef.current = direction;

        return newSnake;
      });
    }, speed);

    return () => clearInterval(moveSnake);
  }, [direction, gameOver, isPaused, food, generateFood, speed]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      // Toggle Pause with Space
      if (e.code === "Space") {
        setIsPaused((prev) => !prev);
        return;
      }

      const key = e.key;
      // Current direction from REF to prevent 180-degree turns in same tick
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
  }, [gameOver]);

  // Restart Handler
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("UP");
    currentDirRef.current = "UP";
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
    setSpeed(INITIAL_SPEED);
    setFood({ x: 5, y: 5 }); // Reset food purely for clean restart
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans p-4">
      {/* Header / Stats */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Score
          </span>
          <span className="text-2xl font-bold text-emerald-400">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Trophy size={14} className="text-yellow-500" /> High Score
          </div>
          <span className="text-2xl font-bold text-white">{highScore}</span>
        </div>
      </div>

      {/* Game Board Container */}
      <div className="relative group">
        {/* The Grid */}
        <div
          className="grid bg-slate-800 rounded-lg shadow-2xl overflow-hidden border-4 border-slate-700"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            width: "min(90vw, 400px)",
            height: "min(90vw, 400px)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);

            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some(
              (s, i) => i !== 0 && s.x === x && s.y === y
            );
            const isFood = food.x === x && food.y === y;

            return (
              <div key={index} className="relative w-full h-full">
                {/* Snake Body */}
                {isSnakeBody && (
                  <div className="absolute inset-0.5 bg-emerald-500 rounded-sm opacity-80" />
                )}

                {/* Snake Head */}
                {isSnakeHead && (
                  <div className="absolute inset-0 bg-emerald-400 rounded-md shadow-[0_0_10px_rgba(52,211,153,0.5)] z-10">
                    {/* Eyes */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-900 rounded-full" />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-900 rounded-full" />
                  </div>
                )}

                {/* Food */}
                {isFood && (
                  <div className="absolute inset-1 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Overlay: Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20">
            <h2 className="text-4xl font-black text-red-500 mb-2">GAME OVER</h2>
            <p className="text-slate-300 mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              title="try again"
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCcw size={20} /> Try Again
            </button>
          </div>
        )}

        {/* Overlay: Paused / Start */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-lg z-20">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl text-center">
              <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest font-bold">
                {score === 0 ? "Ready?" : "Paused"}
              </p>
              <button
                type="button"
                title="play"
                onClick={() => setIsPaused(false)}
                className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-110 active:scale-95 mx-auto"
              >
                <Play fill="white" className="ml-1" size={32} />
              </button>
              <p className="mt-4 text-xs text-slate-500">
                Use Arrow Keys or WASD
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Hint */}
      <div className="mt-8 flex gap-4 text-slate-300 text-sm">
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

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RefreshCcw, Settings as SettingsIcon, HelpCircle } from "lucide-react";
import useHighScore from "./hooks/useHighScore";
import useGenerateFood from "./hooks/useGenerateFood";
import useSettings from "./hooks/useSettings";
import usePowerUps from "./hooks/usePowerUps";
import useGameStats from "./hooks/useGameStats";
import useSound from "./hooks/useSound";
import useTutorial from "./hooks/useTutorial";
import { Direction, Point } from "./types";
import useGameLoop from "./hooks/useGameLoop";
import useKeyboardControls from "./hooks/useKeyboardControls";
import MobileDirections from "./components/MobileDirections";
import PauseStart from "./components/PauseStart";
import Snake from "./components/Snake";
import Grid from "./components/Grid";
import PowerUp from "./components/PowerUp";
import GameStats from "./components/GameStats";
import Settings from "./components/Settings";
import PauseMenu from "./components/PauseMenu";
import ScorePanel from "./components/ScorePanel";
import GameControls from "./components/GameControls";
import Tutorial from "./components/Tutorial";
import HelpModal from "./components/HelpModal";
import AccessibleAnnouncer from "./components/AccessibleAnnouncer";
import useSetLevel from "./hooks/useSetLevel";
import ErrorBoundary from "./components/ErrorBoundary";
import GameErrorBoundary from "./components/GameErrorBoundary";
import {
  isValidGridSize,
  isValidSpeed,
  validateGameState,
  sanitizeScore,
  sanitizeSpeed,
} from "./utils/validators";
import { getTheme } from "./constants/themes";
import {
  vibrateShort,
  vibrateMedium,
  vibrateLong,
  vibrateLevelUp,
  vibratePowerUp,
} from "./utils/haptics";

const INITIAL_DIRECTION: Direction = "UP";

function SnakeGameContent() {
  // Settings hook
  const {
    settings,
    setTheme,
    toggleSound,
    setGridSize: updateGridSize,
    setDifficulty,
  } = useSettings();

  const theme = getTheme(settings.theme);
  const GRID_SIZE = settings.gridSize;
  const INITIAL_SPEED = settings.initialSpeed;

  // Define initial snake based on grid size
  const INITIAL_SNAKE: Point[] = [
    { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
    { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) + 1 },
    { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) + 2 },
  ];

  // Game state
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const { showTutorial, completeTutorial } = useTutorial();

  const currentDirRef = useRef<Direction>(INITIAL_DIRECTION);

  // Hooks
  const { highScore, updateHighScore } = useHighScore();
  const {
    stats,
    startSession,
    recordGame,
    updateStreak,
    getAverageScore,
    getFormattedPlayTime,
  } = useGameStats();
  const { playEat, playGameOver, playLevelUp, playPowerUp } = useSound(
    settings.soundEnabled
  );
  const { generateFood } = useGenerateFood(GRID_SIZE, snake);
  const {
    powerUp,
    activeEffect,
    checkPowerUpCollision,
    activatePowerUp,
    clearPowerUps,
    getScoreMultiplier,
    getSpeedModifier,
    isInvincible,
  } = usePowerUps({ gridSize: GRID_SIZE, snake, score });

  // Update high score when score changes
  useEffect(() => {
    updateHighScore(score);
    updateStreak(score);
  }, [score, updateHighScore, updateStreak]);

  // Validate game state periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const validation = validateGameState(
        snake,
        food,
        GRID_SIZE,
        score,
        speed,
        level
      );

      if (!validation.valid) {
        console.warn("Game state validation failed:", validation.errors);
      }
    }
  }, [snake, food, score, speed, level, GRID_SIZE]);

  // Apply speed modifier from power-ups
  const effectiveSpeed = Math.floor(speed * getSpeedModifier());

  const { setDirection } = useGameLoop({
    generateFood,
    gameOver,
    isPaused,
    INITIAL_DIRECTION,
    speed: effectiveSpeed,
    snake,
    setSnake,
    GRID_SIZE,
    food,
    setFood,
    setGameOver,
    setScore: (scoreUpdate) => {
      setScore((prev) => {
        const newScore =
          typeof scoreUpdate === "function" ? scoreUpdate(prev) : scoreUpdate;
        return newScore;
      });
    },
    setSpeed,
    currentDirRef,
  });

  useKeyboardControls({
    setIsPaused: (value) => {
      const newValue = typeof value === "function" ? value(isPaused) : value;
      setIsPaused(newValue);
      if (!newValue) {
        setShowPauseMenu(false);
      } else {
        setShowPauseMenu(true);
      }
    },
    gameOver,
    setDirection,
    currentDirRef,
  });

  useSetLevel({ level, setLevel, setSpeed, score });

  // Modified game loop integration  
  useEffect(() => {
    if (!gameOver && !isPaused && snake.length > 0) {
      const head = snake[0];

      // Check power-up collision
      if (checkPowerUpCollision(head)) {
        const powerUpType = activatePowerUp();
        if (powerUpType) {
          playPowerUp();
          vibratePowerUp();
          setAnnouncement(`Power-up collected: ${powerUpType}`);
          // Apply score multiplier if multiplier power-up
          if (powerUpType === "multiplier") {
            setScore((s) => s + 10 * getScoreMultiplier());
          }
        }
      }
    }
  }, [snake, gameOver, isPaused, checkPowerUpCollision, activatePowerUp, playPowerUp, getScoreMultiplier]);

  // Handle food eating with sound and haptics
  const previousScoreRef = useRef(score);
  useEffect(() => {
    if (score > previousScoreRef.current) {
      playEat();
      vibrateMedium();
      setAnnouncement(`Score: ${score}`);
    }
    previousScoreRef.current = score;
  }, [score, playEat]);

  // Handle level up with sound and haptics
  const previousLevelRef = useRef(level);
  useEffect(() => {
    if (level > previousLevelRef.current) {
      playLevelUp();
      vibrateLevelUp();
      setAnnouncement(`Level up! Now on level ${level}`);
    }
    previousLevelRef.current = level;
  }, [level, playLevelUp]);

  // Handle game over with sound, haptics and stats
  useEffect(() => {
    if (gameOver) {
      playGameOver();
      vibrateLong();
      recordGame(score);
      setAnnouncement(`Game over! Final score: ${score}`);
    }
  }, [gameOver, playGameOver, recordGame, score]);

  // Start session when game starts
  useEffect(() => {
    if (!isPaused && !gameOver) {
      startSession();
    }
  }, [isPaused, gameOver, startSession]);

  const resetGame = useCallback(() => {
    try {
      const validatedScore = sanitizeScore(0);
      const validatedSpeed = sanitizeSpeed(settings.initialSpeed);

      setSnake(INITIAL_SNAKE);
      setDirection("UP");
      currentDirRef.current = "UP";
      setScore(validatedScore);
      setGameOver(false);
      setIsPaused(true);
      setSpeed(validatedSpeed);
      setLevel(1);
      setShowPauseMenu(false);
      clearPowerUps();

      const newFood = generateFood();
      setFood(newFood);
    } catch (error) {
      console.error("Error resetting game:", error);
      window.location.reload();
    }
  }, [generateFood, settings.initialSpeed, clearPowerUps, setDirection, INITIAL_SNAKE]);

  // Handle settings changes that require game reset
  const handleSettingsChange = useCallback(
    (callback: () => void) => {
      callback();
      resetGame();
      setShowSettings(false);
    },
    [resetGame]
  );

  const gridCellSize = 100 / GRID_SIZE;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white font-sans p-4 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Screen Reader Announcements */}
      <AccessibleAnnouncer message={announcement} priority="polite" />

      {/* Score Panel */}
      <ScorePanel
        score={score}
        level={level}
        highScore={highScore}
        activeEffect={activeEffect}
        theme={theme}
      />

      {/* Settings and Help Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          className="p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.cardBorder,
            borderWidth: "1px",
          }}
          aria-label="Open help"
        >
          <HelpCircle size={20} style={{ color: theme.colors.accentPrimary }} />
        </button>
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.cardBorder,
            borderWidth: "1px",
          }}
          aria-label="Open settings"
        >
          <SettingsIcon size={20} style={{ color: theme.colors.accentPrimary }} />
        </button>
      </div>

      {/* Game Board */}
      <div className="relative group">
        <GameErrorBoundary onReset={resetGame}>
          <div
            className="relative rounded-lg shadow-2xl overflow-hidden transition-all duration-500"
            style={{
              width: "min(100vw, 400px)",
              height: "min(100vw, 400px)",
              backgroundColor: theme.colors.grid,
              borderColor: theme.colors.cardBorder,
              borderWidth: "4px",
            }}
          >
            {/* Grid */}
            <Grid gridSize={GRID_SIZE} gridColor={theme.colors.cardBorder} />

            {/* Food */}
            <div
              className="absolute rounded-full shadow-lg animate-pulse z-10"
              style={{
                width: `${gridCellSize}%`,
                height: `${gridCellSize}%`,
                left: `${food.x * gridCellSize}%`,
                top: `${food.y * gridCellSize}%`,
                backgroundColor: theme.colors.food,
                boxShadow: `0 0 15px ${theme.colors.foodGlow}`,
                transition: "all 0.2s ease-out",
              }}
            />

            {/* Power-up */}
            {powerUp && !powerUp.active && (
              <PowerUp powerUp={powerUp} gridSize={GRID_SIZE} />
            )}

            {/* Snake */}
            {snake.map((segment, index) => {
              const isHead = index === 0;
              return (
                <Snake
                  key={`${segment.x}-${segment.y}-${index}`}
                  isHead={isHead}
                  segment={segment}
                  speed={effectiveSpeed}
                  gridSize={GRID_SIZE}
                  snakeColor={theme.colors.snake}
                  snakeHeadColor={theme.colors.snakeHead}
                />
              );
            })}
          </div>

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-30">
              <h2 className="text-4xl font-black text-red-500 mb-2">
                GAME OVER
              </h2>
              <p className="text-slate-300 mb-6">Final Score: {score}</p>
              <button
                type="button"
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: theme.colors.buttonBg,
                  color: "#000",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  theme.colors.buttonHover)
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  theme.colors.buttonBg)
                }
              >
                <RefreshCcw size={20} /> Try Again
              </button>
            </div>
          )}

          {/* Pause Menu */}
          {isPaused && !gameOver && showPauseMenu && (
            <PauseMenu
              onResume={() => {
                setIsPaused(false);
                setShowPauseMenu(false);
              }}
              onRestart={resetGame}
              onSettings={() => setShowSettings(true)}
              onClose={() => {
                setIsPaused(false);
                setShowPauseMenu(false);
              }}
              score={score}
              buttonBg={theme.colors.buttonBg}
              buttonHover={theme.colors.buttonHover}
            />
          )}

          {/* Start Screen */}
          {isPaused && !gameOver && !showPauseMenu && (
            <PauseStart score={score} setIsPaused={setIsPaused} />
          )}
        </GameErrorBoundary>
      </div>

      {/* Mobile Controls */}
      <MobileDirections
        setDirection={setDirection}
        setIsPaused={setIsPaused}
        currentDirRef={currentDirRef}
      />

      {/* Keyboard Controls Hint */}
      <GameControls theme={theme} />

      {/* Game Statistics */}
      <GameStats
        stats={stats}
        averageScore={getAverageScore()}
        formattedPlayTime={getFormattedPlayTime()}
        cardBg={theme.colors.cardBg}
        cardBorder={theme.colors.cardBorder}
        textColor={theme.colors.accentPrimary}
      />

      {/* Settings Panel */}
      {showSettings && (
        <Settings
          settings={settings}
          onClose={() => setShowSettings(false)}
          onThemeChange={(newTheme) =>
            handleSettingsChange(() => setTheme(newTheme))
          }
          onSoundToggle={() => handleSettingsChange(toggleSound)}
          onGridSizeChange={(size) =>
            handleSettingsChange(() => updateGridSize(size))
          }
          onDifficultyChange={(difficulty) =>
            handleSettingsChange(() => setDifficulty(difficulty))
          }
          cardBg={theme.colors.cardBg}
          cardBorder={theme.colors.cardBorder}
          buttonBg={theme.colors.buttonBg}
          accentColor={theme.colors.accentPrimary}
        />
      )}

      {/* Tutorial */}
      {showTutorial && <Tutorial onComplete={completeTutorial} theme={theme} />}

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} theme={theme} />
    </div>
  );
}

export default function SnakeGame() {
  return (
    <ErrorBoundary>
      <SnakeGameContent />
    </ErrorBoundary>
  );
}

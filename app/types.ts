import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type Point = { x: number; y: number };
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface GridConfig {
  readonly SIZE: number;
}

export type SnakeSegment = Point;
export type Snake = SnakeSegment[];
export interface GameLoopProps {
  generateFood: () => Point;
  gameOver: boolean;
  isPaused: boolean;
  INITIAL_DIRECTION: Direction;
  snake: Snake;
  setSnake: SetState<Snake>;
  GRID_SIZE: number;
  food: Point;
  setFood: SetState<Point>;
  setScore: SetState<number>;
  setSpeed: SetState<number>;
  currentDirRef: MutableRefObject<Direction>;
  speed: number;
  setGameOver: SetState<boolean>;
}

export interface KeyboardControlProps {
  setIsPaused: SetState<boolean>;
  gameOver: boolean;
  setDirection: (dir: Direction) => void;
  currentDirRef: MutableRefObject<Direction>;
}

export interface MobileDirectionsProps {
  currentDirRef: MutableRefObject<Direction>;
  setDirection: (dir: Direction) => void;
  setIsPaused: SetState<boolean>;
}

export interface UseUpdateHighScoreProps {
  score: number;
  highScore: number;
  setHighScore: SetState<number>;
}

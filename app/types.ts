import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type Point = { x: number; y: number };
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type SetState<T> = Dispatch<SetStateAction<T>>;

export interface GameLoopProps {
  generateFood: () => Point;
  gameOver: boolean;
  isPaused: boolean;
  INITIAL_DIRECTION: Direction;
  snake: Point[];
  setSnake: SetState<Point[]>;
  GRID_SIZE: number;
  food: Point;
  setFood: SetState<Point>;
  setScore: SetState<number>;
  setSpeed: SetState<number>;
  currentDirRef: MutableRefObject<Direction>;
  speed: number;
  setGameOver: SetState<boolean>;
  setIsPaused: SetState<boolean>;
}

export interface KeyboardControlProps {
  setIsPaused: SetState<boolean>;
  gameOver: boolean;
  setDirection: SetState<Direction>;
  currentDirRef: MutableRefObject<Direction>;
}

export interface MobileDirectionsProps {
  currentDirRef: MutableRefObject<Direction>;
  setDirection: SetState<Direction>;
  setIsPaused: SetState<boolean>;
}

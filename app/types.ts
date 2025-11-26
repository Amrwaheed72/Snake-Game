import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type Point = { x: number; y: number };
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// بنعرف نوع دالة الـ Setter عشان نستخدمه تحت بسهولة
type SetState<T> = Dispatch<SetStateAction<T>>;

export interface GameLoopProps {
  generateFood: () => Point; // كانت void وده غلط، هي بترجع Point
  gameOver: boolean;
  isPaused: boolean;
  INITIAL_DIRECTION: Direction;
  snake: Point[]; // الـ State نفسها
  setSnake: SetState<Point[]>; // دالة تغيير الـ State
  GRID_SIZE: number;
  food: Point;
  setFood: SetState<Point>;
  setScore: SetState<number>;
  setSpeed: SetState<number>;
  currentDirRef: MutableRefObject<Direction>; // Ref Object
  speed: number;
  setGameOver: SetState<boolean>;
  setIsPaused: SetState<boolean>; // كنت ناسي تضيف دي
}

export interface KeyboardControlProps {
  setIsPaused: SetState<boolean>;
  gameOver: boolean;
  setDirection: SetState<Direction>; // بنستقبل دالة التغيير هنا
  currentDirRef: MutableRefObject<Direction>;
}

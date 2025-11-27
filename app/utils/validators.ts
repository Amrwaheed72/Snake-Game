import { Point, Direction, Snake } from "../types";

/**
 * Validation utilities for game state and inputs
 */

export class GameValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GameValidationError";
  }
}

/**
 * Validates a point is within grid bounds
 */
export const isValidPoint = (point: Point, gridSize: number): boolean => {
  if (!point || typeof point.x !== "number" || typeof point.y !== "number") {
    return false;
  }
  return (
    point.x >= 0 &&
    point.x < gridSize &&
    point.y >= 0 &&
    point.y < gridSize &&
    Number.isInteger(point.x) &&
    Number.isInteger(point.y)
  );
};

/**
 * Validates snake array structure and contents
 */
export const isValidSnake = (snake: Snake, gridSize: number): boolean => {
  if (!Array.isArray(snake) || snake.length === 0) {
    return false;
  }

  // Check all segments are valid points
  for (const segment of snake) {
    if (!isValidPoint(segment, gridSize)) {
      return false;
    }
  }

  // Check for duplicate segments (self-collision)
  const seen = new Set<string>();
  for (const segment of snake) {
    const key = `${segment.x},${segment.y}`;
    if (seen.has(key)) {
      return false; // Snake overlaps itself
    }
    seen.add(key);
  }

  return true;
};

/**
 * Validates direction value
 */
export const isValidDirection = (
  direction: unknown
): direction is Direction => {
  return (
    direction === "UP" ||
    direction === "DOWN" ||
    direction === "LEFT" ||
    direction === "RIGHT"
  );
};

/**
 * Validates speed value is within acceptable range
 */
export const isValidSpeed = (speed: number): boolean => {
  return (
    typeof speed === "number" &&
    !isNaN(speed) &&
    speed >= 50 && // Minimum speed (fastest)
    speed <= 500 && // Maximum speed (slowest)
    Number.isInteger(speed)
  );
};

/**
 * Validates score value
 */
export const isValidScore = (score: number): boolean => {
  return (
    typeof score === "number" &&
    !isNaN(score) &&
    score >= 0 &&
    Number.isInteger(score)
  );
};

/**
 * Validates level value
 */
export const isValidLevel = (level: number): boolean => {
  return (
    typeof level === "number" &&
    !isNaN(level) &&
    level >= 1 &&
    level <= 100 && // Max level cap
    Number.isInteger(level)
  );
};

/**
 * Validates grid size
 */
export const isValidGridSize = (gridSize: number): boolean => {
  return (
    typeof gridSize === "number" &&
    !isNaN(gridSize) &&
    gridSize >= 10 &&
    gridSize <= 50 &&
    Number.isInteger(gridSize)
  );
};

/**
 * Checks if direction change is valid (prevents 180-degree turns)
 */
export const isValidDirectionChange = (
  currentDir: Direction,
  newDir: Direction
): boolean => {
  if (currentDir === newDir) return true;

  const opposites: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };

  return opposites[currentDir] !== newDir;
};

/**
 * Validates food doesn't spawn on snake
 */
export const isValidFoodPosition = (food: Point, snake: Snake): boolean => {
  if (!food || !Array.isArray(snake)) return false;

  return !snake.some((segment) => segment.x === food.x && segment.y === food.y);
};

/**
 * Sanitizes and validates a point
 */
export const sanitizePoint = (
  point: Partial<Point>,
  gridSize: number
): Point => {
  const x = Math.floor(Number(point.x) || 0);
  const y = Math.floor(Number(point.y) || 0);

  // Clamp to grid bounds
  const clampedX = Math.max(0, Math.min(gridSize - 1, x));
  const clampedY = Math.max(0, Math.min(gridSize - 1, y));

  return { x: clampedX, y: clampedY };
};

/**
 * Sanitizes score value
 */
export const sanitizeScore = (score: unknown): number => {
  const num = Number(score);
  if (isNaN(num) || num < 0) return 0;
  return Math.floor(num);
};

/**
 * Sanitizes speed value
 */
export const sanitizeSpeed = (speed: unknown): number => {
  const num = Number(speed);
  if (isNaN(num)) return 150; // Default
  return Math.max(50, Math.min(500, Math.floor(num)));
};

/**
 * Comprehensive game state validation
 */
export const validateGameState = (
  snake: Snake,
  food: Point,
  gridSize: number,
  score: number,
  speed: number,
  level: number
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidGridSize(gridSize)) {
    errors.push(`Invalid grid size: ${gridSize}`);
  }

  if (!isValidSnake(snake, gridSize)) {
    errors.push("Invalid snake configuration");
  }

  if (!isValidPoint(food, gridSize)) {
    errors.push("Food position out of bounds");
  }

  if (!isValidFoodPosition(food, snake)) {
    errors.push("Food spawned on snake");
  }

  if (!isValidScore(score)) {
    errors.push(`Invalid score: ${score}`);
  }

  if (!isValidSpeed(speed)) {
    errors.push(`Invalid speed: ${speed}`);
  }

  if (!isValidLevel(level)) {
    errors.push(`Invalid level: ${level}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

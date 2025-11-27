/**
 * Game Constants
 * All magic numbers extracted to named constants for maintainability
 */

export const GRID_CONFIG = {
    MIN_SIZE: 10,
    MAX_SIZE: 50,
    DEFAULT_SIZE: 20,
    VIRTUALIZATION_THRESHOLD: 20,
} as const;

export const SPEED_CONFIG = {
    MIN: 50, // Fastest (ms per tick)
    MAX: 500, // Slowest (ms per tick)
    DEFAULT: 150,
    INCREMENT: 2, // Speed increase per food eaten
} as const;

// Difficulty Presets
export const DIFFICULTY_PRESETS = {
    easy: {
        initialSpeed: 200,
        speedIncrement: 1,
        description: "Relaxed pace, slower speed progression",
    },
    medium: {
        initialSpeed: 150,
        speedIncrement: 2,
        description: "Balanced challenge, normal speed progression",
    },
    hard: {
        initialSpeed: 100,
        speedIncrement: 3,
        description: "Fast-paced, rapid speed progression with obstacles",
    },
} as const;

// Score Configuration
export const SCORE_CONFIG = {
    FOOD_POINTS: 10,
    POWER_UP_THRESHOLD: 50, // Points required to spawn power-up
    LEVEL_UP_THRESHOLD: 100, // Points required to level up
    MIN_SCORE: 0,
} as const;

// Level Configuration
export const LEVEL_CONFIG = {
    MIN: 1,
    MAX: 100,
    SPEED_INCREASE_PER_LEVEL: 2,
} as const;

// Power-up Configuration
export const POWER_UP_CONFIG = {
    DURATION: 5000, // ms
    SPAWN_LIFETIME: 10000, // ms before auto-removal
    SPEED_BOOST_MODIFIER: 0.7, // 30% faster
    SLOW_MODIFIER: 1.5, // 50% slower
    SCORE_MULTIPLIER: 2,
    MAX_SPAWN_ATTEMPTS: 100,
} as const;

// Snake Configuration
export const SNAKE_CONFIG = {
    INITIAL_LENGTH: 3,
    MIN_LENGTH: 1,
} as const;

// Audio Configuration
export const AUDIO_CONFIG = {
    DEFAULT_VOLUME: 0.3,
    MIN_VOLUME: 0,
    MAX_VOLUME: 1,
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
    TRANSITION_DURATION: 200, // ms
    PULSE_DURATION: 1000, // ms for pulse animations
} as const;

// Storage Keys
export const STORAGE_KEYS = {
    HIGH_SCORE: "snakeHighScore",
    SETTINGS: "snakeSettings",
    STATS: "snakeGameStats",
    TUTORIAL_COMPLETED: "snakeTutorialCompleted",
} as const;

// Keyboard Codes
export const KEYBOARD = {
    SPACE: " ",
    ESCAPE: "Escape",
    ENTER: "Enter",
    TAB: "Tab",
    ARROW_UP: "ArrowUp",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
} as const;

// Mobile Breakpoint
export const BREAKPOINT = {
    MOBILE: 768, // px
} as const;

// Performance
export const PERFORMANCE = {
    GRID_CELL_SIZE_PERCENT: 5, // % of grid size for 20x20 grid
} as const;

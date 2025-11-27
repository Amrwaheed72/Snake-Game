import { GameTheme, Theme } from "../types";

/**
 * Theme configurations for the snake game
 * Each theme defines a complete color palette for all game elements
 */
export const themes: Record<GameTheme, Theme> = {
    classic: {
        name: "Classic Dark",
        colors: {
            background: "#0f172a",
            grid: "#1e293b",
            snake: "#10b981",
            snakeHead: "#34d399",
            food: "#ef4444",
            foodGlow: "rgba(239, 68, 68, 0.6)",
            scoreText: "#34d399",
            cardBg: "#1e293b",
            cardBorder: "#334155",
            buttonBg: "#10b981",
            buttonHover: "#34d399",
            accentPrimary: "#34d399",
            accentSecondary: "#22d3ee",
        },
    },
    ocean: {
        name: "Ocean Blue",
        colors: {
            background: "#0c4a6e",
            grid: "#075985",
            snake: "#06b6d4",
            snakeHead: "#22d3ee",
            food: "#f97316",
            foodGlow: "rgba(249, 115, 22, 0.6)",
            scoreText: "#22d3ee",
            cardBg: "#075985",
            cardBorder: "#0891b2",
            buttonBg: "#06b6d4",
            buttonHover: "#22d3ee",
            accentPrimary: "#22d3ee",
            accentSecondary: "#38bdf8",
        },
    },
    neon: {
        name: "Neon Purple",
        colors: {
            background: "#1e1b4b",
            grid: "#312e81",
            snake: "#a855f7",
            snakeHead: "#c084fc",
            food: "#ec4899",
            foodGlow: "rgba(236, 72, 153, 0.6)",
            scoreText: "#c084fc",
            cardBg: "#312e81",
            cardBorder: "#4c1d95",
            buttonBg: "#a855f7",
            buttonHover: "#c084fc",
            accentPrimary: "#c084fc",
            accentSecondary: "#f0abfc",
        },
    },
    forest: {
        name: "Forest Green",
        colors: {
            background: "#14532d",
            grid: "#166534",
            snake: "#22c55e",
            snakeHead: "#4ade80",
            food: "#eab308",
            foodGlow: "rgba(234, 179, 8, 0.6)",
            scoreText: "#4ade80",
            cardBg: "#166534",
            cardBorder: "#15803d",
            buttonBg: "#22c55e",
            buttonHover: "#4ade80",
            accentPrimary: "#4ade80",
            accentSecondary: "#86efac",
        },
    },
    highcontrast: {
        name: "High Contrast",
        colors: {
            background: "#000000", 
            grid: "#1a1a1a",
            snake: "#00ff00", 
            snakeHead: "#00ff00",
            food: "#ff0000", 
            foodGlow: "rgba(255, 0, 0, 0.8)",
            scoreText: "#ffffff",
            cardBg: "#000000",
            cardBorder: "#ffffff",
            buttonBg: "#ffffff",
            buttonHover: "#cccccc",
            accentPrimary: "#ffffff",
            accentSecondary: "#ffff00", 
        },
    },
};

export const getTheme = (themeName: GameTheme): Theme => {
    return themes[themeName] || themes.classic;
};

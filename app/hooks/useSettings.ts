import { useState, useEffect } from "react";
import { GameSettings, GameTheme } from "../types";
import { safeStorage } from "../utils/safeStorage";

const SETTINGS_KEY = "snakeGameSettings";

const DEFAULT_SETTINGS: GameSettings = {
    gridSize: 20,
    initialSpeed: 150,
    theme: "classic",
    soundEnabled: true,
    difficulty: "medium",
};

/**
 * Custom hook for managing game settings with localStorage persistence
 * @returns Settings state and update functions
 */
const useSettings = () => {
    const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

    // Load settings on mount
    useEffect(() => {
        const saved = safeStorage.getItem(SETTINGS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as GameSettings;
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
            } catch (error) {
                console.error("Error parsing settings:", error);
            }
        }
    }, []);

    // Save settings whenever they change
    useEffect(() => {
        safeStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }, [settings]);

    /**
     * Update a specific setting
     */
    const updateSetting = <K extends keyof GameSettings>(
        key: K,
        value: GameSettings[K]
    ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    /**
     * Update theme
     */
    const setTheme = (theme: GameTheme) => {
        updateSetting("theme", theme);
    };

    /**
     * Toggle sound on/off
     */
    const toggleSound = () => {
        updateSetting("soundEnabled", !settings.soundEnabled);
    };

    /**
     * Set grid size (with validation)
     */
    const setGridSize = (size: number) => {
        const validSize = Math.max(10, Math.min(30, Math.floor(size)));
        updateSetting("gridSize", validSize);
    };

    /**
     * Set difficulty preset
     */
    const setDifficulty = (difficulty: "easy" | "medium" | "hard") => {
        let speed: number;
        switch (difficulty) {
            case "easy":
                speed = 200;
                break;
            case "medium":
                speed = 150;
                break;
            case "hard":
                speed = 100;
                break;
        }
        setSettings((prev) => ({ ...prev, difficulty, initialSpeed: speed }));
    };

    /**
     * Reset to defaults
     */
    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return {
        settings,
        updateSetting,
        setTheme,
        toggleSound,
        setGridSize,
        setDifficulty,
        resetSettings,
    };
};

export default useSettings;

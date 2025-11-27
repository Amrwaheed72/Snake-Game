import { useState, useEffect, useCallback } from "react";
import { GameStats } from "../types";
import { safeStorage } from "../utils/safeStorage";

const STATS_KEY = "snakeGameStats";

const DEFAULT_STATS: GameStats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    bestStreak: 0,
    totalPlayTime: 0,
};

/**
 * Custom hook for tracking and persisting game statistics
 * Tracks lifetime stats across all game sessions
 */
const useGameStats = () => {
    const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
    const [sessionStartTime, setSessionStartTime] = useState<number>(0);
    const [currentStreak, setCurrentStreak] = useState<number>(0);

    // Load stats on mount
    useEffect(() => {
        const saved = safeStorage.getItem(STATS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as GameStats;
                setStats(parsed);
            } catch (error) {
                console.error("Error parsing stats:", error);
            }
        }
    }, []);

    // Save stats whenever they change
    useEffect(() => {
        safeStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }, [stats]);

    /**
     * Start a new game session
     */
    const startSession = useCallback(() => {
        setSessionStartTime(Date.now());
    }, []);

    /**
     * Record a game completion
     */
    const recordGame = useCallback(
        (finalScore: number) => {
            const playTime = sessionStartTime
                ? Math.floor((Date.now() - sessionStartTime) / 1000)
                : 0;

            setStats((prev) => ({
                gamesPlayed: prev.gamesPlayed + 1,
                totalScore: prev.totalScore + finalScore,
                bestScore: Math.max(prev.bestScore, finalScore),
                bestStreak: Math.max(prev.bestStreak, currentStreak),
                totalPlayTime: prev.totalPlayTime + playTime,
            }));

            // Reset session
            setSessionStartTime(0);
        },
        [sessionStartTime, currentStreak]
    );

    /**
     * Update current streak
     */
    const updateStreak = useCallback((score: number) => {
        setCurrentStreak(Math.floor(score / 10));
    }, []);

    /**
     * Reset all statistics
     */
    const resetStats = useCallback(() => {
        setStats(DEFAULT_STATS);
        setCurrentStreak(0);
        setSessionStartTime(0);
    }, []);

    /**
     * Get average score
     */
    const getAverageScore = (): number => {
        if (stats.gamesPlayed === 0) return 0;
        return Math.floor(stats.totalScore / stats.gamesPlayed);
    };

    /**
     * Format play time as HH:MM:SS
     */
    const getFormattedPlayTime = (): string => {
        const hours = Math.floor(stats.totalPlayTime / 3600);
        const minutes = Math.floor((stats.totalPlayTime % 3600) / 60);
        const seconds = stats.totalPlayTime % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    };

    return {
        stats,
        currentStreak,
        startSession,
        recordGame,
        updateStreak,
        resetStats,
        getAverageScore,
        getFormattedPlayTime,
    };
};

export default useGameStats;

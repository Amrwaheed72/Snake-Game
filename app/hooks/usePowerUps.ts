import { useState, useCallback, useEffect } from "react";
import { PowerUp, PowerUpType, Point, Snake } from "../types";
import { isValidFoodPosition, isValidPoint } from "../utils/validators";

interface UsePowerUpsProps {
    gridSize: number;
    snake: Snake;
    score: number;
}

/**
 * Custom hook for managing power-ups in the game
 * Power-ups spawn randomly and provide temporary effects
 */
const usePowerUps = ({ gridSize, snake, score }: UsePowerUpsProps) => {
    const [powerUp, setPowerUp] = useState<PowerUp | null>(null);
    const [activeEffect, setActiveEffect] = useState<PowerUpType | null>(null);
    const [effectEndTime, setEffectEndTime] = useState<number>(0);

    /**
     * Generate a random power-up type
     */
    const getRandomPowerUpType = (): PowerUpType => {
        const types: PowerUpType[] = ["speed", "multiplier", "invincible", "slow"];
        return types[Math.floor(Math.random() * types.length)];
    };

    /**
     * Spawn a new power-up at a random valid position
     */
    const spawnPowerUp = useCallback(() => {
        // Only spawn power-ups if score is above threshold (every 50 points)
        if (score % 50 !== 0 || score === 0) return;

        let position: Point;
        let attempts = 0;
        const maxAttempts = 100;

        do {
            position = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
            attempts++;
        } while (
            (!isValidPoint(position, gridSize) ||
                !isValidFoodPosition(position, snake)) &&
            attempts < maxAttempts
        );

        if (attempts >= maxAttempts) return;

        const type = getRandomPowerUpType();
        const duration = 5000; // 5 seconds

        setPowerUp({
            type,
            position,
            duration,
            active: false,
        });

        // Auto-remove power-up after 10 seconds if not collected
        setTimeout(() => {
            setPowerUp((current) => {
                if (current && !current.active) return null;
                return current;
            });
        }, 10000);
    }, [gridSize, snake, score]);

    /**
     * Activate a power-up effect
     */
    const activatePowerUp = useCallback(() => {
        if (!powerUp) return null;

        setActiveEffect(powerUp.type);
        const endTime = Date.now() + powerUp.duration;
        setEffectEndTime(endTime);

        // Mark power-up as consumed
        setPowerUp((current) => {
            if (current) {
                return { ...current, active: true };
            }
            return null;
        });

        // Clear after duration
        setTimeout(() => {
            setActiveEffect(null);
            setEffectEndTime(0);
            setPowerUp(null);
        }, powerUp.duration);

        return powerUp.type;
    }, [powerUp]);

    /**
     * Check if point collides with power-up
     */
    const checkPowerUpCollision = useCallback(
        (point: Point): boolean => {
            if (!powerUp || powerUp.active) return false;
            return point.x === powerUp.position.x && point.y === powerUp.position.y;
        },
        [powerUp]
    );

    /**
     * Clear all power-ups (for game reset)
     */
    const clearPowerUps = useCallback(() => {
        setPowerUp(null);
        setActiveEffect(null);
        setEffectEndTime(0);
    }, []);

    /**
     * Get effect multiplier based on active power-up
     */
    const getScoreMultiplier = (): number => {
        return activeEffect === "multiplier" ? 2 : 1;
    };

    /**
     * Get speed modifier based on active power-up
     */
    const getSpeedModifier = (): number => {
        if (activeEffect === "speed") return 0.7; // 30% faster
        if (activeEffect === "slow") return 1.5; // 50% slower
        return 1;
    };

    /**
     * Check if invincible
     */
    const isInvincible = (): boolean => {
        return activeEffect === "invincible";
    };

    // Auto-spawn power-ups based on score
    useEffect(() => {
        spawnPowerUp();
    }, [spawnPowerUp]);

    return {
        powerUp,
        activeEffect,
        effectEndTime,
        activatePowerUp,
        checkPowerUpCollision,
        clearPowerUps,
        getScoreMultiplier,
        getSpeedModifier,
        isInvincible,
    };
};

export default usePowerUps;

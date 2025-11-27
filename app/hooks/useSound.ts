import { useEffect } from "react";
import { audioManager } from "../utils/AudioManager";

/**
 * Custom hook for managing game sound effects
 * Provides a simple interface to the AudioManager singleton
 */
const useSound = (enabled: boolean) => {
    // Update audio manager when enabled state changes
    useEffect(() => {
        audioManager.setEnabled(enabled);
    }, [enabled]);

    /**
     * Play eat sound
     */
    const playEat = () => {
        audioManager.play("eat");
    };

    /**
     * Play game over sound
     */
    const playGameOver = () => {
        audioManager.play("gameOver");
    };

    /**
     * Play level up sound
     */
    const playLevelUp = () => {
        audioManager.play("levelUp");
    };

    /**
     * Play power-up sound
     */
    const playPowerUp = () => {
        audioManager.play("powerUp");
    };

    /**
     * Set volume (0 to 1)
     */
    const setVolume = (volume: number) => {
        audioManager.setVolume(volume);
    };

    return {
        playEat,
        playGameOver,
        playLevelUp,
        playPowerUp,
        setVolume,
    };
};

export default useSound;

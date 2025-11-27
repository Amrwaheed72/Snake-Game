/**
 * Haptic Feedback Utility
 * Provides vibration feedback for mobile devices
 */

/**
 * Check if vibration API is supported
 */
export const isVibrationSupported = (): boolean => {
    return typeof navigator !== "undefined" && "vibrate" in navigator;
};

/**
 * Trigger a short vibration (collision, button press)
 */
export const vibrateShort = (): void => {
    if (isVibrationSupported()) {
        navigator.vibrate(50);
    }
};

/**
 * Trigger a medium vibration (food eaten, power-up)
 */
export const vibrateMedium = (): void => {
    if (isVibrationSupported()) {
        navigator.vibrate(100);
    }
};

/**
 * Trigger a long vibration (game over)
 */
export const vibrateLong = (): void => {
    if (isVibrationSupported()) {
        navigator.vibrate(200);
    }
};

/**
 * Trigger a pattern vibration (level up)
 */
export const vibratePattern = (pattern: number[]): void => {
    if (isVibrationSupported()) {
        navigator.vibrate(pattern);
    }
};

/**
 * Level up celebration pattern
 */
export const vibrateLevelUp = (): void => {
    vibratePattern([50, 50, 50, 50, 100]);
};

/**
 * Power-up collection pattern
 */
export const vibratePowerUp = (): void => {
    vibratePattern([30, 30, 30]);
};

/**
 * Cancel all vibrations
 */
export const cancelVibration = (): void => {
    if (isVibrationSupported()) {
        navigator.vibrate(0);
    }
};

import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/game";
import { safeStorage } from "../utils/safeStorage";

/**
 * Hook for managing tutorial state
 * Tracks whether user has completed the tutorial
 */
const useTutorial = () => {
    const [tutorialCompleted, setTutorialCompleted] = useState(true); // Default to true for existing users
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        const completed = safeStorage.getItem(STORAGE_KEYS.TUTORIAL_COMPLETED);
        if (completed === null) {
            // First time user
            setTutorialCompleted(false);
            setShowTutorial(true);
        } else {
            setTutorialCompleted(completed === "true");
        }
    }, []);

    const completeTutorial = () => {
        safeStorage.setItem(STORAGE_KEYS.TUTORIAL_COMPLETED, "true");
        setTutorialCompleted(true);
        setShowTutorial(false);
    };

    const resetTutorial = () => {
        safeStorage.removeItem(STORAGE_KEYS.TUTORIAL_COMPLETED);
        setTutorialCompleted(false);
        setShowTutorial(true);
    };

    return {
        tutorialCompleted,
        showTutorial,
        setShowTutorial,
        completeTutorial,
        resetTutorial,
    };
};

export default useTutorial;

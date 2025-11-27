import { Trophy } from "lucide-react";
import { sanitizeScore } from "../utils/validators";

interface ScorePanelProps {
    score: number;
    level: number;
    highScore: number;
    activeEffect: string | null;
    theme: {
        colors: {
            cardBg: string;
            cardBorder: string;
            scoreText: string;
            accentSecondary: string;
        };
    };
}

const ScorePanel = ({
    score,
    level,
    highScore,
    activeEffect,
    theme,
}: ScorePanelProps) => {
    return (
        <div
            className="w-full mt-24 md:mt-0 max-w-md flex justify-between items-center mb-6 rounded-xl shadow-lg p-4 transition-all duration-500"
            style={{
                backgroundColor: theme.colors.cardBg,
                borderColor: theme.colors.cardBorder,
                borderWidth: "1px",
            }}
            role="status"
            aria-label="Game statistics"
        >
            <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    Score
                </span>
                <span
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.scoreText }}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {sanitizeScore(score)}
                    {activeEffect && (
                        <span className="text-xs ml-2 animate-pulse">
                            {activeEffect === "multiplier" && "×2"}
                            {activeEffect === "speed" && "⚡"}
                            {activeEffect === "invincible" && "🛡️"}
                            {activeEffect === "slow" && "🐌"}
                        </span>
                    )}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    Level
                </span>
                <span
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.accentSecondary }}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {Math.max(1, Math.min(100, level))}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-70">
                    <Trophy size={14} className="text-yellow-500" aria-hidden="true" /> High Score
                </div>
                <span className="text-2xl font-bold">{sanitizeScore(highScore)}</span>
            </div>
        </div>
    );
};

ScorePanel.displayName = "ScorePanel";

export default ScorePanel;

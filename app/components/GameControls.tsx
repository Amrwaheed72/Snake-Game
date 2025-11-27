import { KEYBOARD } from "../constants/game";

interface GameControlsProps {
    theme: {
        colors: {
            cardBg: string;
            cardBorder: string;
        };
    };
}

const GameControls = ({ theme }: GameControlsProps) => {
    return (
        <div className="mt-8 hidden md:flex gap-4 text-sm opacity-70" role="complementary" aria-label="Keyboard controls">
            <div className="flex items-center gap-2">
                <kbd
                    className="px-2 py-1 rounded font-mono text-xs"
                    style={{
                        backgroundColor: theme.colors.cardBg,
                        borderColor: theme.colors.cardBorder,
                        borderWidth: "1px",
                    }}
                >
                    {KEYBOARD.SPACE}
                </kbd>
                <span>Pause/Resume</span>
            </div>
            <div className="flex items-center gap-2">
                <kbd
                    className="px-2 py-1 rounded font-mono text-xs"
                    style={{
                        backgroundColor: theme.colors.cardBg,
                        borderColor: theme.colors.cardBorder,
                        borderWidth: "1px",
                    }}
                >
                    Arrow Keys
                </kbd>
                <span>Move</span>
            </div>
        </div>
    );
};

GameControls.displayName = "GameControls";

export default GameControls;

import { Play, Settings as SettingsIcon, RotateCcw, X } from "lucide-react";

interface PauseMenuProps {
    onResume: () => void;
    onRestart: () => void;
    onSettings: () => void;
    onClose: () => void;
    score: number;
    buttonBg: string;
    buttonHover: string;
}

const PauseMenu = ({
    onResume,
    onRestart,
    onSettings,
    onClose,
    score,
    buttonBg,
    buttonHover,
}: PauseMenuProps) => {
    const menuButtons = [
        {
            icon: Play,
            label: "Resume",
            onClick: onResume,
            primary: true,
        },
        {
            icon: SettingsIcon,
            label: "Settings",
            onClick: onSettings,
            primary: false,
        },
        {
            icon: RotateCcw,
            label: "Restart",
            onClick: onRestart,
            primary: false,
        },
    ];

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-30">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close pause menu"
            >
                <X size={20} className="text-white" />
            </button>

            <h2 className="text-3xl font-black text-white mb-2">PAUSED</h2>
            <p className="text-white/60 mb-6">Current Score: {score}</p>

            <div className="flex flex-col gap-3 w-48">
                {menuButtons.map((button, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={button.onClick}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            backgroundColor: button.primary ? buttonBg : "rgba(255,255,255,0.1)",
                            color: button.primary ? "#000" : "#fff",
                        }}
                        onMouseEnter={(e) => {
                            if (button.primary) {
                                e.currentTarget.style.backgroundColor = buttonHover;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (button.primary) {
                                e.currentTarget.style.backgroundColor = buttonBg;
                            }
                        }}
                    >
                        <button.icon size={20} />
                        {button.label}
                    </button>
                ))}
            </div>

            <div className="mt-8 text-center text-white/40 text-xs">
                <p className="mb-2">Keyboard Controls:</p>
                <div className="flex gap-4 justify-center">
                    <span>↑ ↓ ← → Move</span>
                    <span>Space Pause</span>
                </div>
            </div>
        </div>
    );
};

export default PauseMenu;

import { GameSettings, GameTheme } from "../types";
import { Volume2, VolumeX, Palette, Sliders, X } from "lucide-react";
import { themes } from "../constants/themes";

interface SettingsProps {
    settings: GameSettings;
    onClose: () => void;
    onThemeChange: (theme: GameTheme) => void;
    onSoundToggle: () => void;
    onGridSizeChange: (size: number) => void;
    onDifficultyChange: (difficulty: "easy" | "medium" | "hard") => void;
    cardBg: string;
    cardBorder: string;
    buttonBg: string;
    accentColor: string;
}

const Settings = ({
    settings,
    onClose,
    onThemeChange,
    onSoundToggle,
    onGridSizeChange,
    onDifficultyChange,
    cardBg,
    cardBorder,
    buttonBg,
    accentColor,
}: SettingsProps) => {
    return (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div
                className="w-full max-w-md rounded-2xl shadow-2xl p-6 relative"
                style={{
                    backgroundColor: cardBg,
                    borderColor: cardBorder,
                    borderWidth: "2px",
                }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close settings"
                >
                    <X size={20} className="text-white" />
                </button>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sliders size={24} style={{ color: accentColor }} />
                    Settings
                </h2>

                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold mb-3 opacity-70">
                        <Palette size={16} />
                        Theme
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(themes) as GameTheme[]).map((themeKey) => (
                            <button
                                key={themeKey}
                                type="button"
                                onClick={() => onThemeChange(themeKey)}
                                className="p-3 rounded-lg border-2 transition-all hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: themes[themeKey].colors.background,
                                    borderColor:
                                        settings.theme === themeKey ? accentColor : "transparent",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: themes[themeKey].colors.snake }}
                                    />
                                    <span className="text-sm font-medium text-white">
                                        {themes[themeKey].name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold mb-3 opacity-70">
                        {settings.soundEnabled ? (
                            <Volume2 size={16} />
                        ) : (
                            <VolumeX size={16} />
                        )}
                        Sound Effects
                    </label>
                    <button
                        type="button"
                        onClick={onSoundToggle}
                        className="w-full p-3 rounded-lg border-2 transition-all hover:scale-105 active:scale-95 flex items-center justify-between"
                        style={{
                            backgroundColor: settings.soundEnabled
                                ? buttonBg
                                : "rgba(255,255,255,0.1)",
                            borderColor: settings.soundEnabled ? accentColor : "transparent",
                            color: settings.soundEnabled ? "#000" : "#fff",
                        }}
                    >
                        <span className="font-medium">
                            {settings.soundEnabled ? "Enabled" : "Disabled"}
                        </span>
                        {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                </div>

                <div className="mb-6">
                    <label className="text-sm font-bold mb-2 block opacity-70">
                        Grid Size: {settings.gridSize}x{settings.gridSize}
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={settings.gridSize}
                        onChange={(e) => onGridSizeChange(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((settings.gridSize - 10) / 20) * 100
                                }%, rgba(255,255,255,0.2) ${((settings.gridSize - 10) / 20) * 100
                                }%, rgba(255,255,255,0.2) 100%)`,
                        }}
                    />
                    <div className="flex justify-between text-xs opacity-50 mt-1">
                        <span>Small</span>
                        <span>Large</span>
                    </div>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                    <label className="text-sm font-bold mb-3 block opacity-70">
                        Difficulty
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["easy", "medium", "hard"] as const).map((diff) => (
                            <button
                                key={diff}
                                type="button"
                                onClick={() => onDifficultyChange(diff)}
                                className="p-2 rounded-lg border-2 transition-all hover:scale-105 active:scale-95 capitalize"
                                style={{
                                    backgroundColor:
                                        settings.difficulty === diff
                                            ? buttonBg
                                            : "rgba(255,255,255,0.1)",
                                    borderColor:
                                        settings.difficulty === diff ? accentColor : "transparent",
                                    color: settings.difficulty === diff ? "#000" : "#fff",
                                }}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-xs opacity-50 text-center mt-4">
                    ⚠️ Changing settings will restart the game
                </p>
            </div>
        </div>
    );
};

export default Settings;

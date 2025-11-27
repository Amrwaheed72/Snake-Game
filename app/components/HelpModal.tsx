import { HelpCircle, X, ArrowUp, Zap, Star, Shield, Clock } from "lucide-react";

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: {
        colors: {
            cardBg: string;
            cardBorder: string;
            accentPrimary: string;
        };
    };
}

const HelpModal = ({ isOpen, onClose, theme }: HelpModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.cardBorder,
                    borderWidth: "2px",
                }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close help"
                >
                    <X size={20} className="text-white" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <HelpCircle size={28} style={{ color: theme.colors.accentPrimary }} />
                    <h2 className="text-2xl font-bold">How to Play</h2>
                </div>

                <div className="space-y-6 text-white">
                    <section>
                        <h3 className="font-bold text-lg mb-2">Game Rules</h3>
                        <ul className="list-disc list-inside space-y-1 opacity-80">
                            <li>Eat food to grow longer and score points</li>
                            <li>Each food gives you 10 points</li>
                            <li>Avoid hitting walls or your own body</li>
                            <li>Speed increases as you level up</li>
                            <li>Try to beat your high score!</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">Keyboard Shortcuts</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2  bg-white/5 p-2 rounded">
                                <ArrowUp size={16} />
                                <span className="text-sm">Arrow Keys - Move</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap bg-white/5 p-2 rounded">
                                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Space</kbd>
                                <span className="text-sm">Pause/Resume</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-2 rounded">
                                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Esc</kbd>
                                <span className="text-sm">Close Modals</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">Power-ups</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <Zap size={18} className="text-yellow-500" />
                                <div>
                                    <span className="font-semibold">Speed Boost:</span> Move 30% faster for 5 seconds
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <Star size={18} className="text-blue-400" />
                                <div>
                                    <span className="font-semibold">Score Multiplier:</span> Double points for 5 seconds
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <Shield size={18} className="text-green-400" />
                                <div>
                                    <span className="font-semibold">Invincibility:</span> Pass through walls for 5 seconds
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <Clock size={18} className="text-orange-400" />
                                <div>
                                    <span className="font-semibold">Slow Motion:</span> Slow down time by 50% for 5 seconds
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">Settings</h3>
                        <ul className="list-disc list-inside space-y-1 opacity-80">
                            <li>Choose from 4 beautiful themes</li>
                            <li>Adjust grid size (10x10 to 30x30)</li>
                            <li>Select difficulty level</li>
                            <li>Toggle sound effects and volume</li>
                        </ul>
                    </section>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full px-6 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-all"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

HelpModal.displayName = "HelpModal";

export default HelpModal;

import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Star, Shield, Clock } from "lucide-react";
import Button from "./ui/Button";

interface TutorialProps {
    onComplete: () => void;
    theme: {
        colors: {
            cardBg: string;
            cardBorder: string;
            buttonBg: string;
            buttonHover: string;
            accentPrimary: string;
        };
    };
}


const Tutorial = ({ onComplete, theme }: TutorialProps) => {
    return (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <div
                className="w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.cardBorder,
                    borderWidth: "2px",
                }}
                role="dialog"
                aria-labelledby="tutorial-title"
                aria-describedby="tutorial-description"
            >
                <button
                    type="button"
                    onClick={onComplete}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Skip tutorial"
                >
                    <X size={20} className="text-white" />
                </button>

                <h2 id="tutorial-title" className="text-3xl font-bold mb-6 text-center" style={{ color: theme.colors.accentPrimary }}>
                    Welcome to Snake! 🐍
                </h2>

                <div id="tutorial-description" className="space-y-6 text-white">
                    <section>
                        <h3 className="text-xl font-bold mb-2">Objective</h3>
                        <p className="opacity-80">
                            Guide your snake to eat food and grow longer. Avoid hitting walls or yourself!
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-3">Controls</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <div className="flex gap-1">
                                    <ArrowUp size={16} />
                                    <ArrowDown size={16} />
                                    <ArrowLeft size={16} />
                                    <ArrowRight size={16} />
                                </div>
                                <span>Arrow keys to move</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                <kbd className="px-2 py-1 bg-white/10 rounded text-sm">Space</kbd>
                                <span>Pause/Resume</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-3">Power-ups</h3>
                        <p className="opacity-80 mb-3">Collect power-ups that appear every 50 points:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                                <Zap size={20} className="text-yellow-500" />
                                <div>
                                    <div className="font-bold">Speed Boost</div>
                                    <div className="text-sm opacity-70">Move 30% faster</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                <Star size={20} className="text-blue-400" />
                                <div>
                                    <div className="font-bold">Score Multiplier</div>
                                    <div className="text-sm opacity-70">Double points</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                <Shield size={20} className="text-green-400" />
                                <div>
                                    <div className="font-bold">Invincibility</div>
                                    <div className="text-sm opacity-70">Pass through walls</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                                <Clock size={20} className="text-orange-400" />
                                <div>
                                    <div className="font-bold">Slow Motion</div>
                                    <div className="text-sm opacity-70">Slow down time</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-2">Pro Tips</h3>
                        <ul className="list-disc list-inside space-y-2 opacity-80">
                            <li>The game speeds up as you level up</li>
                            <li>Plan your path ahead to avoid trapping yourself</li>
                            <li>Power-ups last only 5 seconds - use them wisely!</li>
                            <li>Customize themes and difficulty in Settings ⚙️</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button
                        backgroundColor={theme.colors.buttonBg}
                        hoverColor={theme.colors.buttonHover}
                        onClick={onComplete}
                        size="lg"
                    >
                        Let&apos;s Play! 🎮
                    </Button>
                </div>
            </div>
        </div>
    );
};

Tutorial.displayName = "Tutorial";

export default Tutorial;

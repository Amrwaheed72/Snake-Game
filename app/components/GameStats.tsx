import { GameStats as GameStatsType } from "../types";
import { Trophy, Target, TrendingUp, Clock } from "lucide-react";

interface GameStatsProps {
    stats: GameStatsType;
    averageScore: number;
    formattedPlayTime: string;
    cardBg: string;
    cardBorder: string;
    textColor: string;
}

const GameStats = ({
    stats,
    averageScore,
    formattedPlayTime,
    cardBg,
    cardBorder,
    textColor,
}: GameStatsProps) => {
    const statItems = [
        {
            icon: Trophy,
            label: "Games Played",
            value: stats.gamesPlayed,
            color: "text-yellow-400",
        },
        {
            icon: Target,
            label: "Best Score",
            value: stats.bestScore,
            color: "text-emerald-400",
        },
        {
            icon: TrendingUp,
            label: "Average",
            value: averageScore,
            color: "text-cyan-400",
        },
        {
            icon: Clock,
            label: "Play Time",
            value: formattedPlayTime,
            color: "text-purple-400",
        },
    ];

    return (
        <div
            className="w-full max-w-md rounded-xl shadow-lg p-4 mt-4"
            style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: "1px",
            }}
        >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                📊 Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {statItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg bg-black/20"
                    >
                        <item.icon size={18} className={item.color} />
                        <div className="flex flex-col">
                            <span className="text-xs opacity-60">{item.label}</span>
                            <span className="text-sm font-bold" style={{ color: textColor }}>
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameStats;

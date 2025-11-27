import { PowerUp as PowerUpType } from "../types";
import { Zap, Star, Shield, Timer } from "lucide-react";

interface PowerUpProps {
    powerUp: PowerUpType;
    gridSize: number;
}

const PowerUp = ({ powerUp, gridSize }: PowerUpProps) => {
    const { type, position } = powerUp;

    const getIcon = () => {
        switch (type) {
            case "speed":
                return <Zap size={16} className="text-yellow-400" />;
            case "multiplier":
                return <Star size={16} className="text-purple-400" />;
            case "invincible":
                return <Shield size={16} className="text-blue-400" />;
            case "slow":
                return <Timer size={16} className="text-cyan-400" />;
        }
    };

    const getColor = () => {
        switch (type) {
            case "speed":
                return "#facc15";
            case "multiplier":
                return "#c084fc";
            case "invincible":
                return "#60a5fa";
            case "slow":
                return "#22d3ee";
            default:
                return "#fbbf24";
        }
    };

    const cellSize = 100 / gridSize;

    return (
        <div
            className="absolute rounded-md shadow-lg animate-pulse z-10 flex items-center justify-center"
            style={{
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                left: `${position.x * cellSize}%`,
                top: `${position.y * cellSize}%`,
                backgroundColor: getColor(),
                boxShadow: `0 0 20px ${getColor()}`,
                transition: "all 0.2s ease-out",
            }}
        >
            {getIcon()}
        </div>
    );
};

export default PowerUp;

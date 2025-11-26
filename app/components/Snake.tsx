import { Point } from "../types";

interface Props {
  isHead: boolean;
  segment: Point;
  speed:number
}

const Snake = ({ isHead, segment,speed }: Props) => {
  return (
    <div
      className={`absolute rounded-sm transition-all linear ${
        isHead ? "z-20" : "z-10"
      }`}
      style={{
        width: "5%",
        height: "5%",
        left: `${segment.x * 5}%`,
        top: `${segment.y * 5}%`,
        backgroundColor: isHead ? "#34d399" : "#10b981",
        opacity: isHead ? 1 : 0.9,
        transitionDuration: `${speed}ms`,
      }}
    >
      {/* Eyes for the head */}
      {isHead && (
        <div className="relative w-full h-full">
          <div className="absolute top-1 left-1 w-1 h-1 bg-slate-900 rounded-full" />
          <div className="absolute top-1 right-1 w-1 h-1 bg-slate-900 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Snake;

import { Play } from "lucide-react";
import { directionBtns } from "../constants";
import { Direction, MobileDirectionsProps } from "../types";

const MobileDirections = ({
  currentDirRef,
  setDirection,
  setIsPaused,
}: MobileDirectionsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-6 md:hidden relative">
      {directionBtns.map(({ direction, notEqual, icon }, index) => (
        <div key={`direction-${direction}-${index}`} className="contents">
          <div />
          <button
            title={direction}
            type="button"
            className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg active:bg-slate-700 active:scale-95 transition-all border border-slate-700"
            onClick={() => {
              if (currentDirRef.current !== notEqual)
                setDirection(direction as Direction);
              setIsPaused(false);
            }}
          >
            {icon}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setIsPaused((prev) => !prev)}
        className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg active:bg-slate-700 active:scale-95 transition-all border border-slate-700"
        aria-label="Pause/Resume"
      >
        <Play size={22} className="text-emerald-400" />
      </button>
    </div>
  );
};

export default MobileDirections;

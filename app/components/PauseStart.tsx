import { Play } from "lucide-react";

interface Props {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
}
const PauseStart = ({ score, setIsPaused }: Props) => {
  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-lg z-30">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl text-center">
        <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest font-bold">
          {score === 0 ? "Ready?" : "Paused"}
        </p>
        <button
          title="play"
          type="button"
          onClick={() => setIsPaused(false)}
          className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-110 active:scale-95 mx-auto"
        >
          <Play fill="white" className="ml-1" size={32} />
        </button>
        <p className="mt-4 text-xs text-slate-500">Use Arrow Keys or W-A-S-D</p>
      </div>
    </div>
  );
};

export default PauseStart;

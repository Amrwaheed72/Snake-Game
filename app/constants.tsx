import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
export const directionBtns = [
  {
    direction: "UP",
    notEqual: "DOWN",
    icon: <ChevronUp size={30} className="text-emerald-400" />,
  },
  {
    direction: "LEFT",
    notEqual: "RIGHT",
    icon: <ChevronLeft size={30} className="text-emerald-400" />,
  },
  {
    direction: "RIGHT",
    notEqual: "LEFT",
    icon: <ChevronRight size={30} className="text-emerald-400" />,
  },
  {
    direction: "DOWN",
    notEqual: "UP",
    icon: <ChevronDown size={30} className="text-emerald-400" />,
  },
];

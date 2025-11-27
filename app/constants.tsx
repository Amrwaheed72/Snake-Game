import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Direction } from "./types";
import { JSX } from "react";
export const directionBtns: ReadonlyArray<{
  direction: Direction;
  notEqual: Direction;
  icon: JSX.Element;
}> = [
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

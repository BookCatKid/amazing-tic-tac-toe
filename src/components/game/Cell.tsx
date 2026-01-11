import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlayerSymbol } from "./PlayerSymbol";
import type { CellValue } from "@/lib/game/types";

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Cell({ value, onClick, disabled, size = "md" }: CellProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-24 h-24",
  };

  return (
    <motion.button
      whileTap={!disabled && !value ? { scale: 0.9 } : {}}
      onClick={onClick}
      disabled={disabled || !!value}
      className={cn(
        "flex items-center justify-center font-bold transition-all",
        "bg-transparent hover:bg-white/[0.03]",
        sizeClasses[size],
        disabled && "opacity-50 grayscale cursor-default hover:bg-transparent",
        value === "X" && "text-blue-500",
        value === "O" && "text-red-500",
      )}
    >
      {value && <PlayerSymbol symbol={value} className="w-[65%] h-[65%]" />}
    </motion.button>
  );
}

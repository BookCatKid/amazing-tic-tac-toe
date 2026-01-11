import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GameSymbol } from "@/lib/game/types";

interface PlayerSymbolProps {
  symbol: GameSymbol | null;
  className?: string;
  animate?: boolean;
  slow?: boolean;
}

export function PlayerSymbol({
  symbol,
  className,
  animate = true,
  slow = false,
}: PlayerSymbolProps) {
  const duration = slow
    ? symbol === "X"
      ? 0.8
      : 1.0
    : symbol === "X"
      ? 0.25
      : 0.3;
  const xDelay = slow ? 0.4 : 0.1;

  if (symbol === "S") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn("drop-shadow-sm overflow-visible", className)}
      >
        <motion.path
          d="M75,25 C75,5 25,5 25,25 C25,45 75,55 75,75 C75,95 25,95 25,75"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-blue-500"
          initial={
            animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }
          }
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration, ease: "easeOut" }}
        />
      </svg>
    );
  }

  if (symbol === "X") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn("drop-shadow-sm overflow-visible", className)}
      >
        <motion.path
          d="M25,25 L75,75"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-blue-500"
          initial={
            animate
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: 1 }
          }
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration, ease: "easeOut" }}
        />
        <motion.path
          d="M75,25 L25,75"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-blue-500"
          initial={
            animate
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: 1 }
          }
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            duration,
            ease: "easeOut",
            delay: animate ? xDelay : 0,
          }}
        />
      </svg>
    );
  }

  if (symbol === "O") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn("drop-shadow-sm overflow-visible", className)}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-red-500"
          initial={
            animate
              ? { pathLength: 0, opacity: 0, rotate: -90 }
              : { pathLength: 1, opacity: 1, rotate: -90 }
          }
          animate={
            animate ? { pathLength: 1, opacity: 1, rotate: -90 } : undefined
          }
          transition={{ duration, ease: "easeOut" }}
        />
      </svg>
    );
  }

  return null;
}

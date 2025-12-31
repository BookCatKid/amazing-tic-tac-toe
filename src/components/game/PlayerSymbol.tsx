import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Player } from '@/lib/game/types';

interface PlayerSymbolProps {
  player: Player;
  className?: string;
  animate?: boolean;
}

export function PlayerSymbol({ player, className, animate = true }: PlayerSymbolProps) {
  if (player === 'X') {
    return (
      <svg viewBox="0 0 100 100" className={cn("drop-shadow-sm overflow-visible", className)}>
        <motion.path
          d="M25,25 L75,75"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-blue-500"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.path
          d="M75,25 L25,75"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-blue-500"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.25, ease: "easeOut", delay: animate ? 0.1 : 0 }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={cn("drop-shadow-sm overflow-visible", className)}>
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        strokeWidth="12"
        strokeLinecap="round"
        className="stroke-red-500"
        initial={animate ? { pathLength: 0, opacity: 0, rotate: -90 } : { pathLength: 1, opacity: 1, rotate: -90 }}
        animate={animate ? { pathLength: 1, opacity: 1, rotate: -90 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

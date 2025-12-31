import { cn } from '@/lib/utils';
import { Cell } from './Cell';
import { PlayerSymbol } from './PlayerSymbol';
import { motion } from 'framer-motion';
import type { BoardState, Player } from '@/lib/game/types';

interface BoardProps {
  cells: BoardState;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winner?: Player | null;
  isNext?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Board({ cells, onCellClick, disabled, winner, isNext, size='md' }: BoardProps) {

  return (
    <div className={cn(
      "relative grid grid-cols-3",
      disabled && !winner && "opacity-40"
    )}>
      {cells.map((cell, idx) => {
        const borderClasses = cn(
          "border-white/10",
          idx % 3 !== 2 && "border-r-4",
          idx < 6 && "border-b-4"
        );

        return (
          <div key={idx} className={borderClasses}>
            <Cell
              value={cell}
              onClick={() => onCellClick(idx)}
              disabled={disabled || !!winner}
              highlight={isNext && !winner}
              size={size}
            />
          </div>
        );
      })}

      {/* Overlay winner if won */}
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-neutral-900/40 backdrop-blur-[1px] z-10"
        >
          {winner && (
            <PlayerSymbol player={winner} className="w-[70%] h-[70%]" slow={true} />
          )}
        </motion.div>
      )}
    </div>
  );
}

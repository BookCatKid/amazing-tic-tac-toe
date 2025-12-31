import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import type { Player } from '@/lib/game/types';
import { motion } from 'framer-motion';
import { Board } from './Board';
import { PlayerSymbol } from './PlayerSymbol';

export function UltimateBoard() {
  const { ultimateBoard, nextBoardIndex, makeMove, winner } = useGameStore();

  const handleCellClick = (boardIdx: number, cellIdx: number) => {
    makeMove(boardIdx, cellIdx);
  };

  return (
    <div className="relative grid grid-cols-3 bg-transparent overflow-hidden">
      {ultimateBoard.boards.map((board, boardIdx) => {
        const isPlayable = winner === null && (nextBoardIndex === null || nextBoardIndex === boardIdx);
        const boardWinner = ultimateBoard.macroBoard[boardIdx];

        // Macro border classes - clean thick lines
        const macroBorderClasses = cn(
          "border-white/30",
          boardIdx % 3 !== 2 && "border-r-8",
          boardIdx < 6 && "border-b-8",
          "p-2" // Reduced padding to expand sub-boards
        );

        return (
          <div key={boardIdx} className={macroBorderClasses}>
            <Board
              cells={board}
              onCellClick={(cellIdx) => handleCellClick(boardIdx, cellIdx)}
              disabled={!isPlayable || !!boardWinner}
              winner={boardWinner}
              isNext={isPlayable && !boardWinner}
              size="md"
            />
          </div>
        );
      })}

      {winner && winner !== 'DRAW' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-neutral-900/40 backdrop-blur-[1px] z-20"
        >
          <PlayerSymbol player={winner as Player} className="w-[60%] h-[60%] drop-shadow-xl" />
        </motion.div>
      )}
    </div>
  );
}

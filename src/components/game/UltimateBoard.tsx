import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import { Board } from "./Board";
import type { BoardState } from "@/lib/game/types";

export function UltimateBoard() {
  const { ultimateBoard, nextBoardIndex, makeMove, winner } = useGameStore();

  const handleCellClick = (boardIdx: number, cellIdx: number) => {
    makeMove(boardIdx, cellIdx);
  };

  if (!ultimateBoard) return null;

  return (
    <div className="relative grid grid-cols-3 bg-transparent overflow-hidden">
      {ultimateBoard.boards.map((board: BoardState, boardIdx: number) => {
        const isPlayable =
          winner === null &&
          (nextBoardIndex === null || nextBoardIndex === boardIdx);
        const boardWinner = ultimateBoard.macroBoard[boardIdx];

        // Macro border classes - clean thick lines
        const macroBorderClasses = cn(
          "border-white/30",
          boardIdx % 3 !== 2 && "border-r-8",
          boardIdx < 6 && "border-b-8",
          "p-2", // Reduced padding to expand sub-boards
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
    </div>
  );
}

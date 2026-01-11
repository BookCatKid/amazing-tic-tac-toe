import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Board } from "@/components/game/Board";
import type { BoardState, Player } from "@/lib/game/types";

interface RandomTurnRenderContext {
  board: BoardState;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  winner: Player | "DRAW" | null;
  currentPlayer: Player;
  lastCoinFlip?: Player;
  flipId?: number;
}

export function Renderer(ctx: RandomTurnRenderContext): React.ReactElement {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayFlip, setDisplayFlip] = useState<Player | null>(ctx.lastCoinFlip || null);

  useEffect(() => {
    if (ctx.flipId) {
      // Small delay to ensure the UI has registered the state change before starting animation
      const startFlip = setTimeout(() => {
        setIsFlipping(true);
      }, 0);

      const endFlip = setTimeout(() => {
        setIsFlipping(false);
        setDisplayFlip(ctx.lastCoinFlip!);
      }, 600); // Animation duration

      return () => {
        clearTimeout(startFlip);
        clearTimeout(endFlip);
      };
    }
  }, [ctx.flipId, ctx.lastCoinFlip]);

  return (
    <div className="flex flex-col items-center gap-8">
      <Board
        cells={ctx.board}
        onCellClick={(idx: number) => ctx.makeMove(0, idx)}
        winner={ctx.winner === "DRAW" ? null : ctx.winner}
        disabled={!!ctx.winner || isFlipping}
        size="lg"
      />

      <div className="flex flex-col items-center gap-3">
        <div className="relative w-20 h-20 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={ctx.flipId || "initial"}
              initial={isFlipping ? { rotateY: 0 } : { scale: 0.8, opacity: 0 }}
              animate={isFlipping
                ? { rotateY: 1800, scale: [1, 1.2, 1] }
                : { scale: 1, opacity: 1 }
              }
              transition={isFlipping
                ? { duration: 0.6, ease: "easeInOut" }
                : { duration: 0.2 }
              }
              className={`w-full h-full rounded-full border-4 flex items-center justify-center text-3xl font-black shadow-xl
                ${displayFlip === "X" ? "border-blue-500 text-blue-500 bg-blue-500/10" : "border-red-500 text-red-500 bg-red-500/10"}
              `}
            >
              {displayFlip}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground/60">
          {ctx.winner ? (ctx.winner === "DRAW" ? "Draw!" : `Player ${ctx.winner} Wins!`) : (isFlipping ? "Flipping..." : "Next Player")}
        </span>
      </div>
    </div>
  );
}

export { Renderer as RandomTurnRenderer };

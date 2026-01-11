import React, { useState } from "react";
import { Board } from "@/components/game/Board";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GameState } from "@/lib/game/types";

interface SOSRenderContext extends GameState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeMove: (boardIndex: number, cellIndex: number, extraData?: any) => void;
  scores: { X: number; O: number };
}

export function Renderer(ctx: SOSRenderContext): React.ReactElement {
  const [selectedSymbol, setSelectedSymbol] = useState<"S" | "O">("S");
  const scores = ctx.scores || { X: 0, O: 0 };

  const handleCellClick = (idx: number) => {
    ctx.makeMove(0, idx, { symbol: selectedSymbol });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <Board
        cells={ctx.board}
        onCellClick={handleCellClick}
        winner={ctx.winner === "DRAW" ? null : ctx.winner}
        disabled={!!ctx.winner}
        size="lg"
      />

      <div className="flex flex-col items-center gap-8 w-full max-w-[400px]">
        {/* Symbol Selection */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedSymbol("S")}
              className={cn(
                "w-12 h-12 text-lg font-bold rounded-lg transition-all border-0",
                selectedSymbol === "S"
                  ? "bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-neutral-800 hover:bg-neutral-700 text-neutral-500",
              )}
            >
              S
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedSymbol("O")}
              className={cn(
                "w-12 h-12 text-lg font-bold rounded-lg transition-all border-0",
                selectedSymbol === "O"
                  ? "bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                  : "bg-neutral-800 hover:bg-neutral-700 text-neutral-500",
              )}
            >
              O
            </Button>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden">
          {/* Active Turn Indicator Container (matches content area width) */}
          <div className="absolute inset-x-4 top-0 h-1">
            <div
              className={cn(
                "absolute h-full transition-all duration-500 ease-in-out rounded-full w-12",
                ctx.currentPlayer === "X"
                  ? "left-[16.66%] -translate-x-1/2 bg-blue-500"
                  : "left-[83.33%] -translate-x-1/2 bg-red-500",
              )}
            />
          </div>

          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-center gap-1">
              <span className={`text-[10px] font-black transition-colors duration-300
                ${ctx.currentPlayer === "X" ? "text-blue-500" : "text-muted-foreground/40"}
              `}>
                Player X
              </span>
              <span className={`text-3xl font-black tabular-nums transition-all duration-300
                ${ctx.currentPlayer === "X" ? "scale-110 text-white" : "text-white/40"}
              `}>
                {scores.X}
              </span>
            </div>

            <div className="flex items-center justify-center">
              <div className="h-8 w-[1px] bg-neutral-800 rotate-12" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className={`text-[10px] font-black transition-colors duration-300
                ${ctx.currentPlayer === "O" ? "text-red-500" : "text-muted-foreground/40"}
              `}>
                Player O
              </span>
              <span className={`text-3xl font-black tabular-nums transition-all duration-300
                ${ctx.currentPlayer === "O" ? "scale-110 text-white" : "text-white/40"}
              `}>
                {scores.O}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Renderer as SOSRenderer };

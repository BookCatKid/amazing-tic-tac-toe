import { Board } from "@/components/game/Board";
import type { BoardState, Player } from "@/lib/game/types";

interface ClassicRenderContext {
  board: BoardState;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  winner: Player | "DRAW" | null;
}

export function Renderer(ctx: ClassicRenderContext): React.ReactElement {
  return (
    <Board
      cells={ctx.board}
      onCellClick={(idx: number) => ctx.makeMove(0, idx)}
      winner={ctx.winner === "DRAW" ? null : ctx.winner}
      disabled={!!ctx.winner}
      size="lg"
    />
  );
}

export { Renderer as ClassicRenderer };

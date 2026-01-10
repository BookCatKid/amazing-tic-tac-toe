import { Board } from '@/components/game/Board';
import { UltimateBoard } from '@/components/game/UltimateBoard';
import type { GameMode } from './types';

type RenderCtx = {
  board: any;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  winner: any;
};

export function renderMode(mode: GameMode, ctx: RenderCtx) {
  switch (mode) {
    case 'classic':
      return (
        <Board
          cells={ctx.board}
          onCellClick={(idx: number) => ctx.makeMove(0, idx)}
          winner={ctx.winner === 'DRAW' ? null : ctx.winner}
          disabled={!!ctx.winner}
          size="lg"
        />
      );
    case 'ultimate':
      return <UltimateBoard />;
    default:
      return null;
  }
}

export default renderMode;

import type { BoardState, Player, GameState } from "../../lib/game/types";
import { checkWinner, isBoardFull } from "../../lib/game/engine";
import type { MoveContext, MoveResult, GameModeHandlers } from "../../lib/game/handlerTypes";

export class Handlers implements GameModeHandlers {
  validateMove(board: BoardState, cellIndex: number): boolean {
    return board[cellIndex] === null;
  }

  makeMove(context: MoveContext): MoveResult | null {
    const { state, cellIndex } = context;
    const { board, currentPlayer } = state;

    if (!this.validateMove(board, cellIndex)) {
      return null;
    }

    const newBoard = [...board];
    newBoard[cellIndex] = currentPlayer;

    const lineWinner = checkWinner(newBoard);
    let winner: Player | "DRAW" | null = null;

    if (lineWinner) {
      winner = lineWinner;
    } else if (isBoardFull(newBoard)) {
      winner = "DRAW";
    }

    // Determine next player randomly if game is not over
    const nextPlayer: Player = Math.random() < 0.5 ? "X" : "O";

    return {
      newState: {
        board: newBoard,
        winner,
        currentPlayer: winner ? currentPlayer : nextPlayer,
        // Only update coin flip state if the game continues
        ...(winner ? {} : {
          lastCoinFlip: nextPlayer,
          flipId: Math.random(),
        })
      }
    };
  }

  getInitialState(): Partial<GameState> {
    const initialPlayer: Player = Math.random() < 0.5 ? "X" : "O";
    return {
      board: Array(9).fill(null),
      currentPlayer: initialPlayer,
      winner: null,
      history: [],
      lastCoinFlip: initialPlayer,
      flipId: Math.random(),
    };
  }
}

export { Handlers as RandomTurnHandlers };

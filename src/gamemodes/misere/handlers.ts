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
      // In Misère, the player who gets three in a row loses (opponent wins)
      winner = currentPlayer === "X" ? "O" : "X";
    } else if (isBoardFull(newBoard)) {
      winner = "DRAW";
    }

    return {
      newState: {
        board: newBoard,
        winner,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
      }
    };
  }

  getInitialState(): Partial<GameState> {
    return {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      history: [],
    };
  }
}

export { Handlers as MisereHandlers };

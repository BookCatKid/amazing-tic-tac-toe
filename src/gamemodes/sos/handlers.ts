import type { BoardState, Player, GameState } from "../../lib/game/types";
import { isBoardFull } from "../../lib/game/engine";
import type { MoveContext, MoveResult, GameModeHandlers } from "../../lib/game/handlerTypes";

export class Handlers implements GameModeHandlers {
  validateMove(board: BoardState, cellIndex: number): boolean {
    return board[cellIndex] === null;
  }

  private countSOS(board: BoardState): number {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    let count = 0;
    for (const [a, b, c] of lines) {
      if (board[a] === "S" && board[b] === "O" && board[c] === "S") {
        count++;
      }
    }
    return count;
  }

  makeMove(context: MoveContext): MoveResult | null {
    const { state, cellIndex, extraData } = context;
    const { board, currentPlayer, scores = { X: 0, O: 0 } } = state;
    const chosenSymbol = extraData?.symbol || "S";

    if (!this.validateMove(board, cellIndex)) {
      return null;
    }

    const oldSOSCount = this.countSOS(board);
    const newBoard = [...board];
    newBoard[cellIndex] = chosenSymbol;
    const newSOSCount = this.countSOS(newBoard);

    const sosCreated = newSOSCount - oldSOSCount;
    const newScores = { ...scores };
    if (sosCreated > 0) {
      newScores[currentPlayer] += sosCreated;
    }

    let winner: Player | "DRAW" | null = null;
    const boardFull = isBoardFull(newBoard);

    if (boardFull) {
      if (newScores.X > newScores.O) {
        winner = "X";
      } else if (newScores.O > newScores.X) {
        winner = "O";
      } else {
        winner = "DRAW";
      }
    }

    // If SOS was created, the current player gets another turn
    const nextPlayer = (sosCreated > 0 && !boardFull)
      ? currentPlayer
      : (currentPlayer === "X" ? "O" : "X");

    return {
      newState: {
        board: newBoard,
        winner,
        currentPlayer: nextPlayer,
        scores: newScores,
      }
    };
  }

  getInitialState(): Partial<GameState> {
    return {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      history: [],
      scores: { X: 0, O: 0 },
    };
  }
}

export { Handlers as SOSHandlers };

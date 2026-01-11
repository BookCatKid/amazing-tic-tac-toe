import type {
  Player,
  UltimateBoardState,
  GameState
} from "../../lib/game/types";
import { checkWinner, isBoardFull } from "../../lib/game/engine";
import type { MoveContext, MoveResult, GameModeHandlers } from "../../lib/game/handlerTypes";

export class Handlers implements GameModeHandlers {
  validateMove(
    ultimateBoard: UltimateBoardState,
    boardIndex: number,
    cellIndex: number,
    nextBoardIndex: number | null
  ): boolean {
    // Check if move is valid in terms of nextBoardIndex
    if (nextBoardIndex !== null && nextBoardIndex !== boardIndex) {
      return false;
    }

    const currentSubBoard = ultimateBoard.boards[boardIndex];

    // Check if cell is empty
    if (currentSubBoard[cellIndex] !== null) {
      return false;
    }

    // Check if sub-board is already won or full
    if (
      ultimateBoard.macroBoard[boardIndex] !== null ||
      isBoardFull(currentSubBoard)
    ) {
      return false;
    }

    return true;
  }

  makeMove(context: MoveContext): MoveResult | null {
    const { state, boardIndex, cellIndex } = context;
    const { ultimateBoard, currentPlayer, nextBoardIndex } = state;

    if (!ultimateBoard) return null;

    if (!this.validateMove(ultimateBoard, boardIndex, cellIndex, nextBoardIndex)) {
      return null;
    }

    const currentSubBoard = ultimateBoard.boards[boardIndex];
    const newSubBoard = [...currentSubBoard];
    newSubBoard[cellIndex] = currentPlayer;

    const newUltimateBoards = [...ultimateBoard.boards];
    newUltimateBoards[boardIndex] = newSubBoard;

    const subWinner = checkWinner(newSubBoard);
    const newMacroBoard = [...ultimateBoard.macroBoard];
    let gameWinner: Player | "DRAW" | null = null;

    if (subWinner) {
      newMacroBoard[boardIndex] = subWinner;
      // Check for game win
      const mainWinner = checkWinner(newMacroBoard);
      if (mainWinner) {
        gameWinner = mainWinner;
      } else if (isBoardFull(newMacroBoard)) {
        gameWinner = "DRAW";
      }
    }

    // Determine next board
    // The next move must be in the board corresponding to cellIndex
    let nextIdx: number | null = cellIndex;

    // If target board is full or won, valid to play anywhere
    if (
      newMacroBoard[nextIdx] !== null ||
      isBoardFull(newUltimateBoards[nextIdx])
    ) {
      nextIdx = null;
    }

    return {
      newState: {
        ultimateBoard: {
          boards: newUltimateBoards,
          macroBoard: newMacroBoard,
        },
        winner: gameWinner,
        nextBoardIndex: nextIdx,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
      }
    };
  }

  getInitialState(): Partial<GameState> {
    return {
      ultimateBoard: {
        boards: Array(9).fill(null).map(() => Array(9).fill(null)),
        macroBoard: Array(9).fill(null),
      },
      currentPlayer: "X",
      winner: null,
      history: [],
      nextBoardIndex: null,
    };
  }
}

export { Handlers as UltimateHandlers };

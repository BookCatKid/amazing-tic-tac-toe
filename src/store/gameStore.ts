import { create } from "zustand";
import type { GameMode, GameState, Player } from "../lib/game/types";
import { checkWinner, getEmptyBoard, isBoardFull } from "../lib/game/engine";

interface GameActions {
  setMode: (mode: GameMode) => void;
  resetGame: () => void;
  makeMove: (boardIndex: number, cellIndex: number) => void;
}

interface GameStore extends GameState, GameActions {}

const INITIAL_STATE: Omit<GameState, "mode"> = {
  board: getEmptyBoard(),
  ultimateBoard: {
    boards: Array(9)
      .fill(null)
      .map(() => getEmptyBoard()),
    macroBoard: getEmptyBoard(),
  },
  currentPlayer: "X",
  winner: null,
  history: [],
  nextBoardIndex: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  mode: "classic",
  ...INITIAL_STATE,

  setMode: (mode) => set({ mode, ...INITIAL_STATE }),

  resetGame: () => set((state) => ({ ...INITIAL_STATE, mode: state.mode })),

  makeMove: (boardIndex: number, cellIndex: number) => {
    const state = get();
    if (state.winner) return;

    // Classic Mode
    if (state.mode === "classic") {
      // In classic mode, we only use 'boardIndex' as cellIndex if we treat the single board as boardIndex 0?
      // Or simpler: Classic uses `board` state. let's assume UI passes -1 or 0 for main board.
      // Let's standardise: for classic, boardIndex is ignored (or 0), cellIndex is 0-8.

      if (state.board[cellIndex] !== null) return;

      const newBoard = [...state.board];
      newBoard[cellIndex] = state.currentPlayer;

      const winner =
        checkWinner(newBoard) || (isBoardFull(newBoard) ? "DRAW" : null);

      set({
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
      });
      return;
    }

    // Ultimate Mode
    // Check if move is valid in terms of nextBoardIndex
    if (state.nextBoardIndex !== null && state.nextBoardIndex !== boardIndex) {
      return; // Invalid board target
    }

    const currentSubBoard = state.ultimateBoard.boards[boardIndex];
    // Check if cell is empty
    if (currentSubBoard[cellIndex] !== null) return;
    // Check if sub-board is already won (if we allow playing in won boards? usually no, but sometimes yes.
    // Standard rule: if sent to a full/won board, can play anywhere.
    // If sent to a board that is NOT full/won, MUST play there.
    // However, if the target board is already full/won, current logic sets nextBoardIndex to null.
    // So if we are here, nextBoardIndex corresponds to a playable board, OR is null.

    // But we must also check if the specific sub-board at boardIndex is actually playable?
    // If nextBoardIndex is null, player can choose ANY board that is not full/won.
    if (
      state.ultimateBoard.macroBoard[boardIndex] !== null ||
      isBoardFull(currentSubBoard)
    ) {
      // Can't play in a won/full board
      return;
    }

    const newSubBoard = [...currentSubBoard];
    newSubBoard[cellIndex] = state.currentPlayer;

    const newUltimateBoards = [...state.ultimateBoard.boards];
    newUltimateBoards[boardIndex] = newSubBoard;

    const subWinner = checkWinner(newSubBoard);
    const newMacroBoard = [...state.ultimateBoard.macroBoard];
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
    } else if (isBoardFull(newSubBoard)) {
      // Tie in sub-board? usually treat as null or special.
      // Simple variant: just can't play there anymore.
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

    set({
      ultimateBoard: {
        boards: newUltimateBoards,
        macroBoard: newMacroBoard,
      },
      currentPlayer: state.currentPlayer === "X" ? "O" : "X",
      nextBoardIndex: nextIdx,
      winner: gameWinner,
    });
  },
}));

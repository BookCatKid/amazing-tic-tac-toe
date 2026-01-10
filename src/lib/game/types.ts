export type Player = 'X' | 'O';

export type CellValue = Player | null;

// Represents a standard 3x3 board state
// 0 1 2
// 3 4 5
// 6 7 8
export type BoardState = CellValue[];

export type UltimateBoardState = {
  boards: BoardState[]; // 9 boards
  macroBoard: BoardState; // The state of the 9 sub-boards (who won them)
};

export interface HistoryItem {
  board: BoardState;
  ultimateBoard: UltimateBoardState;
  currentPlayer: Player;
  winner: Player | 'DRAW' | null;
  nextBoardIndex: number | null;
}

export type GameMode = 'classic' | 'ultimate';

export interface GameState {
  mode: GameMode;
  // For classic
  board: BoardState;
  // For ultimate
  ultimateBoard: UltimateBoardState;

  currentPlayer: Player;
  winner: Player | 'DRAW' | null;
  history: HistoryItem[];

  // Ultimate specific restrictions
  nextBoardIndex: number | null; // null means can play anywhere (e.g. at start or if sent to full board)
}

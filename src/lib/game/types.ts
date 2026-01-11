export type Player = "X" | "O";

// Symbols available in different game modes
export type ClassicSymbol = "X" | "O";
export type SOSSymbol = "S" | "O";

// All possible symbols that can be placed on a board
export type GameSymbol = ClassicSymbol | SOSSymbol;

// A cell can contain a symbol or be empty
export type CellValue = GameSymbol | null;

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
  currentPlayer: Player;
  winner: Player | "DRAW" | null;
  // Dynamic state properties for history tracking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// GameMode is now a string ID. Valid IDs are provided by the modes registry
export type GameMode = string;

export interface GameState {
  mode: GameMode;
  currentPlayer: Player;
  winner: Player | "DRAW" | null;
  history: HistoryItem[];

  // Dynamic state properties for different game modes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

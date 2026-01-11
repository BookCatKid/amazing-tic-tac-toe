import type { GameState } from "./types";

export interface MoveContext {
  state: GameState;
  boardIndex: number;
  cellIndex: number;
}

export interface MoveResult {
  newState: Partial<GameState>;
}

export interface GameModeHandlers {
  makeMove: (context: MoveContext) => MoveResult | null;
  getInitialState: () => Partial<GameState>;
}

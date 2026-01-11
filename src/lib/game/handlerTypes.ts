import type { GameState } from "./types";

export interface MoveContext {
  state: GameState;
  boardIndex: number;
  cellIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraData?: any;
}

export interface MoveResult {
  newState: Partial<GameState>;
}

export interface GameModeHandlers {
  makeMove: (context: MoveContext) => MoveResult | null;
  getInitialState: () => Partial<GameState>;
}

import { create } from "zustand";
import type { GameMode, GameState } from "../lib/game/types";
import { getGameModeById } from "../gamemodes";
import type { GameModeHandlers } from "../lib/game/handlerTypes";

interface GameActions {
  setMode: (mode: GameMode) => Promise<void>;
  resetGame: () => Promise<void>;
  makeMove: (boardIndex: number, cellIndex: number) => Promise<void>;
}

interface GameStore extends GameState, GameActions {}

export const useGameStore = create<GameStore>((set, get) => ({
  mode: "classic",
  currentPlayer: "X",
  winner: null,
  history: [],

  setMode: async (mode) => {
    const gameMode = getGameModeById(mode);
    if (!gameMode) return;

    try {
      const handlersModule = (await gameMode.loadHandlers()) as { Handlers: new () => GameModeHandlers };
      const handlers = new handlersModule.Handlers();
      const initialState = handlers.getInitialState();
      set({
        mode,
        currentPlayer: "X",
        winner: null,
        history: [],
        ...initialState
      });
    } catch (error) {
      console.error(`Failed to load initial state for mode ${mode}:`, error);
      set({
        mode,
        currentPlayer: "X",
        winner: null,
        history: [],
      });
    }
  },

  resetGame: async () => {
    const { mode } = get();
    const gameMode = getGameModeById(mode);
    if (!gameMode) return;

    try {
      const handlersModule = (await gameMode.loadHandlers()) as { Handlers: new () => GameModeHandlers };
      const handlers = new handlersModule.Handlers();
      const initialState = handlers.getInitialState();
      set({
        currentPlayer: "X",
        winner: null,
        history: [],
        ...initialState
      });
    } catch (error) {
      console.error(`Failed to reset game for mode ${mode}:`, error);
      set({
        currentPlayer: "X",
        winner: null,
        history: [],
      });
    }
  },

  makeMove: async (boardIndex: number, cellIndex: number) => {
    const state = get();
    if (state.winner) return;

    const gameMode = getGameModeById(state.mode);
    if (!gameMode) return;

    try {
      const handlersModule = (await gameMode.loadHandlers()) as { Handlers: new () => GameModeHandlers };
      const HandlersClass = handlersModule.Handlers;

      if (!HandlersClass) {
        console.error(`No Handlers export found for mode ${state.mode}`);
        return;
      }

      const handlers = new HandlersClass();
      const result = handlers.makeMove({
        state,
        boardIndex,
        cellIndex,
      });

      if (result && result.newState) {
        set(result.newState);
      }
    } catch (error) {
      console.error(`Failed to handle move for mode ${state.mode}:`, error);
    }
  },
}));

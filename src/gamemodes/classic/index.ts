import type { GameMode } from "../../lib/game/types";
import type { GameModeInfo as BaseGameModeInfo } from "../../lib/game/modes";

export interface GameModeInfo extends BaseGameModeInfo {
  id: GameMode;
  name: string;
  description?: string;
  route: string;
}

export const classicMode: GameModeInfo = {
  id: "classic",
  name: "Classic",
  description: "Standard 3×3 grid",
  route: "/game/classic",
};

export const metadata = {
  name: "Classic Tic-Tac-Toe",
  description: "The traditional 3x3 grid game where players take turns marking X and O",
  version: "1.0.0",
  author: "Game Team",
};

export const files = {
  index: "index.ts",
  renderers: "renderers.tsx",
  handlers: "handlers.ts",
};

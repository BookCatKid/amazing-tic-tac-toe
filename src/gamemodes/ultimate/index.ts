import type { GameMode } from "../../lib/game/types";
import type { GameModeInfo as BaseGameModeInfo } from "../../lib/game/modes";

export interface GameModeInfo extends BaseGameModeInfo {
  id: GameMode;
  name: string;
  description?: string;
  route: string;
}

export const ultimateMode: GameModeInfo = {
  id: "ultimate",
  name: "Ultimate",
  description: "9 boards, strategic play",
  route: "/game/ultimate",
};

export const metadata = {
  name: "Ultimate Tic-Tac-Toe",
  description: "A strategic version with 9 interconnected boards",
  version: "1.0.0",
  author: "Game Team",
};

export const files = {
  index: "index.ts",
  renderers: "renderers.tsx",
  handlers: "handlers.ts",
};

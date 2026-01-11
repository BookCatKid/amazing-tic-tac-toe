import type { GameMode } from "../../lib/game/types";
import type { GameModeInfo as BaseGameModeInfo } from "../../lib/game/modes";

export interface GameModeInfo extends BaseGameModeInfo {
  id: GameMode;
  name: string;
  description?: string;
  route: string;
}

export const misereMode: GameModeInfo = {
  id: "misere",
  name: "Misère",
  description: "Winner loses 😱",
  route: "/game/misere",
};

export const metadata = {
  name: "Misère Tic-Tac-Toe",
  description: "A reverse version where the player who gets three in a row loses",
  version: "1.0.0",
  author: "Game Team",
};

export const files = {
  index: "index.ts",
  renderers: "renderers.tsx",
  handlers: "handlers.ts",
};

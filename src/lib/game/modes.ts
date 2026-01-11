import { getAllGameModes, getGameModeById, isValidGameMode } from "../../gamemodes";
import type { GameMode } from "./types";

export interface GameModeInfo {
  id: GameMode;
  name: string;
  description?: string;
  route: string;
}

export const modes: GameModeInfo[] = getAllGameModes();

export const modeIds = modes.map((m) => m.id);

export function isValidMode(id?: string | null): id is GameMode {
  if (!id) return false;
  return isValidGameMode(id);
}

export function getModeById(id?: string | null) {
  const mode = getGameModeById(id as GameMode);
  return mode ?? null;
}

export default modes;

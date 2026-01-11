import type { GameMode } from "../lib/game/types";

export interface GameModeRegistry {
  id: GameMode;
  name: string;
  description?: string;
  route: string;
  loadRenderer: () => Promise<Record<string, unknown>>;
  loadHandlers: () => Promise<Record<string, unknown>>;
}

// Automatically discover game modes using Vite's import.meta.glob
// Since this file is in src/gamemodes/index.ts, we look for sibling directories
const modeConfigs = import.meta.glob("./*/index.ts", { eager: true });
const rendererLoaders = import.meta.glob("./*/renderers.tsx");
const handlerLoaders = import.meta.glob("./*/handlers.ts");

const gameModeRegistry: GameModeRegistry[] = Object.entries(modeConfigs).map(([path, module]) => {
  const mod = module as Record<string, unknown>;
  // Extract directory name (e.g., "./classic/index.ts" -> "classic")
  const match = path.match(/\.\/([^/]+)\/index\.ts$/);
  const modeId = match ? match[1] : "";

  // Find corresponding loaders
  const rendererPath = Object.keys(rendererLoaders).find(p => p.includes(`/${modeId}/`));
  const handlerPath = Object.keys(handlerLoaders).find(p => p.includes(`/${modeId}/`));

  // The mode info is exported as either `[modeId]Mode` or `metadata`
  const modeInfo = (mod[`${modeId}Mode`] || mod.metadata || {}) as Record<string, unknown>;

  return {
    id: modeId as GameMode,
    name: (modeInfo.name as string) || modeId,
    description: modeInfo.description as string | undefined,
    route: (modeInfo.route as string) || `/game/${modeId}`,
    loadRenderer: (rendererPath ? rendererLoaders[rendererPath] : () => Promise.resolve({})) as () => Promise<Record<string, unknown>>,
    loadHandlers: (handlerPath ? handlerLoaders[handlerPath] : () => Promise.resolve({})) as () => Promise<Record<string, unknown>>,
  };
});

export function getAllGameModes(): GameModeRegistry[] {
  return gameModeRegistry;
}

export function getGameModeById(id: GameMode): GameModeRegistry | undefined {
  return gameModeRegistry.find(mode => mode.id === id);
}

export function isValidGameMode(id: string): id is GameMode {
  return gameModeRegistry.some(mode => mode.id === id);
}

export default gameModeRegistry;

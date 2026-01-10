import type { GameMode } from './types';

export interface GameModeInfo {
  id: GameMode;
  name: string;
  description?: string;
  route?: string; // optional override
}

export const modes: GameModeInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Standard 3×3 grid',
    route: '/game/classic',
  },
//   {
//     id: 'ultimate',
//     name: 'Ultimate',
//     description: '9 boards, strategic play',
//     route: '/game/ultimate',
//   },
];

export const modeIds = modes.map((m) => m.id);

export function isValidMode(id?: string | null): id is GameMode {
  if (!id) return false;
  return modeIds.includes(id);
}

export function getModeById(id?: string | null) {
  return modes.find((m) => m.id === id) ?? null;
}

export default modes;

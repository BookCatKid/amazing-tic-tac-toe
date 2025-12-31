import { RotateCcw, ZoomIn, ZoomOut, Home as HomeIcon } from 'lucide-react';
import { useControls } from 'react-zoom-pan-pinch';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import type { GameMode } from '@/lib/game/types';

export function GameControls() {
  const { mode, resetGame, currentPlayer } = useGameStore();
  const { zoomIn, zoomOut } = useControls();
  const navigate = useNavigate();

  const handleModeChange = (newMode: GameMode) => {
    navigate(`/game/${newMode}`);
  };

  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-50">
      {/* Left controls */}
      <div className="flex gap-2 pointer-events-auto">
        <Link to="/">
          <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded" title="Back to Menu">
            <HomeIcon className="h-5 w-5" />
          </button>
        </Link>

        <select
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as GameMode)}
          className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
        >
          <option value="classic">Classic</option>
          <option value="ultimate">Ultimate</option>
        </select>

        <button
          className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded"
          onClick={resetGame}
          title="Reset Game"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Current player */}
      <div className="pointer-events-auto px-4 py-2 bg-neutral-800 rounded text-sm">
        Turn: <span className={currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}>{currentPlayer}</span>
      </div>

      {/* Zoom controls */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded" onClick={() => zoomIn()}>
          <ZoomIn className="h-5 w-5" />
        </button>
        <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded" onClick={() => zoomOut()}>
          <ZoomOut className="h-5 w-5" />
        </button>
      </div>


    </div>
  );
}

import { RotateCcw, ZoomIn, ZoomOut, Home as HomeIcon } from 'lucide-react';
import { useControls } from 'react-zoom-pan-pinch';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import type { GameMode } from '@/lib/game/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
          <Button
            variant="secondary"
            className="bg-neutral-800 hover:bg-neutral-700 h-10 px-4 border-0"
            title="Back to Menu"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Home
          </Button>
        </Link>

        <Select value={mode} onValueChange={(value) => handleModeChange(value as GameMode)}>
          <SelectTrigger className="w-[140px] px-3 h-10 bg-neutral-800 hover:bg-neutral-700 border-0">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="ultimate">Ultimate</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 h-10 px-4 border-0"
          onClick={resetGame}
          title="Reset Game"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset
        </Button>
      </div>

      {/* Current player */}
      <div className="pointer-events-auto px-4 py-2 bg-neutral-800 rounded text-sm">
        Turn: <span className={currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}>{currentPlayer}</span>
      </div>

      {/* Zoom controls */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 h-11 w-11 p-0 border-0"
          onClick={() => zoomIn()}
          title="Zoom In"
        >
          <ZoomIn className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 h-11 w-11 p-0 border-0"
          onClick={() => zoomOut()}
          title="Zoom Out"
        >
          <ZoomOut className="h-6 w-6" />
        </Button>
      </div>


    </div>
  );
}

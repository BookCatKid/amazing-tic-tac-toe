import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameCanvas } from '@/components/game/GameCanvas';
import { Board } from '@/components/game/Board';
import { UltimateBoard } from '@/components/game/UltimateBoard';
import { useGameStore } from '@/store/gameStore';
import type { GameMode } from '@/lib/game/types';

export function GamePage() {
  const { mode: urlMode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { mode, setMode, board, makeMove, winner } = useGameStore();

  useEffect(() => {
    if (urlMode === 'classic' || urlMode === 'ultimate') {
      if (mode !== urlMode) {
        setMode(urlMode as GameMode);
      }
    } else {
      navigate('/');
    }
  }, [urlMode, mode, setMode, navigate]);

  return (
    <div className="dark h-screen w-screen">
      <GameCanvas>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] // Custom spring-like ease
          }}
        >
          {mode === 'classic' ? (
            <Board
              cells={board}
              onCellClick={(idx) => makeMove(0, idx)}
              winner={winner === 'DRAW' ? null : winner as any}
              disabled={!!winner}
              size="lg"
            />
          ) : (
            <UltimateBoard />
          )}
        </motion.div>
      </GameCanvas>
    </div>
  );
}

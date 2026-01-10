import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PlayerSymbol } from './PlayerSymbol';
import type { Player } from '@/lib/game/types';
import { GameControls } from './GameControls';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GameCanvasProps {
  children: React.ReactNode;
}

export function GameCanvas({ children }: GameCanvasProps) {
  const { winner, resetGame } = useGameStore();
  const [showOverlay, setShowOverlay] = useState(false);

  // Sync overlay state with winner: Reset immediately when game resets
  if (!winner && showOverlay) {
    setShowOverlay(false);
  }

  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <div className="w-full h-screen bg-neutral-900 overflow-hidden relative text-white">
      <TransformWrapper
        initialScale={1}
        minScale={0.3}
        maxScale={4}
        centerOnInit
        limitToBounds={false}
      >
        <>
          <GameControls />
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            {children}
          </TransformComponent>
        </>
      </TransformWrapper>

      {/* Global Victory Screen Overlay */}
      <AnimatePresence>
        {winner && showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm z-50 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <h2 className="text-4xl font-black tracking-[0.2em] text-white drop-shadow-lg">
                {winner === 'DRAW' ? 'DRAW' : 'VICTORY'}
              </h2>

              {winner !== 'DRAW' && (
                <div className="relative">
                  <div className={cn(
                    "absolute inset-0 blur-3xl opacity-50",
                    winner === 'X' ? "bg-blue-500" : "bg-red-500"
                  )} />
                  <PlayerSymbol
                    player={winner as Player}
                    className={cn(
                      "w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-2xl",
                      winner === 'X' ? "text-blue-500" : "text-red-500"
                    )}
                  />
                </div>
              )}

              <div className="flex gap-4 mt-4 relative z-20">
                <Button
                  size="lg"
                  onClick={resetGame}
                  className={cn(
                    "rounded-full font-bold shadow-lg",
                    winner === 'X' || winner === 'DRAW' ? "bg-blue-600 hover:bg-blue-500" : "bg-red-600 hover:bg-red-500 text-white"
                  )}
                >
                  New Game
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowOverlay(false)}
                  className="rounded-full font-bold text-white/80 border-2 border-white/20 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Review Board
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

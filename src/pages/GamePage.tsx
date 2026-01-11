import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GameCanvas } from "@/components/game/GameCanvas";
import GameModeRenderer from "@/lib/game/modeRenderers";
import { useGameStore } from "@/store/gameStore";
import type { GameMode } from "@/lib/game/types";
import { isValidMode } from "@/lib/game/modes";

export function GamePage() {
  const { mode: urlMode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { mode, setMode, board, makeMove, winner } = useGameStore();

  useEffect(() => {
    if (isValidMode(urlMode)) {
      if (mode !== urlMode) {
        setMode(urlMode as GameMode);
      }
    } else {
      navigate("/");
    }
  }, [urlMode, mode, setMode, navigate]);

  return (
    <div className="dark h-screen w-screen">
      <GameCanvas>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1], // Custom spring-like ease
          }}
        >
          <GameModeRenderer mode={mode} ctx={{ board, makeMove, winner }} />
        </motion.div>
      </GameCanvas>
    </div>
  );
}

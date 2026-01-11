/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { getGameModeById } from "../../gamemodes";
import type { GameMode } from "./types";

type RenderCtx = any;

export function GameModeRenderer({ mode, ctx }: { mode: GameMode; ctx: RenderCtx }) {
  const [Renderer, setRenderer] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const gameMode = getGameModeById(mode);
      if (!gameMode) return;

      try {
        const rendererModule = await gameMode.loadRenderer();
        const RendererComp = rendererModule.Renderer;
        if (RendererComp && isMounted) {
          setRenderer(() => RendererComp as any);
        }
      } catch (error) {
        console.error(`Failed to load renderer for mode ${mode}:`, error);
      }
    };

    load();
    return () => { isMounted = false; };
  }, [mode]);

  if (!Renderer) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>;
  }

  return <Renderer {...ctx} />;
}

export default GameModeRenderer;

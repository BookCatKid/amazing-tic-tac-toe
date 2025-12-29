import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { GameControls } from './GameControls';

interface GameCanvasProps {
  children: React.ReactNode;
}

export function GameCanvas({ children }: GameCanvasProps) {
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
    </div>
  );
}

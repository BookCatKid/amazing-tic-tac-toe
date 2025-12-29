import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-12"
      >
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight">
            TIC TAC TOE
          </h1>
          <p className="text-neutral-400">
            Choose your game mode
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/game/classic" className="block">
            <div className="p-6 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-left">
              <h2 className="text-xl font-bold mb-1">Classic</h2>
              <p className="text-sm text-neutral-400">Standard 3×3 grid</p>
            </div>
          </Link>

          <Link to="/game/ultimate" className="block">
            <div className="p-6 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-left">
              <h2 className="text-xl font-bold mb-1">Ultimate</h2>
              <p className="text-sm text-neutral-400">9 boards, strategic play</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

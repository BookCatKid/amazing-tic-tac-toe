import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';

export function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center p-8 pt-16 md:pt-24 text-white overflow-hidden">
      {/* Hero Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl mb-16 md:mb-24"
      >
        <Logo className="w-full" />
      </motion.div>

      {/* Game Mode Selection */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="max-w-md w-full text-center flex-1 flex flex-col"
      >
        <div className="space-y-6">
          <p className="text-neutral-400 text-xl font-medium">
            Choose your game mode
          </p>

          <div className="space-y-4">
            <Link to="/game/classic" className="group block">
              <div className="p-8 bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-blue-500/50 rounded-xl transition-all duration-300 text-left backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">Classic</h2>
                <p className="text-sm text-neutral-400">Standard 3×3 grid</p>
              </div>
            </Link>

            <Link to="/game/ultimate" className="group block">
              <div className="p-8 bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-orange-500/50 rounded-xl transition-all duration-300 text-left backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-1 group-hover:text-orange-400 transition-colors">Ultimate</h2>
                <p className="text-sm text-neutral-400">9 boards, strategic play</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { modes } from "@/lib/game/modes";

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
            {modes.map((m) => (
              <Link key={m.id} to={m.route} className="group block">
                <div className="p-8 bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 rounded-xl transition-all duration-300 text-left backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-1 transition-colors">
                    {m.name}
                  </h2>
                  <p className="text-sm text-neutral-400">{m.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

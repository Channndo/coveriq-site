import { motion } from "framer-motion";

interface TechBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

export function TechBackground({ className = "", showGrid = true }: TechBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {showGrid && <div className="tech-grid absolute inset-0" />}
      <motion.div
        className="glow-orb -left-32 top-20 h-96 w-96 bg-cyan-500/20 animate-pulse-glow"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb -right-24 top-1/3 h-80 w-80 bg-teal-500/15"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 bg-indigo-500/10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

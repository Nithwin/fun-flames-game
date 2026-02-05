import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  emoji: string;
  drift: number;
  duration: number;
}

interface ConfettiOverlayProps {
  active: boolean;
  type?: 'hearts' | 'stars' | 'mixed';
}

const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({ active, type = 'mixed' }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const emojis = type === 'hearts' ? ['❤️', '💖', '💘', '💝'] : 
                    type === 'stars' ? ['✨', '🌟', '⭐', '💫'] : 
                    ['❤️', '✨', '💖', '🌟', '🔥'];

      const newPieces = Array.from({ length: 50 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100, // percentage
        y: -10,
        size: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        drift: (Math.random() - 0.5) * 20,
        duration: Math.random() * 3 + 2,
      }));

      // Wrap in a small delay to avoid sync render warning in strict environments
      const spawnTimer = setTimeout(() => {
        setPieces(newPieces);
      }, 0);
      
      const cleanupTimer = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => {
        clearTimeout(spawnTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [active, type]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "-10vh", x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ 
              y: "110vh", 
              x: `${p.x + p.drift}vw`,
              rotate: p.rotation + 720,
              opacity: [1, 1, 1, 0]
            }}
            transition={{ 
              duration: p.duration,
              ease: "linear"
            }}
            className="absolute text-2xl"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiOverlay;

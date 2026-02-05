import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'sparkle' | 'heart';
  drift: number;
}

const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newParticle: Particle = {
        id: Math.random() + Date.now(),
        x,
        y,
        type: Math.random() > 0.8 ? 'heart' : 'sparkle',
        drift: (Math.random() - 0.5) * 50,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: p.y - 100,
              x: p.x + p.drift
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-xl pointer-events-none"
            style={{ left: p.x, top: p.y }}
          >
            {p.type === 'heart' ? (
              <span className="text-pink-500/60 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">❤️</span>
            ) : (
              <span className="text-yellow-400/60 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">✨</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;

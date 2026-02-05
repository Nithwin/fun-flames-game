import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flame, Moon, Stars, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CosmicElementData {
  Icon: LucideIcon;
  color: string;
  size: number;
  delay: number;
  x: number;
  y: number;
}

const FloatingCosmicElements: React.FC = () => {
  const [elements] = useState<CosmicElementData[]>(() => {
    const iconData = [
      { Icon: Heart, color: 'text-pink-500/20', size: 40, delay: 0 },
      { Icon: Sparkles, color: 'text-yellow-400/20', size: 30, delay: 2 },
      { Icon: Flame, color: 'text-orange-500/20', size: 35, delay: 4 },
      { Icon: Moon, color: 'text-purple-300/20', size: 25, delay: 1 },
      { Icon: Stars, color: 'text-blue-400/20', size: 45, delay: 3 },
      { Icon: Zap, color: 'text-yellow-500/20', size: 20, delay: 5 },
    ];

    return iconData.map((data) => ({
      ...data,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.color}`}
          initial={{ 
            left: `${el.x}%`, 
            top: `${el.y}%`,
            rotate: 0,
            scale: 1
          }}
          animate={{ 
            y: [-20, 20, -20],
            x: [-20, 20, -20],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20 + i * 2,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
        >
          <el.Icon size={el.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCosmicElements;

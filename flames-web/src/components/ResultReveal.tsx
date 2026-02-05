import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Zap } from 'lucide-react';

interface ResultRevealProps {
    result: string;
    isGolden?: boolean;
}

const ResultReveal: React.FC<ResultRevealProps> = ({ result, isGolden }) => {
    const isRomantic = result === 'Lovers' || result === 'Marriage';
    const isPositive = result === 'Friends' || result === 'Affectionate';
    const isIntense = result === 'Enemies';

    const renderEmojiBurst = () => {
        if (isRomantic) {
            return [...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{ 
                        x: (Math.random() - 0.5) * 400, 
                        y: (Math.random() - 0.5) * 400,
                        scale: Math.random() * 1.5 + 0.5,
                        opacity: 0,
                        rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute text-pink-500"
                >
                    <Heart size={24} fill="currentColor" />
                </motion.div>
            ));
        }
        if (isPositive) {
            return [...Array(25)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{ 
                        x: (Math.random() - 0.5) * 500, 
                        y: (Math.random() - 0.5) * 500,
                        scale: Math.random() * 1 + 0.5,
                        opacity: 0,
                        rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute text-yellow-400"
                >
                    <Sparkles size={20} />
                </motion.div>
            ));
        }
        if (isIntense) {
            return [...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                        scale: [1, 2, 0],
                        opacity: [1, 1, 0],
                        x: (Math.random() - 0.5) * 300,
                        y: (Math.random() - 0.5) * 300
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute text-blue-400"
                >
                    <Zap size={40} fill="currentColor" />
                </motion.div>
            ));
        }
        return null;
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
            {/* White Flash */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white"
            />
            
            <div className="relative">
                {/* Result Title Splash */}
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5 }}
                    className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${
                        isRomantic ? 'text-pink-500' : isPositive ? 'text-yellow-400' : 'text-slate-400'
                    }`}
                >
                    {result}
                </motion.h1>
                
                {renderEmojiBurst()}
                
                {isGolden && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [1, 2] }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="absolute inset-0 border-4 border-yellow-400 rounded-full blur-xl"
                    />
                )}
            </div>
        </div>
    );
};

export default ResultReveal;

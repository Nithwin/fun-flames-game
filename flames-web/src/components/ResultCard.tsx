import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, RotateCcw, Sparkles } from 'lucide-react';
import type { FlamesResult } from '../utils/flames';
import ShareModal from './ShareModal';
import TiltWrapper from './TiltWrapper';

interface ResultCardProps {
    result: FlamesResult;
    name1: string;
    name2: string;
    hideNames?: boolean;
    quote: string;
    shortId: string | null;
    onReset: () => void;
    isGolden?: boolean;
}

const getResultImage = (result: FlamesResult) => {
    switch (result) {
        case "Friends": return "/images/anime_friends.png";
        case "Lovers": return "/images/anime_lovers.png";
        case "Affectionate": return "/images/anime_affectionate.png";
        case "Marriage": return "/images/anime_marriage.png";
        case "Enemies": return "/images/anime_enemies.png";
        case "Siblings": return "/images/anime_siblings.png";
    }
};

const getResultColor = (result: FlamesResult) => {
    switch (result) {
        case "Friends": return "from-blue-400 to-cyan-400";
        case "Lovers": return "from-red-500 to-pink-500";
        case "Affectionate": return "from-yellow-400 to-orange-400";
        case "Marriage": return "from-purple-400 to-pink-400";
        case "Enemies": return "from-gray-400 to-slate-400";
        case "Siblings": return "from-orange-400 to-amber-400";
    }
};

const ResultCard: React.FC<ResultCardProps> = ({ result, name1, name2, hideNames, quote, shortId, onReset, isGolden }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    
    const displayName1 = hideNames ? "••••••" : name1;
    const displayName2 = hideNames ? "••••••" : name2;
    
    const handleShare = async () => {
        if (shortId) {
            setShowShareModal(true);
        }
    };
    
    return (
        <>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 w-full max-w-3xl mx-auto px-4"
        >
            <TiltWrapper>
                {/* Dark Glassmorphism Card - Full Width */}
                <div className={`relative bg-white/10 backdrop-blur-2xl rounded-3xl border ${isGolden ? 'border-yellow-400/50 shadow-[0_0_40px_rgba(234,179,8,0.3)]' : 'border-white/20'} shadow-2xl overflow-hidden transform-style-3d transition-all duration-700`}>
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${isGolden ? 'from-yellow-500/10 via-orange-500/10 to-yellow-500/10' : 'from-purple-500/10 via-pink-500/10 to-violet-500/10'} opacity-50`} />
                    
                    {isGolden && (
                        <motion.div 
                            className="absolute inset-0 border-2 border-yellow-400/30 rounded-3xl"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                    
                    {/* Content */}
                    <div className="relative p-5 sm:p-8 md:p-10">
                        {/* Top Section - Image & Result */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            {/* Anime Image */}
                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="flex-shrink-0"
                            >
                                <div className="relative w-32 h-32 xs:w-48 xs:h-48 md:w-56 md:h-56 transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${getResultColor(result)} rounded-2xl blur-2xl opacity-50`} />
                                    <img 
                                        src={getResultImage(result)} 
                                        alt={result}
                                        className="relative w-full h-full object-cover rounded-2xl border-2 border-white/20 shadow-2xl"
                                    />
                                </div>
                            </motion.div>

                            {/* Result Title & Quote */}
                            <div className="flex-1 text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                                        <h2 className={`text-3xl xs:text-5xl md:text-6xl font-black bg-gradient-to-r ${getResultColor(result)} bg-clip-text text-transparent transform translate-z-10`}>
                                            {result}
                                        </h2>
                                        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                                    </div>

                                    {isGolden && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30 mb-4"
                                        >
                                            <Sparkles className="w-3 h-3 text-yellow-400" />
                                            <span className="text-[10px] text-yellow-200 font-bold uppercase tracking-widest">Golden Aura Unlocked</span>
                                        </motion.div>
                                    )}

                                    <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Your Cosmic Connection</p>
                                    
                                    {/* Quote */}
                                    <div className="p-4 sm:p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transform transition-transform hover:scale-[1.02]">
                                        <p className="text-purple-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed italic">
                                            "{quote}"
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Names */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
                        >
                            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600/20 backdrop-blur-xl rounded-full border border-purple-500/30 transform hover:scale-110 transition-transform">
                                <span className="text-purple-200 text-sm sm:text-base md:text-lg font-medium">
                                    {displayName1}
                                </span>
                            </div>
                            <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0 animate-pulse" fill="currentColor" />
                            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-600/20 backdrop-blur-xl rounded-full border border-pink-500/30 transform hover:scale-110 transition-transform">
                                <span className="text-pink-200 text-sm sm:text-base md:text-lg font-medium">
                                    {displayName2}
                                </span>
                            </div>
                        </motion.div>

                        {/* Action Buttons - Full Width Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {/* Share Button */}
                            <motion.button
                                onClick={handleShare}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 transform hover:-translate-y-1"
                            >
                                <Share2 className="w-6 h-6" />
                                <span>Generate QR & Share</span>
                            </motion.button>

                            {/* Try Again Button */}
                            <motion.button
                                onClick={onReset}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                <RotateCcw className="w-6 h-6" />
                                <span>Try Another Pair</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </TiltWrapper>
        </motion.div>

        {showShareModal && shortId && (
            <ShareModal
                shortId={shortId}
                name1={displayName1}
                name2={displayName2}
                result={result}
                onClose={() => setShowShareModal(false)}
            />
        )}
    </>
    );
};

export default ResultCard;

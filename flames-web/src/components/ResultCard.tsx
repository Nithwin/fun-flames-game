import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Skull, Users, Gem, Smile, Baby, Share2, Loader } from 'lucide-react';
import type { FlamesResult } from '../utils/flames';
import TiltWrapper from './TiltWrapper';
import ShareModal from './ShareModal';

interface ResultCardProps {
    result: FlamesResult;
    name1: string;
    name2: string;
    hideNames?: boolean;
    quote: string;
    shortId: string | null;
    onReset: () => void;
}

const getIcon = (result: FlamesResult) => {
    switch (result) {
        case "Friends": return <Users className="w-16 h-16 text-blue-400" />;
        case "Lovers": return <Heart className="w-16 h-16 text-red-500" fill="currentColor" />;
        case "Affectionate": return <Smile className="w-16 h-16 text-yellow-400" />;
        case "Marriage": return <Gem className="w-16 h-16 text-purple-400" />;
        case "Enemies": return <Skull className="w-16 h-16 text-gray-400" />;
        case "Siblings": return <Baby className="w-16 h-16 text-orange-400" />;
    }
};

const ResultCard: React.FC<ResultCardProps> = ({ result, name1, name2, hideNames, quote, shortId, onReset }) => {
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
        <TiltWrapper>
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-sm px-4 sm:px-8 py-6 sm:py-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl text-center"
        >
            <motion.div 
                className="flex justify-center mb-4 sm:mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
                <div className="p-4 sm:p-6 bg-white/10 rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    {getIcon(result)}
                </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 mb-2">
                {result}
            </h2>
            
            <p className="text-purple-200 mb-6 sm:mb-8 font-light text-base sm:text-lg min-h-12 sm:min-h-14 flex items-center justify-center px-2">
                "{quote}"
            </p>

            <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8 uppercase tracking-widest px-2">
                <span className="truncate">{displayName1}</span>
                <span>•</span>
                <span className="truncate">{displayName2}</span>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-0">
                <motion.button
                    onClick={handleShare}
                    disabled={!shortId}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-full text-white text-sm sm:text-base font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <>
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-base">Generate QR & Share</span>
                    </>
                </motion.button>

                <motion.button
                    onClick={onReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm sm:text-base font-medium transition-colors"
                >
                    Try Another Pair
                </motion.button>
            </div>
        </motion.div>
        </TiltWrapper>

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

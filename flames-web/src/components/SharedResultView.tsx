import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { fetchSharedResult, type FlamesShare } from '../utils/firebase';
import { Heart, Sparkles, Home, Play } from 'lucide-react';
import TiltWrapper from './TiltWrapper';
import { useCosmicAudio } from '../hooks/useCosmicAudio';
import CursorTrail from './CursorTrail';
import ConfettiOverlay from './ConfettiOverlay';
import FloatingCosmicElements from './FloatingCosmicElements';

interface SharedResultViewProps {
  shortId: string | null;
  fallbackData?: {
    name1: string;
    name2: string;
    result: string;
    quote?: string;
  };
}

const getResultImage = (result: string) => {
    switch (result) {
        case "Friends": return "/images/anime_friends.png";
        case "Lovers": return "/images/anime_lovers.png";
        case "Affectionate": return "/images/anime_affectionate.png";
        case "Marriage": return "/images/anime_marriage.png";
        case "Enemies": return "/images/anime_enemies.png";
        case "Siblings": return "/images/anime_siblings.png";
        default: return "/images/anime_lovers.png";
    }
};

const getResultColor = (result: string) => {
    switch (result) {
        case "Friends": return "from-blue-400 to-cyan-400";
        case "Lovers": return "from-red-500 to-pink-500";
        case "Affectionate": return "from-yellow-400 to-orange-400";
        case "Marriage": return "from-purple-400 to-pink-400";
        case "Enemies": return "from-gray-400 to-slate-400";
        case "Siblings": return "from-orange-400 to-amber-400";
        default: return "from-purple-400 to-pink-400";
    }
};

const SharedResultView: React.FC<SharedResultViewProps> = ({ shortId, fallbackData }) => {
    const [data, setData] = useState<FlamesShare | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const { playResultMusic } = useCosmicAudio();

  useEffect(() => {
    const loadResult = async () => {
      if (fallbackData) {
        setData({
          id: 'fallback',
          short_id: 'none',
          name1: fallbackData.name1,
          name2: fallbackData.name2,
          result: fallbackData.result,
          quote: fallbackData.quote || "The stars have aligned for this connection.",
          created_at: Timestamp.now(),
          view_count: 0
        });
        setLoading(false);
        return;
      }

      if (!shortId) {
        setError('Invalid share link.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await fetchSharedResult(shortId);
      
      if (!result) {
        setError('Result not found. It may have expired or the link is invalid.');
        setLoading(false);
        return;
      }

      setData(result);
      setLoading(false);
    };

    loadResult();
  }, [shortId, fallbackData]);

  if (loading) {
    return (
      <div className="min-h-screen text-white overflow-hidden relative font-sans bg-slate-950">
        <ParticlesBackground 
          className="absolute inset-0 -z-10"
          quantity={120}
          color="#f472b6"
          vx={0.2}
          vy={0.2}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
            <div className="flex flex-col items-center">
                {/* Galaxy Orbiting Icons */}
                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-white/5 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-white/5 rounded-full"
                  />
                  
                  {/* Orbiting Emoji 1 */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full"
                  >
                    <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">❤️</motion.div>
                  </motion.div>

                  {/* Orbiting Emoji 2 */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[80%] h-[80%]"
                  >
                    <motion.div className="absolute bottom-0 right-0 text-xl">✨</motion.div>
                  </motion.div>

                  {/* Central Glow */}
                  <motion.div
                      animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-pink-500/30 blur-3xl rounded-full"
                  />
                  <Heart className="w-12 h-12 text-pink-500 relative z-10 animate-pulse" fill="currentColor" />
                </div>

                <div className="text-center">
                    <p className="text-pink-400 font-black text-2xl mb-1 tabular-nums">
                        {/* Fake progress counter */}
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          99%
                        </motion.span>
                    </p>
                    <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">
                        Synchronizing Hearts
                    </p>
                    <div className="flex justify-center gap-1 mt-4">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1 h-1 bg-pink-500 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen text-white overflow-hidden relative font-sans bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <ParticlesBackground 
          className="absolute inset-0 -z-10"
          quantity={150}
          color="#a855f7"
          vx={0.1}
          vy={0.1}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md"
          >
            <h2 className="text-3xl font-bold text-red-500 mb-4">Oops!</h2>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Go Back Home
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

    return (
        <div className="min-h-screen text-white overflow-hidden relative font-sans bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            <CursorTrail />
            <ConfettiOverlay 
                active={isRevealed && data !== null && ['Lovers', 'Marriage', 'Friends', 'Affectionate'].includes(data.result)} 
                type={data?.result === 'Lovers' || data?.result === 'Marriage' ? 'hearts' : 'mixed'}
            />
            <FloatingCosmicElements />
            <ParticlesBackground 
                className="absolute inset-0 -z-10"
                quantity={150}
                color="#a855f7"
                vx={0.1}
                vy={0.1}
            />

            <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
                {!isRevealed ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-50 text-center"
                    >
                        <motion.button
                            onClick={() => {
                                setIsRevealed(true);
                                if (data) playResultMusic(data.result);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative p-12 bg-white/5 backdrop-blur-3xl rounded-full border border-white/20 shadow-2xl transition-all hover:bg-white/10"
                        >
                            <motion.div 
                                className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <Play className="w-16 h-16 text-white group-hover:text-pink-400 transition-colors relative z-10" fill="currentColor" />
                        </motion.button>
                        <motion.p 
                            className="mt-8 text-white/60 uppercase tracking-[0.5em] text-[10px] font-bold animate-pulse"
                        >
                            Tap to Open Destiny
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative z-10 w-full max-w-3xl mx-auto"
                    >
                    <TiltWrapper>
                        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transform-style-3d">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-violet-500/10 opacity-50" />
                            
                            <div className="relative p-8 md:p-10">
                                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -10 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="flex-shrink-0"
                                    >
                                        <div className="relative w-48 h-48 md:w-56 md:h-56 transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${getResultColor(data.result)} rounded-2xl blur-2xl opacity-50`} />
                                            <img 
                                                src={getResultImage(data.result)} 
                                                alt={data.result}
                                                className="relative w-full h-full object-cover rounded-2xl border-2 border-white/20 shadow-2xl"
                                            />
                                        </div>
                                    </motion.div>

                                    <div className="flex-1 text-center md:text-left">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                                <Sparkles className="w-6 h-6 text-yellow-400" />
                                                <h2 className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${getResultColor(data.result)} bg-clip-text text-transparent`}>
                                                    {data.result}
                                                </h2>
                                                <Sparkles className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Shared Connection</p>
                                            
                                            <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                                <p className="text-purple-200/90 text-base md:text-lg font-light leading-relaxed italic">
                                                    "{data.quote}"
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center justify-center gap-4 mb-8"
                                >
                                    <div className="px-6 py-3 bg-purple-600/20 backdrop-blur-xl rounded-full border border-purple-500/30">
                                        <span className="text-purple-200 text-base md:text-lg font-medium">
                                            {data.name1}
                                        </span>
                                    </div>
                                    <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 animate-pulse" fill="currentColor" />
                                    <div className="px-6 py-3 bg-pink-600/20 backdrop-blur-xl rounded-full border border-pink-500/30">
                                        <span className="text-pink-200 text-base md:text-lg font-medium">
                                            {data.name2}
                                        </span>
                                    </div>
                                </motion.div>

                                <div className="text-center mb-8">
                                    <span className="inline-block px-4 py-2 bg-white/5 rounded-full text-white/40 text-sm font-medium border border-white/10">
                                        👁️ {data.view_count} Cosmic Views
                                    </span>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <motion.a
                                        href="/"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1"
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        <span>Check Your Destiny</span>
                                    </motion.a>

                                    <motion.a
                                        href="/"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                                    >
                                        <Home className="w-6 h-6" />
                                        <span>Back to Home</span>
                                    </motion.a>
                                </motion.div>
                            </div>
                        </div>
                    </TiltWrapper>
                </motion.div>
                )}
            </div>
            <footer className="absolute bottom-4 w-full text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-light pointer-events-auto z-50">
                Copyright © <a href="https://nithwin.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Nithwin</a> ❤️
            </footer>
        </div>
    );
};

export default SharedResultView;

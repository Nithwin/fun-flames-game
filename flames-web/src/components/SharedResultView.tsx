import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { fetchSharedResult, type FlamesShare } from '../utils/firebase';
import { Heart, Skull, Users, Gem, Smile, Baby, Loader } from 'lucide-react';

interface SharedResultViewProps {
  shortId: string;
}

const getIcon = (result: string) => {
  switch (result) {
    case "Friends": return <Users className="w-16 h-16 text-blue-400" />;
    case "Lovers": return <Heart className="w-16 h-16 text-red-500" fill="currentColor" />;
    case "Affectionate": return <Smile className="w-16 h-16 text-yellow-400" />;
    case "Marriage": return <Gem className="w-16 h-16 text-purple-400" />;
    case "Enemies": return <Skull className="w-16 h-16 text-gray-400" />;
    case "Siblings": return <Baby className="w-16 h-16 text-orange-400" />;
    default: return <Heart className="w-16 h-16 text-pink-400" />;
  }
};

const SharedResultView: React.FC<SharedResultViewProps> = ({ shortId }) => {
  const [data, setData] = useState<FlamesShare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
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
  }, [shortId]);

  if (loading) {
    return (
      <div className="min-h-screen text-white overflow-hidden relative font-sans bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
        <ParticlesBackground 
          className="absolute inset-0 -z-10"
          quantity={150}
          color="#a855f7"
          vx={0.1}
          vy={0.1}
        />
        <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
            <Loader className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-purple-400" />
            <p className="text-base sm:text-lg text-purple-300">Loading shared result...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen text-white overflow-hidden relative font-sans bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
        <ParticlesBackground 
          className="absolute inset-0 -z-10"
          quantity={150}
          color="#a855f7"
          vx={0.1}
          vy={0.1}
        />
        <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-xs sm:max-w-md"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3 sm:mb-4">Oops!</h2>
            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8">{error}</p>
            <a
              href="/"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Go Back Home
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-hidden relative font-sans bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      <ParticlesBackground 
        className="absolute inset-0 -z-10"
        quantity={150}
        color="#a855f7"
        vx={0.1}
        vy={0.1}
      />

      <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative z-10 w-full max-w-sm px-4 sm:px-8 py-6 sm:py-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl text-center"
        >
          <motion.div 
            className="flex justify-center mb-4 sm:mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <div className="p-4 sm:p-6 bg-white/10 rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {getIcon(data.result)}
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 mb-2">
            {data.result}
          </h2>
          
          <p className="text-purple-200 mb-6 sm:mb-8 font-light text-base sm:text-lg min-h-12 sm:min-h-14 flex items-center justify-center px-2">
            "{data.quote}"
          </p>

          <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8 uppercase tracking-widest px-2">
            <span className="truncate">{data.name1}</span>
            <span>•</span>
            <span className="truncate">{data.name2}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/40 mb-4 sm:mb-6">
            <span>👁️ {data.view_count} views</span>
          </div>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm sm:text-base font-medium transition-colors"
          >
            Calculate Your Own
          </motion.a>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
            <p className="text-xs text-white/40">
              ✨ Shared via Cosmic Flames
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SharedResultView;

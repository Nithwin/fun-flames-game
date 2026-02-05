import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ParticlesBackground from './components/ParticlesBackground';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import ResultReveal from './components/ResultReveal';
import SharedResultView from './components/SharedResultView';
import CursorTrail from './components/CursorTrail';
import ConfettiOverlay from './components/ConfettiOverlay';
import FloatingCosmicElements from './components/FloatingCosmicElements';
import { getFlamesResult, type FlamesResult } from './utils/flames';
import { getDynamicQuote } from './utils/quotes';
import { exportToCSV, type FlamesRecord } from './utils/excelExport';
import { saveFlamesResult } from './utils/firebase';
import { useCosmicAudio } from './hooks/useCosmicAudio';

function App() {
  const location = useLocation();
  const [step, setStep] = useState<'input' | 'calculating' | 'revealing' | 'result'>('input');
  const [names, setNames] = useState<{ name1: string; name2: string; hideNames: boolean }>({ name1: '', name2: '', hideNames: false });
  // ... rest of state
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [quote, setQuote] = useState('');
  const [history, setHistory] = useState<FlamesRecord[]>([]);
  const [shortId, setShortId] = useState<string | null>(null);
  const [luckScore, setLuckScore] = useState(0);
  const { playMusic, playSparkle, playResultMusic, stopAllMusic } = useCosmicAudio();

  // Check if this is a shared result view
  const isSharePath = location.pathname.startsWith('/share');
  const queryParams = new URLSearchParams(location.search);
  const urlShortId = location.pathname.startsWith('/share/') ? location.pathname.split('/share/')[1] : null;
  const fallbackNames = {
    name1: queryParams.get('n1'),
    name2: queryParams.get('n2'),
    res: queryParams.get('res')
  };

  if (isSharePath && (urlShortId || (fallbackNames.name1 && fallbackNames.name2 && fallbackNames.res))) {
    return <SharedResultView shortId={urlShortId} fallbackData={fallbackNames.name1 ? {
      name1: fallbackNames.name1,
      name2: fallbackNames.name2!,
      result: fallbackNames.res! as FlamesResult
    } : undefined} />;
  }

  const handleCalculate = (name1: string, name2: string, hideNames: boolean) => {
    setNames({ name1, name2, hideNames });
    setLuckScore(0);
    playMusic();
    const { result: pendingResult } = getFlamesResult(name1, name2);
    setResult(pendingResult); 
    setStep('calculating');
    
    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      const generatedQuote = getDynamicQuote(name1, name2, pendingResult);
      
      const newRecord: FlamesRecord = {
          id: Date.now().toString(),
          date: new Date().toLocaleString(),
          name1,
          name2,
          result: pendingResult
      };
      
      const updatedHistory = [...history, newRecord];
      setHistory(updatedHistory);
      exportToCSV(updatedHistory);
      
      setQuote(generatedQuote);
      setStep('revealing');
      if (pendingResult) playResultMusic(pendingResult);

      // Stay in revealing mode for 1.5s
      setTimeout(() => {
        setStep('result');
      }, 1500);

      saveFlamesResult(name1, name2, pendingResult, generatedQuote)
        .then((savedResult) => {
          if (savedResult) {
            setShortId(savedResult.short_id);
          }
        })
        .catch(() => {});
    }, 2500);
  };

  const getLoadingTheme = (res: FlamesResult | null) => {
    switch (res) {
      case "Lovers": return { msg: "The stars are whispering about love...", color: "text-pink-400", border: "border-t-pink-500 border-b-rose-500" };
      case "Marriage": return { msg: "Hearing wedding bells in the cosmos...", color: "text-purple-300", border: "border-t-purple-400 border-b-fuchsia-400" };
      case "Friends": return { msg: "A beautiful bond is forming...", color: "text-blue-400", border: "border-t-blue-500 border-b-cyan-500" };
      case "Enemies": return { msg: "The universe senses a rivalry...", color: "text-gray-400", border: "border-t-slate-500 border-b-gray-600" };
      case "Affectionate": return { msg: "There's a warm glow in your aura...", color: "text-yellow-400", border: "border-t-yellow-500 border-b-orange-500" };
      case "Siblings": return { msg: "A familiar connection deepens...", color: "text-orange-300", border: "border-t-orange-400 border-b-amber-500" };
      default: return { msg: "CONSULTING THE STARS...", color: "text-purple-200", border: "border-t-purple-500 border-b-purple-500" };
    }
  };

  const handleReset = () => {
    setStep('input');
    setResult(null);
    setNames({ name1: '', name2: '', hideNames: false });
    setShortId(null);
    setLuckScore(0);
    stopAllMusic();
  };

  const handleParticleHit = () => {
    setLuckScore(prev => Math.min(prev + 10, 100));
    playSparkle();
  };

  const currentTheme = getLoadingTheme(result);
  const isGolden = luckScore >= 100;

  return (
    <div className="min-h-screen text-white overflow-hidden relative font-sans bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <CursorTrail />
      <ConfettiOverlay 
        active={step === 'result' && ['Lovers', 'Marriage', 'Friends', 'Affectionate'].includes(result || '')} 
        type={result === 'Lovers' || result === 'Marriage' ? 'hearts' : 'mixed'} 
      />
      <FloatingCosmicElements />
      <ParticlesBackground 
        className="absolute inset-0 -z-10"
        quantity={150}
        color={result ? (result === "Lovers" ? "#ec4899" : result === "Friends" ? "#3b82f6" : "#a855f7") : "#a855f7"}
        vx={0.1}
        vy={0.1}
        interactive={step === 'calculating'}
        onParticleHit={handleParticleHit}
      />
      
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <InputForm onCalculate={handleCalculate} />
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4"
            >
               <div className="relative w-16 h-16 sm:w-24 sm:h-24">
                  <motion.div 
                    className={`absolute inset-0 border-4 border-r-transparent border-l-transparent rounded-full ${currentTheme.border}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-2 border-4 border-t-transparent border-r-white/20 border-b-transparent border-l-white/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">{result === "Lovers" ? "❤️" : result === "Enemies" ? "⚔️" : "✨"}</span>
                  </div>
               </div>
               <motion.span 
                 initial={{ opacity: 0.5 }}
                 animate={{ opacity: 1 }}
                 transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                 className={`text-sm sm:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase ${currentTheme.color} text-center max-w-xs`}
               >
                 {currentTheme.msg}
               </motion.span>
               
               {/* Luck Meter */}
               <div className="w-full max-w-[200px] mt-4">
                 <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest mb-1">
                   <span>Luck Meter</span>
                   <span>{luckScore}%</span>
                 </div>
                 <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                     initial={{ width: 0 }}
                     animate={{ width: `${luckScore}%` }}
                   />
                 </div>
                 <p className="text-[9px] text-center text-white/20 mt-2 italic">Tap the stars to increase luck!</p>
               </div>
            </motion.div>
          )}

          {step === 'revealing' && result && (
            <ResultReveal result={result} isGolden={isGolden} />
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full"
            >
              <ResultCard 
                result={result} 
                name1={names.name1} 
                name2={names.name2} 
                hideNames={names.hideNames}
                quote={quote}
                shortId={shortId}
                onReset={handleReset}
                isGolden={isGolden}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-light pointer-events-auto z-50">
        Copyright © <a href="https://nithwin.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Nithwin</a> ❤️
      </footer>
    </div>
  );
}

export default App;

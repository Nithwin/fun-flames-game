import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { getFlamesResult, type FlamesResult } from './utils/flames';
import { exportToCSV, type FlamesRecord } from './utils/excelExport';

function App() {
  const [step, setStep] = useState<'input' | 'calculating' | 'result'>('input');
  const [names, setNames] = useState<{ name1: string; name2: string; hideNames: boolean }>({ name1: '', name2: '', hideNames: false });
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [history, setHistory] = useState<FlamesRecord[]>([]);

  const handleCalculate = (name1: string, name2: string, hideNames: boolean) => {
    setNames({ name1, name2, hideNames });
    setStep('calculating');
    
    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      const { result } = getFlamesResult(name1, name2);
      
      const newRecord: FlamesRecord = {
          id: Date.now().toString(),
          date: new Date().toLocaleString(),
          name1,
          name2,
          result
      };
      
      const updatedHistory = [...history, newRecord];
      setHistory(updatedHistory);
      
      // Silently export to CSV in the background
      exportToCSV(updatedHistory);
      
      setResult(result);
      setStep('result');
    }, 2000);
  };

  const handleReset = () => {
    setStep('input');
    setResult(null);
    setNames({ name1: '', name2: '', hideNames: false });
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative font-sans bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <ParticlesBackground 
        className="absolute inset-0 -z-10"
        quantity={150}
        color="#a855f7"
        vx={0.1}
        vy={0.1}
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
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
              className="flex flex-col items-center justify-center space-y-6"
            >
               <div className="relative w-24 h-24">
                  <motion.div 
                    className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-2 border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-pink-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
               </div>
               <motion.span 
                 initial={{ opacity: 0.5 }}
                 animate={{ opacity: 1 }}
                 transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                 className="text-xl font-light tracking-[0.2em] text-purple-200"
               >
                 CONSULTING THE STARS...
               </motion.span>
            </motion.div>
          )}

          {step === 'result' && result && (
             <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <ResultCard 
                result={result} 
                name1={names.name1} 
                name2={names.name2} 
                hideNames={names.hideNames}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

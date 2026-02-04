import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Eye, EyeOff, RotateCcw } from 'lucide-react';
import TiltWrapper from './TiltWrapper';

interface InputFormProps {
    onCalculate: (name1: string, name2: string, hideNames: boolean) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [hideNames, setHideNames] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name1.trim() && name2.trim()) {
            onCalculate(name1, name2, hideNames);
        }
    };

    const handleClear = () => {
        setName1('');
        setName2('');
    };

    return (
        <TiltWrapper>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-sm px-4 py-6 sm:px-8 sm:py-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
        >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
                 <button 
                    type="button"
                    onClick={handleClear}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                    title="Clear Inputs"
                 >
                     <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                 </button>

                <div className="p-2 sm:p-3 bg-purple-600/20 rounded-full border border-purple-500/30">
                    <Flame className="w-7 h-7 sm:w-10 sm:h-10 text-purple-400" />
                </div>

                <button 
                    type="button"
                    onClick={() => setHideNames(!hideNames)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                    title={hideNames ? "Show Names" : "Hide Names"}
                 >
                     {hideNames ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                 </button>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8 tracking-wide">
                Cosmic Flames
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-purple-200 ml-1">Your Name</label>
                    <input
                        type={hideNames ? "password" : "text"}
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="Enter name..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base text-white placeholder-white/30 transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-pink-200 ml-1">Partner's Name</label>
                    <input
                        type={hideNames ? "password" : "text"}
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Enter partner's name..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base text-white placeholder-white/30 transition-all font-medium"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-lg text-sm sm:text-lg uppercase tracking-wider relative overflow-hidden group"
                >
                    <span className="relative z-10">Calculate Destiny</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </motion.button>
            </form>
        </motion.div>
        </TiltWrapper>
    );
};

export default InputForm;

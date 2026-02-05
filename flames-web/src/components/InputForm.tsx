import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Eye, EyeOff, Sparkles } from 'lucide-react';
import TiltWrapper from './TiltWrapper'; // Import TiltWrapper

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

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-2xl mx-auto px-4"
        >
            <TiltWrapper>
            {/* Dark Glassmorphism Card - Full Width */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transform-style-3d">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-violet-500/10 opacity-50" />
                
                {/* Content */}
                <div className="relative p-5 sm:p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                            className="inline-flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-500"
                        >
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full border border-white/30 shadow-lg shadow-purple-500/20">
                                <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
                            </div>
                        </motion.div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent drop-shadow-lg filter">
                                Aura Flames
                            </span>
                        </h1>
                        
                        <p className="text-white/60 text-sm md:text-base flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-300" />
                            Discover your cosmic connection
                        </p>
                    </div>

                    {/* Form - Full Width Layout */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Inputs in Row on Desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Name 1 Input */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wide transform translate-z-5">
                                    Your Name
                                </label>
                                <input
                                    type={hideNames ? "password" : "text"}
                                    value={name1}
                                    onChange={(e) => setName1(e.target.value)}
                                    placeholder="Enter your name..."
                                    className="w-full px-4 py-3 sm:py-4 bg-black/30 border-2 border-white/10 focus:border-purple-500 rounded-2xl focus:outline-none text-base sm:text-lg text-white placeholder-white/30 transition-all duration-300 font-medium hover:bg-black/40"
                                />
                            </div>

                            {/* Name 2 Input */}
                            <div>
                                <label className="block text-sm font-semibold text-pink-300 mb-2 uppercase tracking-wide transform translate-z-5">
                                    Partner's Name
                                </label>
                                <input
                                    type={hideNames ? "password" : "text"}
                                    value={name2}
                                    onChange={(e) => setName2(e.target.value)}
                                    placeholder="Enter partner's name..."
                                    className="w-full px-4 py-3 sm:py-4 bg-black/30 border-2 border-white/10 focus:border-pink-500 rounded-2xl focus:outline-none text-base sm:text-lg text-white placeholder-white/30 transition-all duration-300 font-medium hover:bg-black/40"
                                />
                            </div>
                        </div>

                        {/* Privacy Toggle & Submit Button Row */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {/* Privacy Toggle */}
                            <button
                                type="button"
                                onClick={() => setHideNames(!hideNames)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                                    hideNames 
                                        ? 'bg-purple-600/30 border-2 border-purple-500/50' 
                                        : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {hideNames ? (
                                    <EyeOff className="w-5 h-5 text-purple-300" />
                                ) : (
                                    <Eye className="w-5 h-5 text-white/50" />
                                )}
                                <span className="text-sm font-medium text-white">
                                    {hideNames ? 'Hidden' : 'Visible'}
                                </span>
                            </button>

                            {/* Submit Button */}
                             <motion.button
                                type="submit"
                                disabled={!name1.trim() || !name2.trim()}
                                whileHover={{ scale: 1.02, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 w-full md:w-auto py-3 sm:py-4 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 rounded-2xl font-bold text-white text-base sm:text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-purple-500/30 transition-all duration-300 border border-white/20"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5 animate-pulse" />
                                    Calculate Destiny
                                    <Sparkles className="w-5 h-5 animate-pulse" />
                                </span>
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
            </TiltWrapper>
        </motion.div>
    );
};

export default InputForm;

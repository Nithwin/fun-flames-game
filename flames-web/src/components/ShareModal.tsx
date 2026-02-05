import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Download } from 'lucide-react';
import QRCode from 'qrcode';
import type { FlamesResult } from '../utils/flames';

interface ShareModalProps {
    shortId: string | null;
    name1: string;
    name2: string;
    result: FlamesResult;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shortId, name1, name2, result, onClose }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [copied, setCopied] = useState(false);
    
    const shareUrl = shortId 
        ? `${window.location.origin}/share/${shortId}`
        : `${window.location.origin}/share?n1=${encodeURIComponent(name1)}&n2=${encodeURIComponent(name2)}&res=${encodeURIComponent(result)}`;

    useEffect(() => {
        QRCode.toDataURL(shareUrl, {
            width: 280,
            margin: 2,
            color: {
                dark: '#8b5cf6',
                light: '#ffffff'
            }
        }).then(setQrCodeUrl);
    }, [shareUrl]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadQR = () => {
        if (!qrCodeUrl) return;
        const link = document.createElement('a');
        link.download = `flames-${shortId}.png`;
        link.href = qrCodeUrl;
        link.click();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    {/* Background decorations matching ResultCard */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-violet-500/10 opacity-50" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
                    
                    {/* Modal Content */}
                    <div className="relative flex flex-col h-full">
                        {/* Header - Always visible */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-white">Share Result</h3>
                                <p className="text-white/50 text-sm mt-0.5">{name1} & {name2}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                {/* Left Col: Badge & QR */}
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-full text-center">
                                        <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 font-semibold mb-3 text-xs uppercase tracking-wider">
                                            Relationship Status
                                        </div>
                                        <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transform scale-100 hover:scale-105 transition-transform duration-300">
                                            {result}
                                        </h2>
                                    </div>

                                    {qrCodeUrl && (
                                        <div className="group relative p-3 bg-white rounded-2xl shadow-2xl shadow-purple-500/10 max-w-[200px] transition-transform hover:-translate-y-1 duration-300">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity" />
                                            <img 
                                                src={qrCodeUrl} 
                                                alt="QR Code" 
                                                className="relative w-full h-auto rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Right Col: Actions */}
                                <div className="flex flex-col gap-6 w-full">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60 ml-1">Copy Link</label>
                                        <div className="flex gap-2 w-full">
                                            <div className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 text-sm truncate font-mono transition-colors">
                                                {shareUrl}
                                            </div>
                                            <button
                                                onClick={handleCopy}
                                                className="px-4 bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors flex items-center justify-center text-white shadow-lg shadow-purple-900/20"
                                            >
                                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={handleDownloadQR}
                                            className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Save QR Code
                                        </button>
                                        
                                        <button
                                            onClick={onClose}
                                            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-purple-900/20"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShareModal;

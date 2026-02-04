import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2, QrCode, Sparkles } from 'lucide-react';
import QRCode from 'qrcode.react';
import { getShareUrl } from '../utils/firebase';

interface ShareModalProps {
  shortId: string;
  name1: string;
  name2: string;
  result: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shortId, name1, name2, result, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const shareUrl = getShareUrl(shortId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `Check out my FLAMES result! ${name1} & ${name2} are destined to be ${result}.\n\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('#qr-code-canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = (canvas as HTMLCanvasElement).toDataURL('image/png');
      link.download = `flames-${shortId}.png`;
      link.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl mx-4 sm:mx-0 my-auto p-6 sm:p-10 bg-linear-to-br from-purple-900/95 via-pink-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-white/25 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors text-lg sm:text-xl"
        >
          ✕
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 sm:mb-10 pr-8"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin shrink-0" />
            <h3 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">Share Your Destiny</h3>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin shrink-0" />
          </div>
          <p className="text-white/80 text-sm sm:text-lg leading-relaxed">
            <span className="font-semibold text-white">{name1}</span>
            <span className="text-white/60"> & </span>
            <span className="font-semibold text-white">{name2}</span>
            <span className="text-white/60"> are destined to be </span>
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">{result}</span>
          </p>
        </motion.div>

        {/* QR Code Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQR(!showQR)}
          className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border border-white/30 rounded-xl text-white font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 mb-6 sm:mb-8"
        >
          <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
          {showQR ? '✨ Hide QR Code' : '✨ Show QR Code'}
        </motion.button>

        {/* Animated QR Code */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="my-6 sm:my-10 flex flex-col items-center"
          >
            {/* Glow Effect Background */}
            <div className="relative mb-6">
              {/* Animated glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                    '0 0 60px rgba(236, 72, 153, 0.5)',
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />
              
              {/* QR Code Container */}
              <motion.div
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative p-5 sm:p-6 bg-white rounded-2xl shadow-2xl"
              >
                <QRCode
                  id="qr-code-canvas"
                  value={shareUrl}
                  size={Math.min(220, window.innerWidth - 100)}
                  level="H"
                  includeMargin={true}
                  fgColor="#a855f7"
                  bgColor="#ffffff"
                />
              </motion.div>

              {/* Corner decorations */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className={`absolute w-4 h-4 bg-linear-to-r from-purple-400 to-pink-400 ${
                    i === 0 ? 'top-0 left-0' : ''
                  } ${i === 1 ? 'top-0 right-0' : ''} ${i === 2 ? 'bottom-0 left-0' : ''} ${
                    i === 3 ? 'bottom-0 right-0' : ''
                  }`}
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm sm:text-base text-center">Scan to view your destiny result!</p>
          </motion.div>
        )}

        {/* Share Link Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <label className="text-xs sm:text-sm font-bold text-white/70 uppercase mb-3 block tracking-wider">
            🔗 Shareable Link
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div
              className="relative flex-1"
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-black/40 border border-white/25 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 pointer-events-none"
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0 text-white ${
                copied
                  ? 'bg-green-500/90 shadow-lg shadow-green-500/50'
                  : 'bg-purple-600/80 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              {copied ? '✓ Copied!' : 'Copy'}
            </motion.button>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShareWhatsApp}
            className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-4 sm:py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg"
          >
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">💬 Share on WhatsApp</span>
            <span className="sm:hidden">💬 WhatsApp</span>
          </motion.button>

          {showQR && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadQR}
              className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-4 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">📥 Download QR Code</span>
              <span className="sm:hidden">📥 Download</span>
            </motion.button>
          )}
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs sm:text-sm text-white/60 space-y-2 p-4 sm:p-5 bg-black/20 border border-white/10 rounded-xl"
        >
          <p>✨ Share this magical link with your special someone!</p>
          <p>👀 View counter updates automatically</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;

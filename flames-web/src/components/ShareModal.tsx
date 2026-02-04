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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md p-8 bg-linear-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          ✕
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
            <h3 className="text-2xl font-bold text-white">Share Your Destiny</h3>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          </div>
          <p className="text-white/70 text-sm">
            {name1} & {name2} are destined to be{' '}
            <span className="text-pink-300 font-semibold">{result}</span>
          </p>
        </motion.div>

        {/* QR Code Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQR(!showQR)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border border-white/20 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
        >
          <QrCode className="w-5 h-5" />
          {showQR ? '✨ Hide QR Code' : '✨ Show QR Code'}
        </motion.button>

        {/* Animated QR Code */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="my-6 flex justify-center"
          >
            {/* Glow Effect Background */}
            <div className="relative">
              {/* Animated glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.4)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-lg"
              />
              
              {/* QR Code Container */}
              <motion.div
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative p-4 bg-white rounded-lg shadow-2xl"
              >
                <QRCode
                  id="qr-code-canvas"
                  value={shareUrl}
                  size={220}
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
                  className={`absolute w-3 h-3 bg-linear-to-r from-purple-400 to-pink-400 ${
                    i === 0 ? 'top-0 left-0' : ''
                  } ${i === 1 ? 'top-0 right-0' : ''} ${i === 2 ? 'bottom-0 left-0' : ''} ${
                    i === 3 ? 'bottom-0 right-0' : ''
                  }`}
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Link Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <label className="text-xs font-semibold text-white/60 uppercase mb-2 block">
            🔗 Shareable Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm text-center truncate focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                copied
                  ? 'bg-green-500/80 text-white shadow-lg shadow-green-500/50'
                  : 'bg-purple-600/80 hover:bg-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShareWhatsApp}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            💬 Share on WhatsApp
          </motion.button>

          {showQR && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadQR}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              📥 Download QR Code
            </motion.button>
          )}
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-white/50 space-y-2"
        >
          <p>✨ Share this magical link with your special someone!</p>
          <p>👀 View counter updates automatically</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleLoadingScreenProps {
  onComplete: () => void;
}

export default function SimpleLoadingScreen({ onComplete }: SimpleLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
        >
          {/* Simple animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 animate-pulse" />
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </h1>
              <p className="text-gray-400 mt-2 text-lg">Loading experience...</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Progress text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-cyan-400 font-mono text-sm"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Simple dots animation */}
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-cyan-400/50 font-mono text-xs">
            {'<dev>'}
          </div>
          <div className="absolute bottom-4 right-4 text-cyan-400/50 font-mono text-xs">
            {'</portfolio>'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

export const ProjectsGithubButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const handleGithubRedirect = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.open('https://github.com/Adityakumarjha087', '_blank');
        }
      });
    }
  };

  return (
    <motion.button
        ref={buttonRef}
        onClick={handleGithubRedirect}
        className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Button content */}
        <div className="relative flex items-center gap-3">
          <FaGithub className="text-xl" />
          <span>More Projects</span>
          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </motion.button>
  );
};

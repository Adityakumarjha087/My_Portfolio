'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { gsap } from 'gsap';

interface ProjectsTitleProps {
  onAnimationComplete?: () => void;
}

export const ProjectsTitle = ({ onAnimationComplete }: ProjectsTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text for character animation
    const text = titleRef.current.textContent || '';
    titleRef.current.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block" style="opacity: 0; transform: translateY(50px)">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    // Animate each character
    anime({
      targets: titleRef.current.querySelectorAll('span'),
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [-90, 0],
      duration: 800,
      delay: anime.stagger(80),
      easing: 'easeOutExpo',
      complete: () => {
        // Add continuous floating animation
        gsap.to(titleRef.current, {
          y: -8,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
        onAnimationComplete?.();
      }
    });
  }, [onAnimationComplete]);

  return (
    <div className="text-center mb-16">
      <h2 
        ref={titleRef}
        className="text-5xl md:text-7xl font-bold mb-6 text-white"
      >
        Featured Projects
      </h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
      >
        Showcasing innovative solutions and creative implementations
      </motion.p>
      
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '200px' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12 rounded-full"
      />
    </div>
  );
};

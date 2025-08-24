'use client';

import { useRef, useEffect, useState } from 'react';

interface SkillsTitleProps {
  onAnimationComplete?: () => void;
}

export const SkillsTitle = ({ onAnimationComplete }: SkillsTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !titleRef.current || isAnimated) return;

    // Dynamic import GSAP only on client
    const loadGSAP = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      // Character-by-character title animation
      const titleText = titleRef.current?.textContent || '';
      if (titleRef.current) {
        titleRef.current.innerHTML = '';
        
        titleText.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.transform = 'translateY(50px) rotateX(-90deg)';
          titleRef.current?.appendChild(span);
        });

        // Animate each character
        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          delay: 0.5,
          onComplete: onAnimationComplete
        });
      }

      setIsAnimated(true);
    };

    loadGSAP();
  }, [isClient, onAnimationComplete, isAnimated]);

  return (
    <div className="text-center mb-16">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 text-white">
        Technical Skills
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full" />
    </div>
  );
};

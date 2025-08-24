import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  index: number;
}

export const AnimatedNavLink: React.FC<AnimatedNavLinkProps> = ({ href, children, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isHovered || typeof window === 'undefined') return;

    import('gsap').then((gsap) => {
      gsap.default.to(linkRef.current, {
        duration: 0.3,
        scale: 1.1,
        y: -3,
        ease: 'power2.out',
      });
    });

    return () => {
      if (typeof window !== 'undefined' && linkRef.current) {
        const currentLink = linkRef.current;
        import('gsap').then((gsap) => {
          gsap.default.to(currentLink, {
            duration: 0.3,
            scale: 1,
            y: 0,
            ease: 'power2.out',
          });
        });
      }
    };
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }}
      className="relative group"
    >
      <Link
        ref={linkRef}
        href={href}
        className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        
        {/* Particle burst on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 0
                }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 20,
                  y: Math.sin(i * 60 * Math.PI / 180) * 20,
                  opacity: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: i * 0.05
                }}
              />
            ))}
          </motion.div>
        )}
        
        <span className="relative z-10">{children}</span>
      </Link>
    </motion.div>
  );
};

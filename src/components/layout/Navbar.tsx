import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AnimatedNavLink } from './AnimatedNavLink';
import { useIsClient } from '../../hooks/useIsClient';

// Dynamic import for ThreeBackground
const ThreeBackground = dynamic(
  () => import('../backgrounds/ThreeBackground').then(mod => ({ default: mod.ThreeBackground || mod.default })),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
  }
);

interface NavbarParticleSystemProps {
  isActive: boolean;
}

const NavbarParticleSystem = dynamic<NavbarParticleSystemProps>(
  () => import('./NavbarParticleSystem').then(mod => mod.NavbarParticleSystem),
  { 
    ssr: false,
    loading: () => null
  }
);

export const Navbar = () => {
  const logoRef = useRef<SVGPathElement>(null);
  const isClient = useIsClient();
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    if (!isClient || !logoRef.current) return;

    // Only run this code on the client side
    import('animejs').then((anime) => {
      anime.default({
        targets: logoRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 500,
        autoplay: true,
      });
    });
  }, [isClient]);

  // Animation variants for the text
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: 1,
      },
    },
  };

  const item: Variants = {
    hidden: { 
      y: -30,
      opacity: 0,
      scale: 0.5,
      rotateX: -90,
    },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 8,
        delay: i * 0.03,
      },
    }),
  };

  const name = 'ADITYA JHA';
  const nameArray = name.split('');

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 overflow-hidden"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      {/* 3D Background */}
      {isClient && (
        <ThreeBackground 
          className="opacity-20"
          particleCount={500}
          color="#8b5cf6"
          background="transparent"
        />
      )}
      
      {/* Particle System */}
      {isClient && <NavbarParticleSystem isActive={isNavHovered} />}
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"
        animate={{
          opacity: isNavHovered ? 1 : 0,
          background: isNavHovered 
            ? 'linear-gradient(90deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15), rgba(6,182,212,0.15))'
            : 'linear-gradient(90deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05), rgba(6,182,212,0.05))'
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <motion.div 
                className="flex items-center relative"
                initial="hidden"
                animate="show"
                variants={container}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                {/* Logo glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl"
                  animate={{
                    opacity: isLogoHovered ? 1 : 0,
                    scale: isLogoHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {nameArray.map((letter, index) => (
                  <motion.span 
                    key={index} 
                    className="text-xl font-bold text-white relative z-10"
                    custom={index}
                    variants={item}
                    style={{
                      display: 'inline-block',
                      textShadow: '0 0 20px rgba(255,255,255,0.5)',
                      position: 'relative',
                      padding: '0 1px',
                      perspective: '1000px',
                    }}
                    whileHover={{
                      color: '#3b82f6',
                      scale: 1.3,
                      y: -5,
                      rotateY: 15,
                      textShadow: '0 0 30px rgba(59,130,246,0.8)',
                      transition: { 
                        duration: 0.2,
                        type: 'spring',
                        stiffness: 300
                      },
                    }}
                    animate={{
                      textShadow: isLogoHovered 
                        ? '0 0 25px rgba(59,130,246,0.6)' 
                        : '0 0 20px rgba(255,255,255,0.3)'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                    
                    {/* Individual letter glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-400/30 to-purple-400/30 rounded blur-sm"
                      animate={{
                        opacity: isLogoHovered ? 0.8 : 0,
                        scale: isLogoHovered ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                    />
                  </motion.span>
                ))}
                
                {/* Floating particles around logo */}
                {isLogoHovered && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
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
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{
                          x: Math.cos(i * 45 * Math.PI / 180) * 30,
                          y: Math.sin(i * 45 * Math.PI / 180) * 20,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link, index) => (
                <AnimatedNavLink
                  key={link.href}
                  href={link.href}
                  index={index}
                >
                  {link.label}
                </AnimatedNavLink>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button with enhanced animation */}
          <motion.div 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <motion.div
                animate={{ rotate: isNavHovered ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        animate={{
          opacity: isNavHovered ? 1 : 0.3,
          scaleX: isNavHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.nav>
  );
};

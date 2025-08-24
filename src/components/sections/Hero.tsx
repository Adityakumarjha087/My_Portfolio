import { FiGithub, FiLinkedin, FiArrowRight, FiMail } from 'react-icons/fi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AnimatedMail from '../ui/AnimatedMail';
import { useIsClient } from '../../hooks/useIsClient';

// Dynamic import for ThreeBackground
const ThreeBackground = dynamic(() => import('../backgrounds/ThreeBackground'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/20" />
});

const getSocialLinks = (isClient: boolean) => [
  { icon: <FiGithub className="w-6 h-6" />, url: 'https://github.com/Adityakumarjha087' },
  { icon: <FiLinkedin className="w-6 h-6" />, url: 'https://www.linkedin.com/in/adityajha12/' },
  { 
    icon: isClient ? (
      <AnimatedMail className="w-6 h-6" size={20} />
    ) : (
      <FiMail className="w-6 h-6" />
    ),
    url: 'mailto:9aadityakumar12@gmail.com' 
  },
];

const roles = ['Web Developer', 'Full Stack Developer', 'Software Engineer', 'AI Enthusiast'];

// Floating particles component (currently unused)
// const FloatingParticles = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-30"
//           initial={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//           }}
//           animate={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "linear",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// Typewriter effect hook (currently unused but kept for future use)
// const useTypewriter = (text: string, speed: number = 100) => {
//   const [displayText, setDisplayText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//
//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayText(prev => prev + text[currentIndex]);
//         setCurrentIndex(prev => prev + 1);
//       }, speed);
//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, text, speed]);
//
//   return displayText;
// };

export const Hero = () => {
  const isClient = useIsClient();
  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const socialLinks = getSocialLinks(isClient);

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } else {
      // Fallback: scroll to bottom of page if contact section not found
      window.scrollTo({ 
        top: document.body.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  // Typewriter effect - only run on client to prevent hydration mismatch
  useEffect(() => {
    if (!isClient) return;
    
    const currentRole = roles[roleIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        // After pausing, start deleting
        setIsPaused(false);
        setIsDeleting(true);
      } else if (isDeleting) {
        // Delete one character at a time
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          // When done deleting, move to next role
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      } else {
        // Type one character at a time
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          // When done typing current role, pause before deleting
          setIsPaused(true);
        }
      }
    }, isPaused ? 1000 : isDeleting ? 50 : 100); // Adjust timing as needed

    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isDeleting, isPaused, isClient]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Three.js Background */}
      {isClient && (
        <ThreeBackground 
          className="opacity-30"
          particleCount={400}
          color="#6366f1"
          background="#000000"
        />
      )}
      
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-indigo-500/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500/20 rounded-lg"
        animate={{
          rotate: -360,
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Content */}
          <div className="lg:w-1/2">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-2 bg-gray-900 rounded-full mb-6">
                <span className="text-indigo-400 text-sm font-medium">Welcome to my portfolio</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animated-text-spacing whitespace-nowrap"
              >
                Hi, I&apos;m Aditya Jha
              </motion.h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl mb-6 mt-10">
                <h2 className="flex items-center gap-2">
                  I&apos;m a{' '}
                  <span className="text-indigo-400 font-semibold">
                    {displayText || roles[0]}
                    {isClient && <span className="animate-pulse">|</span>}
                  </span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-400 max-w-lg">
                I design and code beautifully simple things, and I love what I do.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  onClick={handleHireMeClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiArrowRight />
                  </motion.div>
                </motion.button>
                <motion.a
                  href="https://drive.google.com/file/d/106rwjy3w9L6v7za4cvdJyrlImDoK6bF7/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 hover:border-indigo-500 text-white font-medium rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-8 mt-12">
                {socialLinks.map((link: { icon: React.ReactNode; url: string }, index: number) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    aria-label={link.url}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.8 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glowing background */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ 
                        opacity: 1, 
                        scale: 1.2,
                        transition: { duration: 0.3 }
                      }}
                    />
                    
                    {/* Icon container */}
                    <motion.div
                      className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 text-2xl group-hover:border-indigo-400/50 transition-all duration-300"
                      whileHover={{
                        backgroundColor: "#6366f119",
                        borderColor: "#6366f180",
                        boxShadow: "0 0 30px #6366f14d",
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                          color: "#6366f1"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.icon}
                      </motion.div>
                      
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-indigo-400/30"
                        initial={{ scale: 1, opacity: 0 }}
                        whileHover={{
                          scale: [1, 1.2, 1.4],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Image */}
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-2xl opacity-20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-400/20"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  borderColor: ["rgba(99, 102, 241, 0.2)", "rgba(139, 92, 246, 0.4)", "rgba(99, 102, 241, 0.2)"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
              >
                <Image
                  src="/images/mypic/adi1.jpeg"
                  alt="Aditya Jha"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="grayscale-0"
                  priority
                />
              </motion.div>
              
              {/* Floating elements around image */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full opacity-60"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

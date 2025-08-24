'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiCalendar, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { useIsClient } from '../../hooks/useIsClient';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isClient = useIsClient();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isClient) return;

    const timeline = timelineRef.current;
    const path = pathRef.current;
    
    if (timeline && path) {
      const pathLength = path.getTotalLength();
      
      // Set initial state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      // Create scroll-triggered timeline drawing with enhanced effects
      ScrollTrigger.create({
        trigger: timeline,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Animate path drawing
          gsap.to(path, {
            strokeDashoffset: pathLength * (1 - progress),
            duration: 0.3,
            ease: 'none'
          });
          
          // Add dynamic glow effect to timeline path
          gsap.to('.experience-timeline-path', {
            filter: `drop-shadow(0 0 ${15 + progress * 25}px rgba(16, 185, 129, ${0.4 + progress * 0.5}))`,
            duration: 0.2
          });
        }
      });

      // Animate timeline connection lines with wave effect
      gsap.fromTo('.experience-connection',
        {
          scaleX: 0,
          transformOrigin: 'left center'
        },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate timeline nodes with stagger
      gsap.fromTo('.experience-node', 
        { 
          scale: 0, 
          opacity: 0,
          rotationY: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate experience cards with morphing effect
      gsap.fromTo('.experience-timeline-card',
        {
          opacity: 0,
          y: 100,
          rotationX: -15,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  const icons = [FiBriefcase, FiTrendingUp];

  return (
    <div ref={timelineRef} className="relative max-w-5xl mx-auto mt-16">
      {/* Advanced SVG Timeline */}
      <div className="absolute left-8 top-0 bottom-0 w-1 z-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="experienceTimelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
            </linearGradient>
            <filter id="experienceGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathRef}
            d={`M 2 0 Q 2 ${25} 2 ${50} T 2 ${100} T 2 ${150} T 2 100%`}
            stroke="url(#experienceTimelineGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#experienceGlow)"
            className="experience-timeline-path"
          />
        </svg>
        
        {/* Enhanced Progress indicator with animated particles */}
        <motion.div 
          className="absolute top-0 left-0 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-500 rounded-full"
          style={{
            height: `${scrollProgress * 100}%`,
            boxShadow: `0 0 ${20 + scrollProgress * 15}px rgba(16, 185, 129, ${0.6 + scrollProgress * 0.4})`
          }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Animated progress particles */}
          <motion.div
            className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-300 rounded-full -translate-x-1/2"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          {/* Trailing particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full -translate-x-1/2"
              animate={{
                y: [0, -8, 0],
                scale: [0.5, 1.2, 0.5],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
              style={{ top: `${i * 8}px` }}
            />
          ))}
        </motion.div>
      </div>

      {/* Experience Items */}
      <div className="space-y-16">
        {experiences.map((experience, index) => {
          const IconComponent = icons[index % icons.length];
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-start ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Enhanced Timeline Node */}
              <div className={`relative z-10 flex-shrink-0 experience-node ${isEven ? 'mr-8' : 'ml-8'}`}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Main Node */}
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-900 relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                  </div>
                  
                  {/* Orbital Rings */}
                  {isClient && (
                    <>
                      {[...Array(2)].map((_, ringIndex) => (
                        <motion.div
                          key={ringIndex}
                          className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.3 + ringIndex * 0.2, 1],
                            opacity: [0.6, 0.2, 0.6],
                          }}
                          transition={{
                            duration: 4 + ringIndex * 2,
                            repeat: Infinity,
                            delay: index * 0.3 + ringIndex * 0.5,
                          }}
                          style={{
                            borderWidth: `${2 - ringIndex * 0.5}px`,
                          }}
                        />
                      ))}
                      
                      {/* Floating particles around node */}
                      {[...Array(4)].map((_, particleIndex) => (
                        <motion.div
                          key={particleIndex}
                          className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                          style={{
                            left: `${30 + Math.cos(particleIndex * 90 * Math.PI / 180) * 40}px`,
                            top: `${30 + Math.sin(particleIndex * 90 * Math.PI / 180) * 40}px`,
                          }}
                          animate={{
                            rotate: [0, 360],
                            scale: [0.8, 1.4, 0.8],
                            opacity: [0.4, 0.9, 0.4],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: index * 0.2 + particleIndex * 0.4,
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  {/* Enhanced Year Badge */}
                  <motion.div
                    className={`absolute ${isEven ? '-right-4' : '-left-4'} -top-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: isEven ? 5 : -5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <FiCalendar className="w-4 h-4 inline mr-2" />
                    {experience.duration.split(' - ')[0]}
                  </motion.div>
                  
                  {/* Flowing Connection Line */}
                  <motion.div
                    className={`absolute ${isEven ? 'left-10' : 'right-10'} top-10 ${isEven ? 'w-16' : 'w-16'} h-1 bg-gradient-to-${isEven ? 'r' : 'l'} from-emerald-400 via-cyan-400 to-transparent experience-connection rounded-full overflow-hidden`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                  >
                    {/* Liquid flow effect */}
                    <motion.div
                      className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-10 h-full bg-gradient-to-r from-white/70 to-emerald-400/90 rounded-full`}
                      animate={{
                        x: isEven ? [-40, 64, -40] : [40, -64, 40],
                        scaleX: [0.5, 1.3, 0.5],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: index * 0.6,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced Content Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  x: isEven ? 15 : -15,
                  rotateY: isEven ? 2 : -2,
                  z: 50
                }}
                className={`flex-1 experience-timeline-card ${isEven ? 'ml-0' : 'mr-0'}`}
                style={{ transformPerspective: '1000px' }}
              >
                <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden group">
                  {/* Dynamic Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern id={`experiencePattern${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M0,15 Q15,5 30,15 T60,15" stroke="#10b981" strokeWidth="0.3" fill="none" opacity="0.4" />
                          <circle cx="15" cy="15" r="1" fill="#06b6d4" opacity="0.6" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#experiencePattern${index})`} />
                    </svg>
                  </div>
                  
                  {/* Morphing Hover Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: [-100, 100],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        />
                        <FiBriefcase className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                          {experience.role}
                        </h3>
                        <p className="text-emerald-400 text-lg font-semibold">{experience.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="text-gray-300 font-medium flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                        <FiCalendar className="w-4 h-4" />
                        {experience.duration}
                      </span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-full">
                        <FiMapPin className="w-4 h-4" />
                        {experience.location}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg">
                      <FiTrendingUp className="w-4 h-4" />
                      {experience.type}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="relative z-10 text-gray-100 leading-relaxed mb-6 text-base">{experience.description}</p>
                  
                  {/* Achievements */}
                  <div className="relative z-10 mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FiTrendingUp className="w-4 h-4 text-emerald-400" />
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.6 }}
                          className="flex items-start gap-3 text-gray-100 text-sm"
                        >
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="relative z-10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FiBriefcase className="w-4 h-4 text-cyan-400" />
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + techIndex * 0.1 + 0.8 }}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;

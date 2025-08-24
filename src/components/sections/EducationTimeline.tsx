'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBook, FiCode, FiCpu, FiAward, FiCalendar } from 'react-icons/fi';
import { useIsClient } from '../../hooks/useIsClient';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  status: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  skills?: string[];
}

interface EducationTimelineProps {
  educationData: Education[];
}

export const EducationTimeline = ({ educationData }: EducationTimelineProps) => {
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
          
          // Add pulsing effect to active section
          gsap.to('.education-timeline-path', {
            filter: `drop-shadow(0 0 ${10 + progress * 20}px rgba(59, 130, 246, ${0.3 + progress * 0.4}))`,
            duration: 0.2
          });
        }
      });

      // Animate timeline connection lines with wave effect
      gsap.fromTo('.education-connection',
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
      gsap.fromTo('.education-node', 
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

      // Animate education cards with morphing effect
      gsap.fromTo('.education-timeline-card',
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

  const icons = [FiBook, FiCode, FiCpu, FiAward];

  return (
    <div ref={timelineRef} className="relative max-w-4xl mx-auto">
      {/* Advanced SVG Timeline */}
      <div className="absolute left-8 top-0 bottom-0 w-1 z-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="educationTimelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
            <filter id="educationGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathRef}
            d={`M 2 0 Q 2 ${20} 2 ${40} T 2 ${80} T 2 ${120} T 2 ${160} T 2 100%`}
            stroke="url(#educationTimelineGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#educationGlow)"
            className="education-timeline-path"
          />
        </svg>
        
        {/* Enhanced Progress indicator with animated particles */}
        <motion.div 
          className="absolute top-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
          style={{
            height: `${scrollProgress * 100}%`,
            boxShadow: `0 0 ${20 + scrollProgress * 10}px rgba(59, 130, 246, ${0.5 + scrollProgress * 0.3})`
          }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Animated progress particles */}
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full -translate-x-1/2"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          {/* Trailing particles */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-1 bg-purple-300 rounded-full -translate-x-1/2"
              animate={{
                y: [0, -6, 0],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
              style={{ top: `${i * 6}px` }}
            />
          ))}
        </motion.div>
      </div>

      {/* Education Items */}
      <div className="space-y-12">
        {educationData.map((education, index) => {
          const IconComponent = icons[index % icons.length];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative flex items-start"
            >
              {/* Enhanced Timeline Node */}
              <div className="relative z-10 flex-shrink-0 education-node">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Main Node */}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-900 relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    <IconComponent className="w-8 h-8 text-white relative z-10" />
                  </div>
                  
                  {/* Liquid Bubble Effects */}
                  {isClient && (
                    <>
                      {/* Floating bubble particles */}
                      {[...Array(3)].map((_, bubbleIndex) => (
                        <motion.div
                          key={bubbleIndex}
                          className="absolute w-3 h-3 bg-blue-400/40 rounded-full"
                          style={{
                            left: `${20 + bubbleIndex * 20}%`,
                            top: `${30 + bubbleIndex * 15}%`,
                          }}
                          animate={{
                            y: [-20, -40, -20],
                            x: [0, 10, -5, 0],
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + bubbleIndex * 0.5,
                            repeat: Infinity,
                            delay: index * 0.2 + bubbleIndex * 0.3,
                          }}
                        />
                      ))}
                      {/* Liquid ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/60"
                        animate={{
                          scale: [1, 2.5, 1],
                          opacity: [0.8, 0, 0.8],
                          borderWidth: [2, 0, 2],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: index * 0.4,
                        }}
                      />
                      {/* Breathing glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                        animate={{
                          scale: [1, 1.6, 1],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.3 + 0.8,
                        }}
                      />
                    </>
                  )}
                  
                  {/* Enhanced Year Badge */}
                  <motion.div
                    className="absolute -right-3 -top-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <FiCalendar className="w-3 h-3 inline mr-1" />
                    {education.year}
                  </motion.div>
                  
                  {/* Flowing Liquid Connection */}
                  <motion.div
                    className="absolute left-8 top-8 w-12 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent education-connection rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                  >
                    {/* Liquid flow effect */}
                    <motion.div
                      className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white/60 to-cyan-400/80 rounded-full"
                      animate={{
                        x: [-32, 48, -32],
                        scaleX: [0.5, 1.2, 0.5],
                        opacity: [0.4, 0.9, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Droplet formation */}
                    <motion.div
                      className="absolute top-1/2 right-0 w-2 h-2 bg-blue-400 rounded-full -translate-y-1/2"
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, 8, 16],
                        y: [0, -4, 8],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4 + 1
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced Content Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  x: 15,
                  rotateY: 2,
                  z: 50
                }}
                className="ml-8 flex-1 education-timeline-card"
                style={{ transformPerspective: '1000px' }}
              >
                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden group">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-1">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern id={`educationPattern${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M0,20 Q20,10 40,20 T80,20" stroke="#3b82f6" strokeWidth="0.2" fill="none" opacity="0.3" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#educationPattern${index})`} />
                    </svg>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        {education.degree}
                      </h3>
                      <p className="text-blue-400 text-lg font-semibold">{education.institution}</p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-gray-300 font-medium">{education.year}</p>
                      <p className="text-purple-400 font-semibold">{education.status}</p>
                    </div>
                  </div>
                  
                  {/* GPA Badge */}
                  {education.gpa && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <FiAward className="w-4 h-4" />
                        GPA: {education.gpa}
                      </span>
                    </div>
                  )}
                  
                  {/* Description */}
                  {education.description && (
                    <p className="text-gray-100 leading-relaxed mb-6 text-base">{education.description}</p>
                  )}
                  
                  {/* Achievements */}
                  {education.achievements && education.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <FiAward className="w-4 h-4 text-yellow-400" />
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {education.achievements?.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.6 }}
                            className="flex items-start gap-3 text-gray-100 text-sm"
                          >
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Skills */}
                  {education.skills && education.skills.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <FiCode className="w-4 h-4 text-green-400" />
                        Skills Gained:
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {education.skills?.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + skillIndex * 0.1 + 0.8 }}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationTimeline;

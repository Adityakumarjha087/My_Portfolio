'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar, FiBriefcase, FiTrendingUp, FiCode, FiZap, FiTarget, FiUsers } from 'react-icons/fi';
import { useIsClient } from '../../hooks/useIsClient';
import dynamic from 'next/dynamic';

// Dynamic imports for performance
const ThreeBackground = dynamic(() => import('../backgrounds/ThreeBackground'), {
  ssr: false,
  loading: () => null
});

const ExperienceTimeline = dynamic(() => import('./ExperienceTimeline'), {
  ssr: false,
  loading: () => null
});



if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    role: 'SDE Intern – Frontend',
    company: 'Celebal Technologies',
    duration: 'Jun 2025 - Aug 2025',
    location: 'Remote',
    type: 'internship',
    description: 'Working on frontend development using modern web technologies to build scalable and performant user interfaces.',
    achievements: [
      'Built a Q&A web platform similar to Quora with live search and filter features, increasing daily active users by 25%.',
      'Improved performance by applying React Context API and code splitting, raising Lighthouse scores from 65 to 92.',
      'Collaborated with cross-functional teams to deliver high-quality features on tight deadlines.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS']
  },
  {
    role: 'Technical Research Intern',
    company: 'The Moronss',
    duration: 'Nov 2023 - Mar 2024',
    location: 'Remote',
    type: 'internship',
    description: 'Conducted technical research and development with a focus on software security and automation.',
    achievements: [
      'Fixed 3+ critical software vulnerabilities after security audit, lowering incident reports by 60%.',
      'Built a LinkedIn-based scraper using Puppeteer and API automation, resulting in 50+ high-quality B2B leads.',
      'Performed static analysis and documentation of legacy binaries to map undocumented features and identify risks.',
      'Developed automated testing scripts that reduced manual testing time by 40%.'
    ],
    technologies: ['Python', 'Puppeteer', 'Security Auditing', 'API Development', 'Automation']
  }
];

function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isClient = useIsClient();
  const [titleChars, setTitleChars] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isClient) return;

    // Set title characters for animation only on client
    const title = 'Experience';
    setTitleChars(title.split(''));

    // Advanced timeline path animation with GSAP
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
          gsap.to('.timeline-path', {
            filter: `drop-shadow(0 0 ${15 + progress * 25}px rgba(16, 185, 129, ${0.4 + progress * 0.5}))`,
            duration: 0.2
          });
        }
      });

      // Animate timeline connection lines with wave effect
      gsap.fromTo('.experience-timeline-connection',
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
      gsap.fromTo('.experience-timeline-node', 
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
      gsap.fromTo('.experience-card',
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

    // Animate network connections
    gsap.to('.network-line', {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.3,
      ease: 'power2.out',
      delay: 1
    });

    // Floating career stats animation - wait for elements to exist
    const checkForStats = () => {
      const statsElements = document.querySelectorAll('.floating-career-stat');
      if (statsElements.length > 0) {
        gsap.to('.floating-career-stat', {
          y: -12,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          stagger: 0.4
        });
      } else {
        // Retry after a short delay
        setTimeout(checkForStats, 100);
      }
    };
    
    // Delay initial check to ensure DOM is ready
    setTimeout(checkForStats, 500);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !titleRef.current || titleChars.length === 0) return;

    const titleElement = titleRef.current;
    
    // Animate each character
    gsap.to(titleElement.children, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      delay: 0.5
    });
  }, [isClient, titleChars]);

  const icons = [FiBriefcase, FiTrendingUp, FiCode, FiZap];

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* 3D Background */}
      {isClient && (
        <ThreeBackground 
          className="opacity-30"
          particleCount={500}
          color="#10b981"
          background="#000000"
        />
      )}
      
      {/* Network Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="network" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="1" fill="#10b981"/>
              <circle cx="5" cy="5" r="0.5" fill="#3b82f6"/>
              <circle cx="20" cy="8" r="0.5" fill="#8b5cf6"/>
              <path d="M12.5,12.5 L5,5 M12.5,12.5 L20,8" stroke="#10b981" strokeWidth="0.3" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)"/>
        </svg>
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-16">
            <motion.h2 
              ref={titleRef}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
            >
              {isClient && titleChars.length > 0 ? (
                titleChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + (index * 0.03),
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))
              ) : (
                'Experience'
              )}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              My professional journey building innovative solutions
            </motion.p>
          </div>

          {/* Enhanced Timeline Component */}
          {isClient && <ExperienceTimeline experiences={experiences} />}

          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: "100%", label: "Project Success Rate", color: "from-emerald-400 to-teal-400" },
              { number: "50+", label: "Code Reviews", color: "from-blue-400 to-cyan-400" },
              { number: "25%", label: "Performance Boost", color: "from-purple-400 to-pink-400" },
              { number: "60%", label: "Bug Reduction", color: "from-orange-400 to-red-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                  <motion.div 
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

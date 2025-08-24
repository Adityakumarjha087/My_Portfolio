'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiAward, FiBook, FiCode, FiCpu } from 'react-icons/fi';
import { educationData } from '../ui/EducationData';
import { useIsClient } from '../../hooks/useIsClient';
import dynamic from 'next/dynamic';

// Dynamic import for performance
const EducationTimeline = dynamic(() => import('./EducationTimeline'), {
  ssr: false,
  loading: () => null
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Education = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isClient = useIsClient();
  const [titleChars, setTitleChars] = useState<string[]>([]);

  useEffect(() => {
    if (!isClient) return;

    // Set title characters for animation
    const title = 'Education';
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
          
          // Animate path drawing
          gsap.to(path, {
            strokeDashoffset: pathLength * (1 - progress),
            duration: 0.3,
            ease: 'none'
          });
          
          // Add pulsing effect to active section
          gsap.to('.timeline-path', {
            filter: `drop-shadow(0 0 ${10 + progress * 20}px rgba(59, 130, 246, ${0.3 + progress * 0.4}))`,
            duration: 0.2
          });
        }
      });

      // Animate timeline connection lines with wave effect
      gsap.fromTo('.timeline-connection',
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
      gsap.fromTo('.timeline-node', 
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
      gsap.fromTo('.education-card',
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

  useEffect(() => {
    if (!isClient || !titleRef.current || titleChars.length === 0) return;

    // Character-by-character title animation
    gsap.fromTo(titleRef.current.children,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        delay: 0.5
      }
    );
  }, [isClient, titleChars]);


  return (
    <section id="education" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Circuit Board Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-5" viewBox="0 0 100 100">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#3b82f6"/>
              <circle cx="18" cy="18" r="1" fill="#8b5cf6"/>
              <path d="M2,2 L18,2 L18,18" stroke="#3b82f6" strokeWidth="0.5" fill="none"/>
              <path d="M2,18 L2,2" stroke="#8b5cf6" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
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
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Education
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              My learning journey through technology and innovation
            </motion.p>
          </div>

          {/* Enhanced Timeline Component */}
          {isClient && <EducationTimeline educationData={educationData} />}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

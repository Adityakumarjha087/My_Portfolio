'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface Skill {
  name: string;
  level: number;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const particleSystemRef = useRef<{
    particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }>;
    animationId: number | null;
  }>({ particles: [], animationId: null });

  const animateSkill = useCallback(() => {
    if (!progressRef.current) return;

    // Animate progress bar with enhanced effects
    gsap.fromTo(progressRef.current,
      { width: '0%', opacity: 0 },
      {
        width: `${skill.level}%`,
        opacity: 1,
        duration: 2,
        ease: 'elastic.out(1, 0.3)',
        delay: index * 0.15
      }
    );

    // Add glow effect during animation
    gsap.to(cardRef.current, {
      boxShadow: `0 0 30px rgba(34, 197, 94, ${skill.level / 200})`,
      duration: 0.5,
      delay: index * 0.15 + 1,
      yoyo: true,
      repeat: 1
    });
  }, [skill.level, index]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateSkill();
        }
      },
      { threshold: 0.3 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => observer.disconnect();
  }, [isVisible, animateSkill]);

  const initParticleSystem = useCallback(() => {
    if (!particleRef.current) return;

    const canvas = particleRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createParticle = (index: number = 0) => ({
      x: ((index * 37) % canvas.width),
      y: ((index * 23) % canvas.height),
      vx: (((index * 7) % 100) / 50 - 1) * 2,
      vy: (((index * 11) % 100) / 50 - 1) * 2,
      life: 0,
      maxLife: ((index * 13) % 100) + 50
    });

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      particleSystemRef.current.particles.push(createParticle(i));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particleSystemRef.current.particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Calculate opacity based on life
        const opacity = Math.max(0, 1 - (particle.life / particle.maxLife));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity * (isHovered ? 0.8 : 0.3)})`;
        ctx.fill();
        
        // Reset particle if it's dead
        if (particle.life >= particle.maxLife) {
          particleSystemRef.current.particles[index] = createParticle(index + Date.now());
        }
      });
      
      particleSystemRef.current.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  useEffect(() => {
    if (isVisible) {
      initParticleSystem();
    }
    
    return () => {
      const currentParticleSystem = particleSystemRef.current;
      if (currentParticleSystem.animationId) {
        cancelAnimationFrame(currentParticleSystem.animationId);
      }
    };
  }, [isVisible, initParticleSystem]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="skill-card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/70 transition-all duration-500 overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={particleRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Skill Header */}
      <div className="relative z-10 flex justify-between items-center mb-4">
        <motion.h4 
          className="text-white font-semibold text-base group-hover:text-green-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {skill.name}
        </motion.h4>
        <motion.span 
          className="text-green-400 text-sm font-bold px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="relative z-10 w-full h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-600/10 rounded-full" />
        
        {/* Main progress bar */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500 rounded-full shadow-lg"
          style={{ width: '0%' }}
        />
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 animate-pulse" />
        
        {/* Progress indicator dots */}
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <div className="w-1 h-1 bg-white rounded-full opacity-80 animate-ping" />
        </div>
      </div>
      
      {/* Skill Level Indicator */}
      <div className="relative z-10 mt-3 flex justify-between items-center text-xs">
        <span className="text-gray-400">Proficiency</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < Math.floor(skill.level / 20) 
                  ? 'bg-green-500' 
                  : 'bg-gray-600'
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.8 + i * 0.1,
                type: "spring"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl" />
      </div>
    </motion.div>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { skillCategories } from '../ui/SkillsData';
import { FiCode, FiLayers, FiDatabase, FiCloud, FiTool, FiCpu } from 'react-icons/fi';

interface SkillCardProps {
  category: string;
  skills: { name: string; level: number }[];
  icon: React.ElementType;
  index: number;
  gradient: string;
}

const SkillCard = ({ category, skills, icon: Icon, index, gradient }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: gradient,
            filter: "blur(20px)"
          }}
        />
        
        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${gradient.split(',')[0].split('(')[1]}, transparent)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude"
          }}
        />
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mr-4 border border-white/20"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {category}
          </h3>
        </div>
        
        {/* Skills */}
        <div className="space-y-4">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: (index * 0.15) + (skillIndex * 0.1) + 0.3
              }}
              className="relative"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">{skill.name}</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: (index * 0.15) + (skillIndex * 0.1) + 0.5 }}
                  className="text-sm text-gray-400 font-mono"
                >
                  {skill.level}%
                </motion.span>
              </div>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: (index * 0.15) + (skillIndex * 0.1) + 0.4,
                    ease: "easeOut"
                  }}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: gradient
                  }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: isHovered ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    transform: 'skewX(-20deg)',
                    width: '50%'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, ((i * 37) % 100 - 50)],
                  y: [0, ((i * 73) % 100 - 50)]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${(i * 23) % 100}%`,
                  top: `${(i * 41) % 100}%`
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const controls = useAnimation();
  
  const categoryIcons = {
    'Languages': FiCode,
    'Frontend': FiLayers,
    'Backend': FiCpu,
    'Databases': FiDatabase,
    'Cloud & DevOps': FiCloud,
    'Tools & Others': FiTool
  };
  
  const categoryGradients = {
    'Languages': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Frontend': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'Backend': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Databases': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'Cloud & DevOps': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'Tools & Others': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="skills" className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: (i % 3) * 0.7
            }}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: isInView ? ['0%', '100%', '0%'] : '0%'
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Tech Stack
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Technologies I work with to bring ideas to life
            </motion.p>
          </motion.div>
          
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.category}
                category={category.category}
                skills={category.skills}
                icon={categoryIcons[category.category as keyof typeof categoryIcons]}
                index={index}
                gradient={categoryGradients[category.category as keyof typeof categoryGradients]}
              />
            ))}
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "20+", label: "Technologies", color: "from-blue-400 to-cyan-400" },
                { number: "3+", label: "Years Experience", color: "from-purple-400 to-pink-400" },
                { number: "∞", label: "Learning", color: "from-green-400 to-teal-400" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + (index * 0.2),
                    type: "spring",
                    stiffness: 200
                  }}
                  className="relative group"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 group-hover:border-gray-600/50 transition-all duration-300">
                    <motion.div
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

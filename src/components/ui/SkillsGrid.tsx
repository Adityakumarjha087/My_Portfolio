'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { SkillCard } from './SkillCard';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsGridProps {
  skillCategories: SkillCategory[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const SkillsGrid = ({ skillCategories, selectedCategory, onCategorySelect }: SkillsGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const connectionRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const filteredSkills = selectedCategory === 'All' 
    ? skillCategories.flatMap(cat => cat.skills.map(skill => ({ ...skill, category: cat.category })))
    : skillCategories.find(cat => cat.category === selectedCategory)?.skills || [];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Animate grid layout changes only on client
    if (isClient && gridRef.current) {
      // Dynamic import GSAP only on client
      const loadGSAP = async () => {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        gsap.fromTo(gridRef.current!.children, 
          { opacity: 0, scale: 0.8, y: 20 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "back.out(1.7)"
          }
        );
      };
      
      loadGSAP();
    }
  }, [isClient, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Enhanced Category Filter */}
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', ...skillCategories.map(cat => cat.category)].map((category, index) => (
            <motion.button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`relative px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 backdrop-blur-sm overflow-hidden group ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-2xl border border-green-400/50'
                  : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 border border-gray-600/50 hover:border-green-500/30'
              }`}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
              
              {/* Button content */}
              <span className="relative z-10">{category}</span>
              
              {/* Active indicator */}
              {selectedCategory === category && (
                <motion.div
                  className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full"
                  layoutId="activeIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ x: '-50%', y: '50%' }}
                />
              )}
              
              {/* Particle effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* Connection lines between categories */}
        <svg 
          ref={connectionRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          style={{ zIndex: -1 }}
        >
          {/* Dynamic connection lines would be drawn here */}
        </svg>
      </div>

      {/* Enhanced Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCategory === 'All' 
            ? skillCategories.map((category, categoryIndex) => (
                <motion.div 
                  key={category.category} 
                  className="space-y-6 relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="relative">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-6 text-center relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="relative z-10">{category.category}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-600/20 rounded-lg blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.h3>
                    
                    {/* Category decoration */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-0.5 bg-gradient-to-r from-green-500 to-blue-600 opacity-50" />
                  </div>
                  
                  {/* Skills in category */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillCard
                        key={`${category.category}-${skill.name}`}
                        skill={skill}
                        index={categoryIndex * 10 + skillIndex}
                      />
                    ))}
                  </div>
                  
                  {/* Category connection lines */}
                  <div className="absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-green-500/30 to-transparent hidden lg:block" />
                </motion.div>
              ))
            : filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <SkillCard
                    skill={skill}
                    index={index}
                  />
                </motion.div>
              ))
          }
        </motion.div>
      </AnimatePresence>
      
      {/* Skill connections visualization */}
      <div className="relative mt-12">
        <div className="text-center mb-8">
          <motion.h4 
            className="text-lg font-semibold text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Interactive Skill Network
          </motion.h4>
          <div className="w-24 h-0.5 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
};

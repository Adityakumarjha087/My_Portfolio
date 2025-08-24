'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface ProjectsFilterProps {
  filter: 'all' | 'fullstack' | 'ui';
  onFilterChange: (filter: 'all' | 'fullstack' | 'ui') => void;
}

export const ProjectsFilter = ({ filter, onFilterChange }: ProjectsFilterProps) => {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterRef.current) return;

    // Animate filter buttons entrance
    gsap.fromTo(filterRef.current.children, 
      { opacity: 0, y: 20, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );
  }, []);

  const handleFilterClick = (newFilter: 'all' | 'fullstack' | 'ui') => {
    onFilterChange(newFilter);
    
    // Add click animation
    gsap.to(`.filter-${newFilter}`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <div ref={filterRef} className="flex flex-wrap justify-center gap-4 mb-12">
      {[
        { key: 'all', label: 'All Projects' },
        { key: 'fullstack', label: 'Full Stack' },
        { key: 'ui', label: 'UI/UX' }
      ].map(({ key, label }) => (
        <motion.button
          key={key}
          className={`filter-${key} px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            filter === key
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700'
          }`}
          onClick={() => handleFilterClick(key as 'all' | 'fullstack' | 'ui')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
};

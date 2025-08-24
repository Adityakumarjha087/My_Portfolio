'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ProjectCard } from './ProjectCard';
import { Project } from './ProjectsData';

interface ProjectsGridProps {
  projects: Project[];
  filter: 'all' | 'fullstack' | 'ui';
}

export const ProjectsGrid = ({ projects, filter }: ProjectsGridProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.type === filter);

  useEffect(() => {
    if (!gridRef.current) return;

    // Animate grid container
    gsap.fromTo(gridRef.current,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }, [filteredProjects]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <ProjectCard
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={setHoveredProject}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

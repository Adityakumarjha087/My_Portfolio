'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from './ProjectsData';

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

export const ProjectCard = ({ project, index, isHovered, onHover }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const cardElement = cardRef.current;

    // Initial card animation
    gsap.fromTo(cardElement,
      { opacity: 0, y: 50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)"
      }
    );
  }, [index]);

  const handleHover = (hovering: boolean) => {
    onHover(hovering ? project.id : null);
    
    if (!cardRef.current) return;
    
    const cardElement = cardRef.current;
    
    if (hovering) {
      gsap.to(cardElement, {
        y: -10,
        scale: 1.02,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardElement, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{ perspective: '1000px' }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={192}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onLoad={() => {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Floating tech icons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-sm"
            >
              {tech.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300"
            >
              {tech.icon}
              {tech.name}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            Code
          </motion.a>
          
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt />
            Live Demo
          </motion.a>
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
    </motion.div>
  );
};

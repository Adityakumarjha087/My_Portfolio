'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectsTitle } from '../ui/ProjectsTitle';
import { ProjectsFilter } from '../ui/ProjectsFilter';
import { ProjectsGrid } from '../ui/ProjectsGrid';
import { ProjectsGithubButton } from '../ui/ProjectsGithubButton';
import { projectsData } from '../ui/ProjectsData';

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'ui'>('all');

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-purple-900/20" />
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <ProjectsTitle />
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <ProjectsFilter filter={filter} onFilterChange={setFilter} />
            <ProjectsGithubButton />
          </div>
          
          <ProjectsGrid projects={projectsData} filter={filter} />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiRedux } from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import React from 'react';

export type Project = {
  id: number;
  title: string;
  description: string;
  details: string;
  technologies: { name: string; icon: React.ReactNode }[];
  github: string;
  live: string;
  type: 'fullstack' | 'ui';
  image: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Website - Flax Seven',
    description: 'Internship project for Celebal Technologies - React-based e-commerce platform',
    details: 'This repository contains weekly assignments for my internship at Celebal Technologies, focusing on React development. Built a comprehensive e-commerce website with modern UI/UX, product catalog, shopping cart functionality, and responsive design patterns.',
    technologies: [
      { name: 'React', icon: <FaReact className="text-blue-500" /> },
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express', icon: <SiExpress className="text-gray-400" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> }
    ],
    github: 'https://github.com/Adityakumarjha087/E-Commerce-Website',
    live: 'https://e-commerce-website-flax-seven.vercel.app',
    type: 'fullstack',
    image: '/images/projects/project1.jpg'
  },
  {
    id: 2,
    title: 'Quora Clone - Social Q&A Platform',
    description: 'Full-stack web application inspired by Quora for questions and discussions',
    details: 'A full-stack web application inspired by Quora, where users can ask questions, provide answers, and engage in discussions. This project mimics core features of Quora to help developers learn how to implement essential features like user authentication, real-time updates, and responsive UI in a social platform.',
    technologies: [
      { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'Zustand', icon: <SiRedux className="text-purple-500" /> },
      { name: 'Framer Motion', icon: <TbBrandFramerMotion className="text-pink-500" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> }
    ],
    github: 'https://github.com/Adityakumarjha087/Quora_final',
    live: 'https://quora-final.vercel.app',
    type: 'fullstack',
    image: '/images/projects/project2.jpg'
  },
  {
    id: 3,
    title: 'HackXniet3.0 - Hackathon Website',
    description: 'Official website for HackXniet3.0 hackathon event',
    details: 'Developed the official website for HackXniet3.0 hackathon, featuring event information, registration system, sponsor showcases, and participant resources. Built with modern web technologies to provide an engaging user experience for hackathon participants and organizers.',
    technologies: [
      { name: 'React', icon: <FaReact className="text-blue-500" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: 'Framer Motion', icon: <TbBrandFramerMotion className="text-pink-500" /> }
    ],
    github: 'https://github.com/Adityakumarjha087/hackxniet3.0',
    live: 'https://hackxniet3-0.vercel.app',
    type: 'ui',
    image: '/images/projects/project3.jpg'
  }
];

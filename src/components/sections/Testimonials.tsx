'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useIsClient } from '../../hooks/useIsClient';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Shikhar Singh',
    role: 'Cloud | DevOps | GenAI | MERN Stack | Google Cloud Facilitator',
    content: 'I had the pleasure of working with Aditya Jha as a Co-Facilitator under my guidance. His dedication, reliability, and positive attitude were truly commendable. He consistently supported the team with enthusiasm and professionalism. Thank you, Aditya, for your valuable contribution—it was genuinely appreciated!',
    image: '/images/mypic/shikhar.jpeg'
  },
  {
    name: 'Tanuj Upadhyay',
    role: 'Product Thinker || Harvard Delegate @HPAIR || Entrepreneur || Data Science Apprentice',
    content: 'It\'s been a pleasure working with Aditya during his time at The Moronss. He brought incredible energy and commitment to the team from day one. Whether it was diving deep into research, building meaningful connections, or taking initiative on tasks, Aditya consistently showed a strong sense of responsibility and drive.',
    image: '/images/mypic/tanuj.jpeg'
  },
  {
    name: 'Pranav Garg',
    role: 'Entrepreneur || Building The Moronss (Stealth Mode) || Operations Manager @The Moronss',
    content: 'I had the Pleasure of working with Aditya Jha at The Moronss, where he contributed to both content generation and operational management. He is proactive, reliable and brings creativity and structure to every task. His dedication and team spirit made a strong impact, and I\'m confident he\'ll excel in any role he takes on.',
    image: '/images/mypic/pranav.jpeg'
  },
  {
    name: 'Anushka Trivedi',
    role: 'Harvard Delegate @HPAIR || Former Director @HustlersFellowship',
    content: 'Aditya has been a fantastic addition to The Moronss team. His dedication, sharp research skills and ability to connect with people made a real time impact. He\'s proactive, insightful and great to work with.',
    image: '/images/mypic/anushka.jpeg'
  }
];

const TestimonialAvatar = ({ name, image }: { name: string; image: string }) => {
  const [imageError, setImageError] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg overflow-hidden">
      {!imageError ? (
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-sm">{initials}</span>
      )}
    </div>
  );
};

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isClient = useIsClient();
  const [particles, setParticles] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    if (!isClient) return;
    
    // Generate consistent particle positions only on client
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      left: (i * 23) % 100,
      top: (i * 37) % 100
    })));
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !titleRef.current) return;

    // Dynamic import animations only on client
    const loadAnimations = async () => {
      const gsapModule = await import('gsap');
      const animeModule = await import('animejs');
      const gsap = gsapModule.default;
      const anime = animeModule.default;

      // Character-by-character title animation
      const titleText = titleRef.current?.textContent || '';
      if (titleRef.current) {
        titleRef.current.innerHTML = '';
        
        titleText.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.transform = 'translateY(30px) rotateX(-90deg)';
          titleRef.current?.appendChild(span);
        });

        // Animate each character
        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          delay: 0.3
        });
      }

      // Floating testimonial particles
      anime({
        targets: '.testimonial-particle',
        translateY: [0, -40, 0],
        translateX: () => anime.random(-30, 30),
        scale: [0.8, 1.2, 0.8],
        opacity: [0.2, 0.6, 0.2],
        duration: 6000,
        delay: anime.stagger(300),
        loop: true,
        easing: 'easeInOutSine'
      });
    };

    loadAnimations();
  }, [isClient]);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-20 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Floating particles - Only render on client */}
      {isClient && particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="testimonial-particle absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          {/* Animated Title */}
          <div className="text-center mb-16">
            <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Professional Testimonials
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
              What colleagues and mentors say about working with me
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* LinkedIn-style card */}
                <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* LinkedIn quote icon */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>

                    {/* Profile section */}
                    <div className="flex items-center mb-6">
                      <div className="relative mr-4">
                        <TestimonialAvatar name={testimonial.name} image={testimonial.image} />
                        {/* LinkedIn badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-gray-900">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <div className="relative">
                      <p className="text-gray-300 leading-relaxed text-base italic">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                    </div>

                    {/* LinkedIn-style reaction */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-gray-900">
                            👍
                          </div>
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-gray-900">
                            ❤️
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">LinkedIn Recommendation</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        Verified Professional
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

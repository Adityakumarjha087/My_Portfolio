import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import anime, { AnimeInstance } from 'animejs';
import { FiAward, FiCode, FiCpu, FiShield, FiZap, FiDatabase } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Dynamic import for ThreeBackground
const ThreeBackground = dynamic(() => import('../backgrounds/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/20" />
});

const skills = [
  { name: 'Full Stack Development', icon: <FiCode className="w-6 h-6 mx-auto mb-2 text-blue-500" />, level: 90 },
  { name: 'Problem Solving', icon: <FiCpu className="w-6 h-6 mx-auto mb-2 text-purple-500" />, level: 85 },
  { name: 'Web Security', icon: <FiShield className="w-6 h-6 mx-auto mb-2 text-green-500" />, level: 75 },
  { name: 'Performance', icon: <FiZap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />, level: 80 },
  { name: 'DSA', icon: <FiAward className="w-6 h-6 mx-auto mb-2 text-red-500" />, level: 88 },
  { name: 'Database Design', icon: <FiDatabase className="w-6 h-6 mx-auto mb-2 text-indigo-500" />, level: 82 },
];


const stats = [
  { label: 'LeetCode Problems', value: 100, suffix: '+' },
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Years Experience', value: 2, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' }
];

export const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  // Animated counter for stats
  const animateCounter = (finalValue: number, index: number) => {
    anime({
      targets: { value: 0 },
      value: finalValue,
      duration: 2000,
      easing: 'easeOutExpo',
      update: function(anim: AnimeInstance) {
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.round(Number(anim.animations[0].currentValue));
          return newStats;
        });
      }
    });
  };

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          stats.forEach((stat, index) => {
            setTimeout(() => animateCounter(stat.value, index), index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    // Anime.js animations
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    // Title animation
    tl.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
    });

    // Profile picture animation
    tl.add({
      targets: profileRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [10, 0],
      duration: 1000,
    }, '-=600');

    // Skills animation
    tl.add({
      targets: '.skill-card',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 600,
    }, '-=400');

    // Text content animation
    tl.add({
      targets: '.text-line',
      opacity: [0, 1],
      translateX: [50, 0],
      delay: anime.stagger(200),
      duration: 800,
    }, '-=200');

    // Floating animation for profile picture
    anime({
      targets: profileRef.current,
      translateY: [-10, 10],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // Enhanced skill cards and tech stack animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card,
          scale: 1.02,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    // Animate progress bars
    setTimeout(() => {
      skills.forEach((skill, index) => {
        const progressBar = document.querySelector(`.skill-card:nth-child(${index + 1}) .bg-gradient-to-r`);
        if (progressBar) {
          anime({
            targets: progressBar,
            width: `${skill.level}%`,
            duration: 1500,
            delay: index * 200,
            easing: 'easeOutExpo'
          });
        }
      });
    }, 1000);
  }, []);

  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      {/* Three.js Background */}
      <div className="fixed inset-0 -z-10">
        <ThreeBackground 
          className="opacity-30"
          particleCount={800}
          color="#8b5cf6"
          background="#000000"
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 text-white opacity-0"
            >
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61afef] via-[#c678dd] to-[#e06c75] animate-pulse">
                Me
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#61afef] to-[#c678dd] mx-auto rounded-full shadow-lg shadow-[#c678dd]/50"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            {/* Left Side - Profile Picture */}
            <div className="w-full md:w-2/5 flex flex-col items-center md:items-start flex-shrink-0 space-y-8">
              {/* Enhanced Creative Profile Picture */}
              <div 
                ref={profileRef}
                className="relative w-96 h-96 opacity-0"
              >
                {/* Animated Orbital Rings */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute inset-4 border border-[#61afef]/30 rounded-full"></div>
                  <div className="absolute top-2 left-2 w-2 h-2 bg-[#61afef] rounded-full animate-pulse"></div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute inset-8 border border-[#c678dd]/40 rounded-full border-dashed"></div>
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-[#c678dd] rounded-full animate-ping"></div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
                  <div className="absolute inset-12 border border-[#e06c75]/20 rounded-full"></div>
                  <div className="absolute bottom-10 left-10 w-1 h-1 bg-[#e06c75] rounded-full animate-pulse"></div>
                </div>

                {/* Dynamic Floating Particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-8 left-12 w-3 h-3 bg-[#61afef] rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                  <div className="absolute top-20 right-16 w-2 h-2 bg-[#c678dd] rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
                  <div className="absolute bottom-24 left-8 w-2.5 h-2.5 bg-[#e06c75] rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                  <div className="absolute bottom-12 right-12 w-1.5 h-1.5 bg-[#61afef] rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.2s' }}></div>
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-[#c678dd] rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}></div>
                  <div className="absolute top-1/3 right-6 w-2.5 h-2.5 bg-[#e06c75] rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.3s' }}></div>
                </div>
                
                {/* Pulsing Glow Rings */}
                <div className="absolute inset-16 animate-pulse">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#61afef]/30 to-[#c678dd]/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-[#c678dd]/20 via-transparent to-[#e06c75]/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                {/* Main profile container with enhanced effects */}
                <div className="absolute inset-20 group cursor-pointer">
                  {/* Rotating border effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#61afef] via-[#c678dd] to-[#e06c75] rounded-full animate-spin opacity-75 blur-sm" style={{ animationDuration: '8s' }}></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#e06c75] via-[#61afef] to-[#c678dd] rounded-full animate-spin opacity-50 blur-sm" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-900 shadow-2xl transform transition-all duration-700 hover:scale-110 hover:shadow-[0_0_60px_rgba(198,120,221,0.5)] bg-gradient-to-br from-gray-900 to-black">
                    <Image 
                      src="/images/mypic/adi2.jpeg" 
                      alt="Aditya Kumar Jha" 
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dynamic overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#61afef]/10 via-transparent to-[#c678dd]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Animated scan line effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-[#61afef]/30 to-transparent transform translate-y-0 group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced floating elements with more creative animations */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#61afef] to-[#c678dd] rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 rotate-45 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-700 delay-100">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-[#61afef] to-[#c678dd] animate-ping"></div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#c678dd] to-[#e06c75] rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 rotate-45 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-700 delay-200">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-[#c678dd] to-[#e06c75] animate-pulse"></div>
                  </div>
                  <div className="absolute top-1/2 -right-5 w-5 h-5 bg-gradient-to-r from-[#e06c75] to-[#61afef] rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 rotate-45 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-700 delay-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-[#e06c75] to-[#61afef] animate-ping"></div>
                  </div>
                  <div className="absolute top-1/4 -left-5 w-4 h-4 bg-gradient-to-r from-[#61afef] to-[#e06c75] rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 rotate-45 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-700 delay-400">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-[#61afef] to-[#e06c75] animate-pulse"></div>
                  </div>
                </div>

                {/* Creative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-4 left-4 w-8 h-1 bg-gradient-to-r from-[#61afef] to-transparent rounded-full"></div>
                  <div className="absolute top-4 left-4 w-1 h-8 bg-gradient-to-b from-[#61afef] to-transparent rounded-full"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-4 right-4 w-8 h-1 bg-gradient-to-l from-[#c678dd] to-transparent rounded-full"></div>
                  <div className="absolute top-4 right-4 w-1 h-8 bg-gradient-to-b from-[#c678dd] to-transparent rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-4 left-4 w-8 h-1 bg-gradient-to-r from-[#e06c75] to-transparent rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-8 bg-gradient-to-t from-[#e06c75] to-transparent rounded-full"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-4 right-4 w-8 h-1 bg-gradient-to-l from-[#61afef] to-transparent rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-1 h-8 bg-gradient-to-t from-[#61afef] to-transparent rounded-full"></div>
                </div>
              </div>
              
              {/* Stats Section - Below Profile Picture */}
              <div className="w-full max-w-sm">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-[#c678dd]/50 transition-all duration-300">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#61afef] to-[#c678dd]">
                        {animatedStats[index]}{stat.suffix}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-3/5 space-y-8">
              {/* Text Content */}
              <div ref={textRef} className="space-y-8">
                <div className="text-line opacity-0">
                  <p className="text-xl leading-relaxed text-gray-300">
                    Hello! I&apos;m{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#61afef] to-[#c678dd]">
                      Aditya Kumar Jha
                    </span>
                    , a passionate Computer Science student at Noida Institute of Engineering and Technology, specializing in Full Stack Development.
                  </p>
                </div>
                
                <div className="text-line opacity-0">
                  <p className="text-lg leading-relaxed text-gray-400">
                    With hands-on experience in building scalable web applications and a strong foundation in Data Structures and Algorithms, I love solving complex problems and creating efficient solutions.
                  </p>
                </div>
              </div>
              
              {/* Enhanced Skills Grid with Progress Bars */}
              <div ref={skillsRef} className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Core Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="skill-card p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-[#c678dd]/50 transition-all duration-300 opacity-0 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            {skill.icon}
                          </div>
                          <h4 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </h4>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#61afef] to-[#c678dd] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#61afef]/0 to-[#c678dd]/0 group-hover:from-[#61afef]/5 group-hover:to-[#c678dd]/5 transition-all duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;

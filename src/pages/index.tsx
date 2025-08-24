import dynamic from 'next/dynamic';
import { Hero } from '../components/sections/Hero';
import { PageLayout } from '../components/layout/PageLayout';

// Disable SSR for LazySection to prevent hydration issues
const LazySection = dynamic(() => import('../components/ui/LazySection').then(mod => ({ default: mod.LazySection })), { 
  ssr: false,
  loading: () => <div className="py-20 bg-black animate-pulse"><div className="flex items-center justify-center"><div className="text-gray-400">Loading...</div></div></div>
});

// Ultra-aggressive lazy loading - only load when in viewport
const About = dynamic(() => import('../components/sections/About'), { ssr: false });
const Skills = dynamic(() => import('../components/sections/Skills'), { ssr: false });
const Projects = dynamic(() => import('../components/sections/Projects'), { ssr: false });
const Experience = dynamic(() => import('../components/sections/Experience'), { ssr: false });
const Education = dynamic(() => import('../components/sections/Education'), { ssr: false });
const Testimonials = dynamic(() => import('../components/sections/Testimonials'), { ssr: false });
//const Blog = dynamic(() => import('../components/sections/Blog'), { ssr: false });
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: false });

export default function Home() {
  return (
    <PageLayout>
      <section id="home">
        <Hero />
      </section>
      
      <LazySection>
        <About />
      </LazySection>
      
      <LazySection>
        <Skills />
      </LazySection>
      
      <LazySection>
        <Projects />
      </LazySection>
      
      <LazySection>
        <Experience />
      </LazySection>
      
      <LazySection>
        <Education />
      </LazySection>
      
      <LazySection>
        <Testimonials />
      </LazySection>
      
      <LazySection>
        <Contact />
      </LazySection>
    </PageLayout>
    
  );
}

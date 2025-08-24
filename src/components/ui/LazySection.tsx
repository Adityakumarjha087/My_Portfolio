'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import motion to avoid SSR issues
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { ssr: false }
);

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const LazySection = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '100px',
  fallback 
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  // Always use the provided fallback or a consistent default
  const fallbackContent = fallback || (
    <div className="py-20 bg-black animate-pulse">
      <div className="flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="min-h-[50vh]">
      {isVisible ? (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </MotionDiv>
      ) : (
        fallbackContent
      )}
    </div>
  );
};

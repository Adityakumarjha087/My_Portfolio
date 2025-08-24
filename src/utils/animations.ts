import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Will be loaded dynamically on client side
let anime: typeof import('animejs');
if (typeof window !== 'undefined') {
  import('animejs').then(module => {
    anime = module.default;
  });
}

type AnimationConfig = {
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  opacity?: number;
};

export const animateOnScroll = (
  selector: string, 
  config: AnimationConfig = {}
) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: config.y ?? 50,
      opacity: config.opacity ?? 0,
      duration: config.duration ?? 0.8,
      delay: config.delay ? config.delay * index : 0,
      ease: config.ease ?? 'power3.out'
    });
  });
};

export const animateFloatingElements = async (selector: string) => {
  // Only run on client side
  if (typeof window === 'undefined') return () => {};
  
  // Dynamically import animejs if not already loaded
  if (!anime) {
    try {
      const animeModule = await import('animejs');
      anime = animeModule.default;
    } catch (error) {
      console.error('Failed to load animejs:', error);
      return () => {};
    }
  }
  
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return () => {};
  
  const animations = Array.from(elements).map((element, index) => {
    try {
      return anime({
        targets: element,
        translateY: ['-10px', '10px'],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: index * 200, // Use deterministic delay based on index
        autoplay: true
      });
    } catch (error) {
      console.error('Error animating element:', error);
      return null;
    }
  }).filter(Boolean);

  // Return cleanup function
  return () => {
    animations.forEach(anim => {
      try {
        anim?.pause();
      } catch (e) {
        console.error('Error cleaning up animation:', e);
      }
    });
  };
};

export const staggerText = (
  selector: string,
  config: AnimationConfig = {}
) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const text = element.textContent || '';
  element.textContent = '';
  
  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre';
    element.appendChild(span);
    return span;
  });

  gsap.from(chars, {
    y: config.y ?? 100,
    opacity: config.opacity ?? 0,
    duration: config.duration ?? 1,
    stagger: {
      amount: 0.6,
      from: 'random'
    },
    ease: config.ease ?? 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    }
  });
};

import anime from 'animejs/lib/anime.es.js';

type ScrollAnimationOptions = {
  targets: string | HTMLElement | NodeListOf<Element> | ArrayLike<Element>;
  translateX?: [number | string, number | string];
  translateY?: [number | string, number | string];
  opacity?: [number, number];
  rotate?: string | number;
  scale?: [number, number];
  duration?: number;
  delay?: number | ((el: Element, i: number) => number);
  easing?: string;
  once?: boolean;
  offset?: number | string;
  threshold?: number;
  rootMargin?: string;
};

export const createScrollAnimation = (options: ScrollAnimationOptions) => {
  const {
    targets,
    translateX = [100, 0],
    translateY = [0, 0],
    opacity = [0, 1],
    rotate = 0,
    scale = [1, 1],
    duration = 1000,
    delay = 0,
    easing = 'easeOutExpo',
    once = true,
    offset = '20px',
    threshold = 0.1,
  } = options;

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the element
          anime({
            targets: entry.target,
            translateX,
            translateY,
            opacity,
            rotate,
            scale,
            duration,
            delay: typeof delay === 'function' 
              ? delay(entry.target, Array.from(entry.target.parentNode?.children || []).indexOf(entry.target))
              : delay,
            easing,
            complete: () => {
              if (once) {
                observer.unobserve(entry.target);
              }
            },
          });
        }
      });
    },
    {
      root: null,
      rootMargin: typeof offset === 'number' ? `${offset}px` : offset,
      threshold,
    }
  );

  // Observe all target elements
  const elements = typeof targets === 'string' 
    ? document.querySelectorAll(targets) 
    : Array.isArray(targets) || targets instanceof NodeList 
      ? Array.from(targets) 
      : [targets];

  elements.forEach((el) => {
    if (el) {
      // Set initial styles
      anime.set(el, {
        translateX: translateX[0],
        translateY: translateY[0],
        opacity: opacity[0],
        rotate: typeof rotate === 'number' ? `${rotate}deg` : rotate,
        scale: scale[0],
      });
      
      // Start observing
      observer.observe(el);
    }
  });

  // Return cleanup function
  return () => {
    elements.forEach((el) => {
      if (el) observer.unobserve(el);
    });
  };
};

// Predefined animations
export const fadeInUp = (selector: string, options: Partial<ScrollAnimationOptions> = {}) => {
  return createScrollAnimation({
    targets: selector,
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: (el, i) => i * 100,
    easing: 'easeOutExpo',
    ...options,
  });
};

export const fadeInLeft = (selector: string, options: Partial<ScrollAnimationOptions> = {}) => {
  return createScrollAnimation({
    targets: selector,
    translateX: [50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: (el, i) => i * 100,
    easing: 'easeOutExpo',
    ...options,
  });
};

export const fadeInRight = (selector: string, options: Partial<ScrollAnimationOptions> = {}) => {
  return createScrollAnimation({
    targets: selector,
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: (el, i) => i * 100,
    easing: 'easeOutExpo',
    ...options,
  });
};

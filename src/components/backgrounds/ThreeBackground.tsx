'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  particleCount?: number;
  color?: string;
  interactive?: boolean;
  background?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  className = '',
  particleCount = 1000,
  color = '#ffffff', // eslint-disable-line @typescript-eslint/no-unused-vars
  interactive = true,
  background = '#000000',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Particle system setup
  const { geometry } = useMemo(() => {
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Position
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Color
      const v = 0.5 + Math.random() * 0.5;
      color.setRGB(v, v, v);
      color.toArray(colors, i3);
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry: particles };
  }, [particleCount]);

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 1000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Particles material
    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create particles
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Handle mouse move for interactive mode
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (scene && camera && renderer) {
        // Rotate particles
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.001;

        // Interactive effect
        if (interactive) {
          particleSystem.rotation.x += mouseRef.current.y * 0.001;
          particleSystem.rotation.y += mouseRef.current.x * 0.001;
        }

        renderer.render(scene, camera);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, interactive, background]);

  return <div ref={mountRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default ThreeBackground;

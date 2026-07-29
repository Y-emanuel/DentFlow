'use client';

/**
 * Isla cliente reveal - Animación fade-up al entrar en viewport.
 * Usa IntersectionObserver + CSS transitions (sin Framer Motion) para máximo rendimiento.
 */

import { useRef, useEffect, useState, type ReactNode, createElement } from 'react';

/** Props del componente Reveal. */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/**
 * Componente Reveal que anima fade-up al entrar en viewport.
 * Implementación liviana con IntersectionObserver y CSS transitions.
 * Sin dependencia de Framer Motion para reducir bundle size.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-80px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      },
    },
    children
  );
}
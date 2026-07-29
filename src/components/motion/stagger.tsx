'use client';

/**
 * Isla cliente stagger - Animación escalonada de hijos al entrar en viewport.
 * Usa IntersectionObserver + CSS transitions (sin Framer Motion) para máximo rendimiento.
 */

import { useRef, useEffect, useState, type ReactNode } from 'react';

/** Props del componente Stagger. */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

/**
 * Contenedor que escalona la animación de sus hijos.
 * Los hijos deben usar el componente StaggerItem.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.1,
}: StaggerProps) {
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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.3s ease ${delayChildren}s`,
      }}
    >
      {children}
    </div>
  );
}

/** Props del componente StaggerItem. */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

/**
 * Item hijo que se anima dentro de un contenedor Stagger.
 * Recibe el index desde el padre para calcular el delay escalonado.
 */
export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  return (
    <div
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'staggerFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {children}
    </div>
  );
}
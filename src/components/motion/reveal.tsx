'use client';

/**
 * Isla cliente reveal - Animación fade-up al entrar en viewport.
 * Usa Framer Motion con viewport once true para rendimiento.
 */

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/** Props del componente Reveal. */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/** Variantes de animación fade-up. */
const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Componente Reveal que anima fade-up al entrar en viewport.
 * Solo anima una vez (once: true) para optimizar rendimiento.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
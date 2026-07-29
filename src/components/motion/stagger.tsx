'use client';

/**
 * Isla cliente stagger - Animación escalonada de hijos al entrar en viewport.
 * Usa Framer Motion con viewport once true para rendimiento.
 */

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/** Props del componente Stagger. */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

/** Variantes del contenedor que escalonan a los hijos. */
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Variantes de cada hijo que se anima con fade-up. */
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Contenedor que escalona la animación de sus hijos.
 * Los hijos deben usar el componente StaggerItem.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}: StaggerProps) {
  return (
    <motion.div
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Props del componente StaggerItem. */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Item hijo que se anima dentro de un contenedor Stagger.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
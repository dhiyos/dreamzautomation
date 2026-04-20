import { useReducedMotion, type Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const stagger = (delay: number = 0.08): Variants => ({
  show: {
    transition: { staggerChildren: delay },
  },
});

export const useEntrance = () => {
  const reduce = useReducedMotion();
  if (reduce) {
    return { initial: false as const, animate: 'show' as const };
  }
  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true, amount: 0.2 },
  };
};

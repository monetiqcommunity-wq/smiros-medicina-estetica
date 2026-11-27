import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const KOWALSKI_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface BlurRevealWordProps {
  word: string;
  delay?: number;
  className?: string;
}

export function BlurRevealWord({
  word,
  delay = 0,
  className = '',
}: BlurRevealWordProps) {
  return (
    <motion.span
      initial={{ opacity: 0.01, y: 12, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.75,
        delay,
        ease: KOWALSKI_EASE,
      }}
      className={`inline-block will-change-[transform,opacity,filter] ${className}`}
    >
      {word}
    </motion.span>
  );
}

interface BlurRevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export function BlurRevealText({
  children,
  className = '',
  delay = 0,
  immediate = false,
}: BlurRevealTextProps) {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0.01, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.65,
          delay,
          ease: KOWALSKI_EASE,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 12, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.7,
        delay,
        ease: KOWALSKI_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface EditorialFadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function EditorialFadeUp({
  children,
  className = '',
  delay = 0,
}: EditorialFadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.6,
        delay,
        ease: KOWALSKI_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ClipParallaxPhotoProps {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  parallaxRange?: number;
}

export function ClipParallaxPhoto({
  children,
  className = '',
  immediate = false,
  parallaxRange = 24,
}: ClipParallaxPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxRange, parallaxRange]);

  if (immediate) {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{
            opacity: 0.75,
            scale: 1.04,
            clipPath: 'inset(6% 0% 0% 0%)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
          transition={{
            duration: 0.85,
            ease: KOWALSKI_EASE,
          }}
          style={{ y }}
          className="w-full h-full will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          opacity: 0.75,
          scale: 1.04,
          clipPath: 'inset(8% 0% 0% 0%)',
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.85,
          ease: KOWALSKI_EASE,
        }}
        style={{ y }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

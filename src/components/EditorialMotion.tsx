import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export const KOWALSKI_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MaskedBlurHeadingProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  immediate?: boolean;
  baseDelay?: number;
  wordStagger?: number;
  lineStagger?: number;
}

/**
 * Coordinates line-level vertical mask emergence with word-by-word blur-to-sharp reveal.
 * Renders immediately readable content when prefers-reduced-motion is enabled.
 */
export function MaskedBlurHeading({
  lines,
  className = '',
  lineClassName = '',
  immediate = false,
  baseDelay = 0.18,
  wordStagger = 0.055,
  lineStagger = 0.14,
}: MaskedBlurHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  let cumulativeWords = 0;

  return (
    <span className={className}>
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/);
        const startWordIdx = cumulativeWords;
        cumulativeWords += words.length;

        return (
          <span
            key={`${line}-${lineIdx}`}
            className={`block overflow-hidden py-[0.04em] ${lineClassName}`}
          >
            <motion.span
              initial={{ y: '38%', opacity: 0.05 }}
              {...(immediate
                ? { animate: { y: '0%', opacity: 1 } }
                : {
                    whileInView: { y: '0%', opacity: 1 },
                    viewport: { once: true, amount: 0.1 },
                  })}
              transition={{
                duration: 0.72,
                delay: baseDelay + lineIdx * lineStagger,
                ease: KOWALSKI_EASE,
              }}
              className="block"
            >
              {words.map((word, wordIdx) => (
                <motion.span
                  key={`${word}-${wordIdx}`}
                  initial={{ opacity: 0.04, filter: 'blur(9px)' }}
                  {...(immediate
                    ? { animate: { opacity: 1, filter: 'blur(0px)' } }
                    : {
                        whileInView: { opacity: 1, filter: 'blur(0px)' },
                        viewport: { once: true, amount: 0.1 },
                      })}
                  transition={{
                    duration: 0.64,
                    delay: baseDelay + (startWordIdx + wordIdx) * wordStagger,
                    ease: KOWALSKI_EASE,
                  }}
                  className="inline-block will-change-[opacity,filter]"
                >
                  {word}
                  {wordIdx < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

interface BlurTextSequenceProps {
  text: string;
  className?: string;
  immediate?: boolean;
  stagger?: number;
}

export function BlurTextSequence({
  text,
  className = '',
  immediate = false,
  stagger = 0.045,
}: BlurTextSequenceProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0.05, y: 10, filter: 'blur(8px)' }}
          {...(immediate
            ? { animate: { opacity: 1, y: 0, filter: 'blur(0px)' } }
            : {
                whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
                viewport: { once: true, amount: 0.08 },
              })}
          transition={{
            duration: 0.6,
            delay: index * stagger,
            ease: KOWALSKI_EASE,
          }}
          className="inline-block will-change-[transform,opacity,filter]"
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export function BlurFade({
  children,
  className = '',
  delay = 0,
  immediate = false,
}: BlurFadeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0.02, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.58,
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
      initial={{ opacity: 0.02, y: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.06 }}
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
  parallaxRange = 18,
}: ClipParallaxPhotoProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-parallaxRange, parallaxRange]
  );

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          opacity: 0.8,
          scale: 1.045,
          clipPath: 'inset(7% 0% 0% 0%)',
        }}
        {...(immediate
          ? {
              animate: {
                opacity: 1,
                scale: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
              },
            }
          : {
              whileInView: {
                opacity: 1,
                scale: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
              },
              viewport: { once: true, amount: 0.06 },
            })}
        transition={{
          duration: 0.82,
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

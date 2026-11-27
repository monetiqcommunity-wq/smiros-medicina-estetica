import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from 'lucide-react';
import { HERO_SLIDES, buildWhatsAppUrl } from '../data/clinicData';
import { KOWALSKI_EASE } from './EditorialMotion';

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const slideCount = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, slideCount]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Presentazione SMIROS Medicina Estetica"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full min-h-[76vh] sm:min-h-[84vh] bg-[#202322] text-[#FAFAF8] overflow-hidden flex flex-col justify-between focus:outline-none"
    >
      {/* Background photographic layer with cinematic crossfade and delicate scale */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 1.05 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: KOWALSKI_EASE },
              scale: { duration: 6.5, ease: 'easeOut' },
            }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${activeSlide.objectPosition}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured multi-stop scrim guaranteeing >= 4.5:1 legibility across all 3 slides */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#202322]/70 via-[#202322]/52 to-[#202322]/85"
        />
      </div>

      {/* Top spacer to keep centered hero visually poised */}
      <div className="relative z-10 h-10 sm:h-14" aria-hidden="true" />

      {/* Centered Monumental Typography */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 py-12 sm:py-16 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0.05, y: 10, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.65, ease: KOWALSKI_EASE }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] text-[#EAE2D8]">
              {activeSlide.kicker}
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.45rem,5.2vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.015em] text-[#FAFAF8] text-balance">
              {activeSlide.title}
            </h1>

            <p className="mt-6 mx-auto text-[15px] sm:text-[17px] leading-relaxed text-[#EAE2D8] max-w-[60ch]">
              {activeSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href={buildWhatsAppUrl(activeSlide.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#C4AD92] text-[#202322] text-sm font-semibold hover:bg-[#D2BEAA] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{activeSlide.ctaLabel}</span>
          </a>

          <a
            href="#trattamenti"
            className="inline-flex items-center px-4 py-3 text-sm font-medium text-[#FAFAF8] underline underline-offset-4 decoration-[#C4AD92] hover:text-[#EAE2D8] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8]"
          >
            Scopri i trattamenti
          </a>
        </div>
      </div>

      {/* Accessible Slider Controls Bar anchored cleanly at bottom */}
      <div className="relative z-10 w-full border-t border-[#FAFAF8]/15 bg-[#202322]/45 backdrop-blur-xs">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Labeled slide selector tabs */}
          <div
            role="tablist"
            aria-label="Seleziona diapositiva"
            className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-6"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isCurrent = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => setActiveIndex(index)}
                  className={`relative py-2 px-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8] ${
                    isCurrent
                      ? 'text-[#FAFAF8]'
                      : 'text-[#EAE2D8]/70 hover:text-[#FAFAF8]'
                  }`}
                >
                  <span>{slide.tabLabel}</span>
                  {isCurrent ? (
                    <motion.span
                      layoutId="heroSlideUnderline"
                      transition={{ duration: 0.25, ease: KOWALSKI_EASE }}
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C4AD92]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Prev / Play-Pause / Next accessible buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Diapositiva precedente"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#FAFAF8]/20 text-[#FAFAF8] hover:border-[#C4AD92] hover:text-[#C4AD92] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Riprendi scorrimento automatico' : 'Metti in pausa scorrimento automatico'}
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#FAFAF8]/20 text-[#FAFAF8] hover:border-[#C4AD92] hover:text-[#C4AD92] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8]"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Diapositiva successiva"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#FAFAF8]/20 text-[#FAFAF8] hover:border-[#C4AD92] hover:text-[#C4AD92] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF8]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

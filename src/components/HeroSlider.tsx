import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from 'lucide-react';
import { HERO_SLIDES, buildWhatsAppUrl } from '../data/clinicData';
import { BlurTextSequence, KOWALSKI_EASE } from './EditorialMotion';

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
      className="relative w-full min-h-[76vh] sm:min-h-[82vh] bg-[#1C1C1C] text-[#F8F5F0] overflow-hidden flex flex-col justify-between focus:outline-none"
    >
      {/* Immersive background photography with natural vignette & smooth crossfade */}
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
              opacity: { duration: 0.75, ease: KOWALSKI_EASE },
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

        {/* Measured contrast scrim preserving photo richness while ensuring crisp text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/72 via-[#1C1C1C]/48 to-[#1C1C1C]/86"
        />
      </div>

      <div className="relative z-10 h-6 sm:h-10" aria-hidden="true" />

      {/* Centered Editorial Title & Primary WhatsApp Action */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 py-10 sm:py-14 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0.08, y: 8, filter: 'blur(6px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -4, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.55, ease: KOWALSKI_EASE }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] text-[#E6D8C9]">
              {activeSlide.kicker}
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.4rem,5.2vw,4.65rem)] font-medium leading-[1.06] tracking-[-0.015em] text-[#F8F5F0] text-balance">
              <BlurTextSequence
                text={activeSlide.title}
                immediate
                stagger={0.035}
              />
            </h1>

            <p className="mt-5 mx-auto text-[15px] sm:text-[17px] leading-relaxed text-[#E6D8C9] max-w-[60ch]">
              {activeSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href={buildWhatsAppUrl(activeSlide.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#B39A7D] text-[#1C1C1C] text-sm font-semibold hover:bg-[#C4AD92] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{activeSlide.ctaLabel}</span>
          </a>

          <a
            href="#trattamenti"
            className="inline-flex items-center px-4 py-3 text-sm font-medium text-[#F8F5F0] underline underline-offset-4 decoration-[#B39A7D] hover:text-[#E6D8C9] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
          >
            Esplora i trattamenti
          </a>
        </div>
      </div>

      {/* Accessible Slider Controls Bar */}
      <div className="relative z-10 w-full border-t border-[#F8F5F0]/15 bg-[#1C1C1C]/50 backdrop-blur-xs">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="Seleziona schermata"
            className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6"
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
                  className={`relative py-2 px-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0] ${
                    isCurrent
                      ? 'text-[#F8F5F0]'
                      : 'text-[#E6D8C9]/70 hover:text-[#F8F5F0]'
                  }`}
                >
                  <span>{slide.tabLabel}</span>
                  {isCurrent ? (
                    <motion.span
                      layoutId="heroSlideUnderline"
                      transition={{ duration: 0.25, ease: KOWALSKI_EASE }}
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[#B39A7D]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Diapositiva precedente"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#F8F5F0]/20 text-[#F8F5F0] hover:border-[#B39A7D] hover:text-[#B39A7D] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Riprendi scorrimento automatico' : 'Metti in pausa scorrimento automatico'}
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#F8F5F0]/20 text-[#F8F5F0] hover:border-[#B39A7D] hover:text-[#B39A7D] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Diapositiva successiva"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#F8F5F0]/20 text-[#F8F5F0] hover:border-[#B39A7D] hover:text-[#B39A7D] active:scale-[0.96] transition-[border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

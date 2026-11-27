import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CLINIC_INFO, STUDIO_GALLERY } from '../data/clinicData';
import { BlurFade, ClipParallaxPhoto, KOWALSKI_EASE, MaskedBlurHeading } from './EditorialMotion';
import { ResilientImage } from './ResilientImage';

export function StudioGallerySection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const total = STUDIO_GALLERY.length;
  const activePhoto = STUDIO_GALLERY[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="studio"
      className="py-16 sm:py-22 bg-[#E6D8C9]/40 border-t border-[#E6D8C9]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#B39A7D]/45">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B6056]">
              Lo studio · {CLINIC_INFO.address}, Pescara
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.08] tracking-tight text-[#1C1C1C]">
              <MaskedBlurHeading lines={['Gli ambienti autentici di', 'SMIROS Medicina Estetica.']} />
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ambiente precedente"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#B39A7D]/60 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F8F5F0] hover:border-[#1C1C1C] active:scale-[0.96] transition-[background-color,color,border-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-[#6B6056] tabular-nums px-1">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Ambiente successivo"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#B39A7D]/60 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F8F5F0] hover:border-[#1C1C1C] active:scale-[0.96] transition-[background-color,color,border-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Dynamic Gallery Carousel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#E6D8C9] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0.25, scale: 1.03 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0.25 }}
                  transition={{ duration: 0.45, ease: KOWALSKI_EASE }}
                  className="w-full h-full"
                >
                  <ResilientImage
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    className={`w-full h-full object-cover ${activePhoto.objectPositionClass} transition-transform duration-700 ease-editorial group-hover:scale-[1.03]`}
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/35 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <BlurFade key={activePhoto.id} immediate>
              <div className="space-y-2 pb-5 border-b border-[#B39A7D]/45">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6B6056]">
                  {activePhoto.locationNote}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
                  {activePhoto.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5E544C]">
                  {activePhoto.description}
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-3 gap-3">
              {STUDIO_GALLERY.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isSelected}
                    className={`group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C] transition-opacity duration-150 ${
                      isSelected ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                    }`}
                  >
                    <ClipParallaxPhoto
                      parallaxRange={6}
                      className={`aspect-square rounded-md overflow-hidden border transition-colors duration-150 ${
                        isSelected
                          ? 'border-[#1C1C1C]'
                          : 'border-transparent group-hover:border-[#B39A7D]'
                      }`}
                    >
                      <ResilientImage
                        src={item.src}
                        alt={item.alt}
                        className={`w-full h-full object-cover ${item.objectPositionClass} transition-transform duration-500 ease-editorial group-hover:scale-[1.04]`}
                      />
                    </ClipParallaxPhoto>
                    <span className="mt-1.5 block text-[11px] font-medium text-[#1C1C1C] truncate">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs leading-relaxed text-[#6B6056]">
              Tutte le immagini mostrano esclusivamente ambienti reali dello studio
              SMIROS di Pescara.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

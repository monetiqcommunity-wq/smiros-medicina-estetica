import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_INFO, STUDIO_GALLERY } from '../data/clinicData';
import { BlurFade, BlurTextSequence, ClipParallaxPhoto, KOWALSKI_EASE } from './EditorialMotion';
import { ResilientImage } from './ResilientImage';

export function StudioGallerySection() {
  const [activePhotoId, setActivePhotoId] = useState<string>(STUDIO_GALLERY[0].id);
  const activePhoto =
    STUDIO_GALLERY.find((item) => item.id === activePhotoId) ?? STUDIO_GALLERY[0];

  return (
    <section
      id="studio"
      className="py-16 sm:py-22 bg-[#E6D8C9]/40 border-t border-[#E6D8C9]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#B39A7D]/45">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B6056]">
              Lo studio · {CLINIC_INFO.address}, Pescara
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.08] tracking-tight text-[#1C1C1C] text-balance">
              <BlurTextSequence text="Gli ambienti autentici di SMIROS Medicina Estetica." />
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-[#5E544C] max-w-md">
            Riceviamo su appuntamento in un ambiente riservato e curato nel centro
            di Pescara, progettato per assicurare tranquillità e assenza di attese.
          </p>
        </div>

        {/* Interactive Dynamic Gallery: Featured active studio room + selectable thumbnails */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0.4, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.4, ease: KOWALSKI_EASE }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#E6D8C9]"
              >
                <ResilientImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className={`w-full h-full object-cover ${activePhoto.objectPositionClass}`}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/35 via-transparent to-transparent"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <BlurFade key={activePhoto.id} immediate>
              <div className="space-y-2 pb-5 border-b border-[#B39A7D]/45">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#6B6056]">
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

            {/* Selectable thumbnails of the 3 authentic clinic spaces */}
            <div className="grid grid-cols-3 gap-3">
              {STUDIO_GALLERY.map((item) => {
                const isSelected = item.id === activePhoto.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePhotoId(item.id)}
                    aria-pressed={isSelected}
                    className={`group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C] transition-opacity duration-150 ${
                      isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
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
                        className={`w-full h-full object-cover ${item.objectPositionClass}`}
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
              Tutte le immagini presenti mostrano esclusivamente ambienti reali dello
              studio SMIROS. Eventuali ulteriori dettagli fotografici di nuove sale o
              strumentazioni potranno essere aggiunti non appena forniti dallo studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

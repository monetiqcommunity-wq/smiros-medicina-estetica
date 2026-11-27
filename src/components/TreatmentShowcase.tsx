import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import {
  TREATMENTS,
  TREATMENT_CATEGORIES,
  TreatmentCategory,
  TreatmentProtocol,
  buildWhatsAppUrl,
} from '../data/clinicData';
import {
  BlurFade,
  BlurTextSequence,
  ClipParallaxPhoto,
  KOWALSKI_EASE,
} from './EditorialMotion';
import { ResilientImage } from './ResilientImage';

interface TreatmentShowcaseProps {
  onOpenTreatment: (treatment: TreatmentProtocol) => void;
}

export function TreatmentShowcase({ onOpenTreatment }: TreatmentShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('tutti');

  const filteredTreatments =
    activeCategory === 'tutti'
      ? TREATMENTS
      : TREATMENTS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="trattamenti"
      className="py-16 sm:py-22 bg-[#E6D8C9]/40 border-t border-[#E6D8C9]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#B39A7D]/45">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B6056]">
              Trattamenti di Medicina Estetica
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.08] tracking-tight text-[#1C1C1C] text-balance">
              <BlurTextSequence text="Percorsi personalizzati per il volto e la qualità cutanea." />
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#5E544C]">
              Ogni indicazione nasce da una visita medica individuale. Seleziona un
              trattamento per leggerne la natura, le indicazioni e le modalità in studio.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filtra trattamenti per categoria"
            className="flex flex-wrap items-center gap-1.5 border-b border-[#B39A7D]/40 pb-1 self-start lg:self-end"
          >
            {TREATMENT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative min-h-10 px-3 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C] ${
                    isActive
                      ? 'text-[#1C1C1C]'
                      : 'text-[#6B6056] hover:text-[#1C1C1C]'
                  }`}
                >
                  <span>{category.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="categoryTabUnderline"
                      transition={{ duration: 0.25, ease: KOWALSKI_EASE }}
                      className="absolute inset-x-0 -bottom-[5px] h-[2px] bg-[#1C1C1C]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photographic Editorial Grid: each treatment features its own authentic image */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12">
          {filteredTreatments.map((item, index) => {
            const isFeaturedWide =
              activeCategory === 'tutti' && index < 2;
            const colSpanClass = isFeaturedWide
              ? 'lg:col-span-3'
              : 'lg:col-span-2';
            const aspectClass = isFeaturedWide
              ? 'aspect-[4/3]'
              : 'aspect-[4/4] sm:aspect-[4/3]';

            return (
              <BlurFade
                key={item.id}
                delay={index * 0.05}
                className={`${colSpanClass} flex flex-col justify-between group`}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenTreatment(item)}
                    className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1C1C]"
                  >
                    <ClipParallaxPhoto
                      parallaxRange={10}
                      className={`relative w-full ${aspectClass} rounded-md overflow-hidden bg-[#E6D8C9]`}
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.imageAlt}
                        className={`w-full h-full object-cover ${item.imageObjectPos} transition-transform duration-700 ease-editorial group-hover:scale-[1.03]`}
                      />
                    </ClipParallaxPhoto>

                    <p className="mt-4 text-xs font-medium text-[#6B6056] tabular-nums">
                      {item.categoryLabel} · {item.duration}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl sm:text-[27px] font-medium text-[#1C1C1C] group-hover:text-[#5E544C] transition-colors duration-150 leading-tight">
                      {item.title}
                    </h3>
                  </button>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#5E544C]">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#B39A7D]/40 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenTreatment(item)}
                    className="text-xs font-semibold text-[#1C1C1C] underline underline-offset-4 decoration-[#B39A7D] hover:text-[#6B6056] transition-colors duration-150 whitespace-nowrap"
                  >
                    Approfondisci il trattamento
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      `Buongiorno Dott. Smiraglia, vorrei informazioni su "${item.title}" presso SMIROS Medicina Estetica.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5E544C] hover:text-[#1C1C1C] transition-colors duration-150 whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#B39A7D]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

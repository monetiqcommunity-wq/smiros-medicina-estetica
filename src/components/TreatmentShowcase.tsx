import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import {
  TREATMENTS,
  TREATMENT_CATEGORIES,
  TreatmentCategory,
  TreatmentProtocol,
  buildWhatsAppUrl,
} from '../data/clinicData';
import { BlurRevealText, KOWALSKI_EASE } from './EditorialMotion';

interface TreatmentShowcaseProps {
  onSelectForBooking: (treatmentTitle: string) => void;
}

export function TreatmentShowcase({ onSelectForBooking }: TreatmentShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('tutti');
  const [selectedId, setSelectedId] = useState<string>(TREATMENTS[0].id);

  const filteredTreatments =
    activeCategory === 'tutti'
      ? TREATMENTS
      : TREATMENTS.filter((item) => item.category === activeCategory);

  const activeCategoryMeta =
    TREATMENT_CATEGORIES.find((c) => c.id === activeCategory) ?? TREATMENT_CATEGORIES[0];

  const activeTreatment: TreatmentProtocol =
    filteredTreatments.find((t) => t.id === selectedId) ?? filteredTreatments[0];

  const handleCategoryChange = (categoryId: TreatmentCategory) => {
    setActiveCategory(categoryId);
    const nextList =
      categoryId === 'tutti'
        ? TREATMENTS
        : TREATMENTS.filter((item) => item.category === categoryId);
    if (nextList.length > 0 && !nextList.some((t) => t.id === selectedId)) {
      setSelectedId(nextList[0].id);
    }
  };

  return (
    <section id="trattamenti" className="bg-[#EAE2D8]/45 border-t border-[#EAE2D8]">
      {/* Section 3: Aree di Trattamento & Category Switcher */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6E665E]">
              Aree di trattamento
            </p>
            <BlurRevealText>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.08] tracking-tight text-[#202322] text-balance">
                Medicina estetica del volto e rigenerazione cutanea.
              </h2>
            </BlurRevealText>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <p className="text-[15px] leading-relaxed text-[#4F4943]">
              {activeCategoryMeta.description}
            </p>

            {/* Accessible interactive category tabs with shared underline */}
            <div
              role="tablist"
              aria-label="Categorie di trattamento"
              className="flex flex-wrap items-center gap-2 border-b border-[#C4AD92]/45 pb-1"
            >
              {TREATMENT_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`relative min-h-11 px-3.5 py-2 text-xs sm:text-[13px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322] ${
                      isActive
                        ? 'text-[#202322]'
                        : 'text-[#6E665E] hover:text-[#202322]'
                    }`}
                  >
                    <span>{category.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="categoryTabUnderline"
                        transition={{ duration: 0.25, ease: KOWALSKI_EASE }}
                        className="absolute inset-x-0 -bottom-[5px] h-[2px] bg-[#202322]"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Dedicated Interactive Deep-Dive Master-Detail Showcase */}
      <div className="bg-[#FAFAF8] border-t border-[#EAE2D8]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left column: Interactive Treatment Selector List */}
            <div className="lg:col-span-5 divide-y divide-[#EAE2D8] border-t border-b border-[#EAE2D8]">
              {filteredTreatments.map((item) => {
                const isSelected = activeTreatment.id === item.id;
                return (
                  <div key={item.id} className="py-1">
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full py-5 px-3 sm:px-4 text-left flex items-center justify-between gap-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322] ${
                        isSelected
                          ? 'bg-[#EAE2D8]/45 text-[#202322]'
                          : 'hover:bg-[#EAE2D8]/25 text-[#202322]'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#6E665E] tabular-nums">
                          {item.categoryLabel} · {item.duration}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl sm:text-[26px] font-medium leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#6E665E] transition-transform duration-200 lg:-rotate-90 ${
                          isSelected ? 'rotate-180 lg:-rotate-90 text-[#202322]' : ''
                        }`}
                      />
                    </button>

                    {/* Mobile / Tablet Inline Expansion so smartphone users inspect smoothly in-place */}
                    <AnimatePresence initial={false}>
                      {isSelected ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: KOWALSKI_EASE }}
                          className="lg:hidden overflow-hidden bg-[#FAFAF8] px-3 pb-6 pt-3 space-y-5"
                        >
                          <TreatmentDetailBody
                            treatment={item}
                            onSelectForBooking={onSelectForBooking}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right column: Desktop Dedicated Clinical Deep-Dive Panel */}
            <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeTreatment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: KOWALSKI_EASE }}
                  className="border-t border-[#202322]/25 pt-8 space-y-8"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6E665E] tabular-nums">
                      Approfondimento clinico · {activeTreatment.categoryLabel} · {activeTreatment.duration}
                    </p>
                    <h3 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-[#202322] leading-tight">
                      {activeTreatment.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#4F4943]">
                      {activeTreatment.summary}
                    </p>
                  </div>

                  <TreatmentDetailBody
                    treatment={activeTreatment}
                    onSelectForBooking={onSelectForBooking}
                  />
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TreatmentDetailBodyProps {
  treatment: TreatmentProtocol;
  onSelectForBooking: (treatmentTitle: string) => void;
}

function TreatmentDetailBody({
  treatment,
  onSelectForBooking,
}: TreatmentDetailBodyProps) {
  const directWaMessage = `Buongiorno Dott. Smiraglia, vorrei richiedere informazioni sul trattamento "${treatment.title}" presso SMIROS Medicina Estetica a Pescara.`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#EAE2D8]">
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665E]">
            Obiettivo medico
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#4F4943]">
            {treatment.clinicalObjective}
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665E]">
            Come si svolge la seduta
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#4F4943]">
            {treatment.sessionProcess}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#EAE2D8]">
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665E]">
            Principali indicazioni
          </h4>
          <ul className="mt-2.5 space-y-2">
            {treatment.indications.map((ind) => (
              <li
                key={ind}
                className="text-sm text-[#4F4943] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-[#C4AD92]"
              >
                {ind}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665E]">
            Attenzioni e recupero
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#4F4943]">
            {treatment.postCareNote}
          </p>
          <p className="mt-3 text-xs font-medium text-[#6E665E] tabular-nums">
            Durata indicativa: {treatment.duration} · {treatment.recovery}
          </p>
        </div>
      </div>

      <div className="pt-5 border-t border-[#EAE2D8] flex flex-wrap items-center gap-4">
        <a
          href={buildWhatsAppUrl(directWaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#202322] text-[#FAFAF8] text-sm font-medium hover:bg-[#333735] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
        >
          <MessageCircle className="w-4 h-4 text-[#C4AD92]" />
          <span>Richiedi informazioni su WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => onSelectForBooking(treatment.title)}
          className="px-3 py-2 text-xs sm:text-sm font-medium text-[#202322] underline underline-offset-4 decoration-[#C4AD92] hover:text-[#6E665E] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
        >
          Scegli orario per questo trattamento
        </button>
      </div>
    </div>
  );
}

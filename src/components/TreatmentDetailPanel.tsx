import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import {
  CLINIC_INFO,
  TreatmentProtocol,
  buildWhatsAppUrl,
} from '../data/clinicData';
import { KOWALSKI_EASE } from './EditorialMotion';

interface TreatmentDetailPanelProps {
  treatment: TreatmentProtocol | null;
  onClose: () => void;
  onSelectForBooking: (treatmentTitle: string) => void;
}

export function TreatmentDetailPanel({
  treatment,
  onClose,
  onSelectForBooking,
}: TreatmentDetailPanelProps) {
  useEffect(() => {
    if (!treatment) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [treatment, onClose]);

  if (!treatment) return null;

  const directMessage = `Buongiorno Dott. Smiraglia, vorrei richiedere informazioni e disponibilità per "${treatment.title}" presso SMIROS Medicina Estetica a Pescara.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]/65 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-detail-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: KOWALSKI_EASE }}
        className="w-full max-w-3xl bg-[#F8F5F0] border border-[#E6D8C9] rounded-md shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          {/* Left visual column with treatment photo */}
          <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-[#E6D8C9]">
            <img
              src={treatment.image}
              alt={treatment.imageAlt}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${treatment.imageObjectPos}`}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/45 via-transparent to-transparent"
            />
            {treatment.isIllustrative ? (
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#1C1C1C]/75 text-[10px] font-medium tracking-[0.04em] text-[#F8F5F0]">
                Immagine illustrativa
              </span>
            ) : null}
          </div>

          {/* Right clinical information column */}
          <div className="md:col-span-7 flex flex-col justify-between bg-[#F8F5F0]">
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-[#E6D8C9] flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#6B6056] tabular-nums">
                  {treatment.categoryLabel} · {treatment.duration}
                </p>
                <h3
                  id="treatment-detail-title"
                  className="mt-1.5 font-display text-2xl sm:text-3xl font-medium text-[#1C1C1C] leading-tight"
                >
                  {treatment.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi approfondimento trattamento"
                className="min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#E6D8C9] text-[#6B6056] hover:text-[#1C1C1C] hover:border-[#B39A7D] active:scale-[0.97] transition-[color,border-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8 space-y-5 bg-white flex-1">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B6056]">
                  Natura del trattamento
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1C1C1C]">
                  {treatment.natureOfTreatment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6D8C9]">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B6056]">
                  Possibili indicazioni
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {treatment.possibleIndications.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[#5E544C] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-[#B39A7D]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E6D8C9]">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B6056]">
                  Svolgimento e valutazione individuale
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5E544C]">
                  {treatment.sessionProcess}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#6B6056]">
                  {treatment.medicalEvaluationNote}
                </p>
              </div>

              <div className="pt-3 text-xs text-[#6B6056] tabular-nums">
                Durata indicativa: {treatment.duration} · {treatment.recovery} · {CLINIC_INFO.city}
              </div>
            </div>

            <div className="px-6 py-4 sm:px-8 bg-[#F8F5F0] border-t border-[#E6D8C9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectForBooking(treatment.title);
                  onClose();
                }}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-[#1C1C1C] underline underline-offset-4 decoration-[#B39A7D] hover:text-[#6B6056] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Scegli orario di visita
              </button>

              <a
                href={buildWhatsAppUrl(directMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#1C1C1C] text-[#F8F5F0] text-sm font-medium hover:bg-[#332E2A] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#B39A7D]" />
                <span>Richiedi su WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { MessageCircle, Copy, Check, Phone, MapPin, Instagram } from 'lucide-react';
import {
  CLINIC_INFO,
  TREATMENTS,
  buildWhatsAppUrl,
} from '../data/clinicData';
import { BlurFade, BlurTextSequence } from './EditorialMotion';

interface WhatsAppBookingSectionProps {
  preselectedTreatment: string;
}

const TIME_SLOTS = [
  'Mattina (09:00 – 13:00)',
  'Pomeriggio (14:30 – 19:30)',
  'Qualsiasi fascia oraria',
] as const;

export function WhatsAppBookingSection({
  preselectedTreatment,
}: WhatsAppBookingSectionProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    preselectedTreatment || TREATMENTS[0].title
  );
  const [preferredSlot, setPreferredSlot] = useState<string>(TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedTreatment) {
      setSelectedTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  const treatmentOptions = [
    ...TREATMENTS.map((t) => t.title),
    'Altra richiesta / Prima valutazione medica',
  ];

  const trimmedName = patientName.trim();
  const trimmedNotes = notes.trim();

  const composedMessage = [
    `Buongiorno Dott. Smiraglia, sono ${trimmedName || '[Nome e Cognome]'}.`,
    `Vorrei richiedere un appuntamento presso SMIROS Medicina Estetica (Pescara) per: ${selectedTreatment}.`,
    `Fascia oraria preferita: ${preferredSlot}.`,
    trimmedNotes ? `Note: ${trimmedNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappHref = buildWhatsAppUrl(
    [
      trimmedName
        ? `Buongiorno Dott. Smiraglia, sono ${trimmedName}.`
        : 'Buongiorno Dott. Smiraglia,',
      `Vorrei richiedere un appuntamento presso SMIROS Medicina Estetica (Pescara) per: ${selectedTreatment}.`,
      `Fascia oraria preferita: ${preferredSlot}.`,
      trimmedNotes ? `Note: ${trimmedNotes}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  );

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (patientName.trim().length > 0 && patientName.trim().length < 2) {
      e.preventDefault();
      setNameError(
        'Inserisci almeno 2 caratteri per il nome oppure lascia il campo vuoto.'
      );
      return;
    }
    setNameError('');
  };

  return (
    <section
      id="prenotazione"
      className="py-16 sm:py-22 border-t border-[#E6D8C9] bg-[#F8F5F0]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#6B6056]">
                Contatti e Appuntamenti
              </p>
              <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.08] tracking-tight text-[#1C1C1C] text-balance">
                <BlurTextSequence text="Richiedi la tua visita su WhatsApp." />
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#5E544C]">
                Ricevo esclusivamente su appuntamento per dedicare a ogni paziente
                il tempo necessario senza attese. Prepara il messaggio WhatsApp
                indicando l’area di interesse e la fascia oraria preferita.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E6D8C9] space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B39A7D] mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-[#1C1C1C]">{CLINIC_INFO.address}</p>
                  <p className="text-xs text-[#6B6056]">{CLINIC_INFO.city}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#6B6056]">Orari di ricevimento</p>
                <p className="mt-1 text-sm font-medium text-[#1C1C1C] tabular-nums">
                  {CLINIC_INFO.hours}
                </p>
                <p className="mt-0.5 text-xs text-[#6B6056]">{CLINIC_INFO.closedDays}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1C1C1C] hover:text-[#6B6056] transition-colors duration-150 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#B39A7D]" />
                  <span>{CLINIC_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1C1C1C] hover:text-[#6B6056] transition-colors duration-150"
                >
                  <Instagram className="w-4 h-4 text-[#B39A7D]" />
                  <span>{CLINIC_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          <BlurFade delay={0.05} className="lg:col-span-7">
            <div className="border-t border-[#1C1C1C]/20 pt-6 space-y-6">
              <div>
                <label
                  htmlFor="booking-treatment"
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6056]"
                >
                  Area o trattamento di interesse
                </label>
                <select
                  id="booking-treatment"
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="mt-2.5 w-full border-b border-[#B39A7D] bg-transparent py-2.5 text-[15px] font-medium text-[#1C1C1C] focus:border-[#1C1C1C] focus:outline-none transition-colors duration-150"
                >
                  {treatmentOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#F8F5F0]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6056]">
                  Fascia oraria preferita
                </span>
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isActive = preferredSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredSlot(slot)}
                        className={`min-h-11 px-3.5 py-2.5 rounded-md text-xs font-medium border text-left sm:text-center active:scale-[0.985] transition-[background-color,border-color,color,transform] duration-150 whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C] ${
                          isActive
                            ? 'bg-[#1C1C1C] text-[#F8F5F0] border-[#1C1C1C]'
                            : 'bg-white/70 text-[#1C1C1C] border-[#E6D8C9] hover:border-[#B39A7D]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6056]"
                  >
                    Nome e cognome (opzionale)
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={patientName}
                    onChange={(e) => {
                      setPatientName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="Es. Giulia Rossi"
                    className="mt-2 w-full border-b border-[#E6D8C9] bg-transparent py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#82766B] focus:border-[#1C1C1C] focus:outline-none transition-colors duration-150"
                  />
                  {nameError ? (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {nameError}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6056]"
                  >
                    Giorni preferiti o note (opzionale)
                  </label>
                  <input
                    id="booking-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Es. Martedì o giovedì"
                    className="mt-2 w-full border-b border-[#E6D8C9] bg-transparent py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#82766B] focus:border-[#1C1C1C] focus:outline-none transition-colors duration-150"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-medium text-[#6B6056]">
                    Anteprima messaggio WhatsApp
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6056] hover:text-[#1C1C1C] active:scale-[0.97] transition-[color,transform] duration-150"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1C1C1C]" />
                        <span className="text-[#1C1C1C]">Testo copiato</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copia testo</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed text-[#1C1C1C] bg-white/80 border border-[#E6D8C9] rounded-md p-4">
                  {composedMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-[#1C1C1C] text-[#F8F5F0] text-sm font-medium hover:bg-[#332E2A] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C]"
                >
                  <MessageCircle className="w-4 h-4 text-[#B39A7D]" />
                  <span>Invia richiesta su WhatsApp</span>
                </a>
                <p className="text-xs text-[#6B6056] tabular-nums">
                  WhatsApp diretto · {CLINIC_INFO.phoneDisplay}
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

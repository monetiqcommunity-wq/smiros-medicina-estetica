import { useEffect, useState } from 'react';
import { MessageCircle, Copy, Check, Phone, MapPin, Instagram } from 'lucide-react';
import {
  CLINIC_INFO,
  TREATMENTS,
  buildWhatsAppUrl,
} from '../data/clinicData';
import { BlurRevealText, EditorialFadeUp } from './EditorialMotion';

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
    'Altra richiesta / Consulenza generale',
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
      trimmedName ? `Buongiorno Dott. Smiraglia, sono ${trimmedName}.` : 'Buongiorno Dott. Smiraglia,',
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
      className="py-24 sm:py-32 border-t border-[#EAE2D8] bg-[#FAFAF8]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left column: Clinic coordinates & direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#6E665E]">
                Contatti e Appuntamenti
              </p>
              <BlurRevealText>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.08] tracking-tight text-[#202322] text-balance">
                  Richiedi la tua visita su WhatsApp.
                </h2>
              </BlurRevealText>
              <p className="mt-5 text-[15px] leading-relaxed text-[#4F4943]">
                Ricevo esclusivamente su appuntamento per dedicarti il tempo
                necessario senza attese. Seleziona il trattamento e la fascia
                oraria per preparare il messaggio WhatsApp verso lo studio.
              </p>
            </div>

            <div className="pt-8 border-t border-[#EAE2D8] space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C4AD92] mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-[#202322]">{CLINIC_INFO.address}</p>
                  <p className="text-xs text-[#6E665E]">{CLINIC_INFO.city}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#6E665E]">Orari di studio</p>
                <p className="mt-1 text-sm font-medium text-[#202322] tabular-nums">
                  {CLINIC_INFO.hours}
                </p>
                <p className="mt-0.5 text-xs text-[#6E665E]">{CLINIC_INFO.closedDays}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#202322] hover:text-[#6E665E] transition-colors duration-150 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#C4AD92]" />
                  <span>{CLINIC_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#202322] hover:text-[#6E665E] transition-colors duration-150"
                >
                  <Instagram className="w-4 h-4 text-[#C4AD92]" />
                  <span>{CLINIC_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Hairline architectural WhatsApp request builder */}
          <EditorialFadeUp delay={0.06} className="lg:col-span-7">
            <div className="border-t border-[#202322]/25 pt-8 space-y-7">
              <div>
                <label
                  htmlFor="booking-treatment"
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E665E]"
                >
                  Area o trattamento di interesse
                </label>
                <select
                  id="booking-treatment"
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="mt-3 w-full border-b border-[#C4AD92] bg-transparent py-3 text-[15px] font-medium text-[#202322] focus:border-[#202322] focus:outline-none transition-colors duration-150"
                >
                  {treatmentOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#FAFAF8]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E665E]">
                  Fascia oraria preferita
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isActive = preferredSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredSlot(slot)}
                        className={`min-h-11 px-3.5 py-2.5 rounded-md text-xs font-medium border text-left sm:text-center active:scale-[0.985] transition-[background-color,border-color,color,transform] duration-150 whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322] ${
                          isActive
                            ? 'bg-[#202322] text-[#FAFAF8] border-[#202322]'
                            : 'bg-[#FAFAF8] text-[#202322] border-[#EAE2D8] hover:border-[#C4AD92]'
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
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E665E]"
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
                    className="mt-2.5 w-full border-b border-[#EAE2D8] bg-transparent py-2.5 text-sm text-[#202322] placeholder:text-[#6E665E]/70 focus:border-[#202322] focus:outline-none transition-colors duration-150"
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
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E665E]"
                  >
                    Giorni preferiti o note (opzionale)
                  </label>
                  <input
                    id="booking-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Es. Martedì o giovedì"
                    className="mt-2.5 w-full border-b border-[#EAE2D8] bg-transparent py-2.5 text-sm text-[#202322] placeholder:text-[#6E665E]/70 focus:border-[#202322] focus:outline-none transition-colors duration-150"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <span className="text-xs font-medium text-[#6E665E]">
                    Anteprima messaggio WhatsApp
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E665E] hover:text-[#202322] active:scale-[0.97] transition-[color,transform] duration-150"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#202322]" />
                        <span className="text-[#202322]">Testo copiato</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copia testo</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed text-[#202322] bg-[#EAE2D8]/35 border border-[#EAE2D8] rounded-md p-4">
                  {composedMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-[#202322] text-[#FAFAF8] text-sm font-medium hover:bg-[#333735] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
                >
                  <MessageCircle className="w-4 h-4 text-[#C4AD92]" />
                  <span>Invia richiesta su WhatsApp</span>
                </a>
                <p className="text-xs text-[#6E665E] tabular-nums">
                  WhatsApp diretto · {CLINIC_INFO.phoneDisplay}
                </p>
              </div>
            </div>
          </EditorialFadeUp>
        </div>
      </div>
    </section>
  );
}

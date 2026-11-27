/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ChevronDown,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import {
  CLINIC_IMAGES,
  CLINIC_INFO,
  DEFAULT_WHATSAPP_MESSAGE,
  FAQ_ITEMS,
  METHODOLOGIES,
  PHILOSOPHY_PILLARS,
  STUDIO_GALLERY,
  TREATMENTS,
  buildWhatsAppUrl,
} from './data/clinicData';
import { ResilientImage } from './components/ResilientImage';
import { HeroSlider } from './components/HeroSlider';
import { TreatmentShowcase } from './components/TreatmentShowcase';
import { WhatsAppBookingSection } from './components/WhatsAppBookingSection';
import {
  BlurRevealText,
  ClipParallaxPhoto,
  EditorialFadeUp,
  KOWALSKI_EASE,
} from './components/EditorialMotion';
import { MonetiqWatermark } from './components/MonetiqWatermark';

const NAV_ITEMS = [
  { label: 'Filosofia', href: '#filosofia' },
  { label: 'Trattamenti', href: '#trattamenti' },
  { label: 'Il Medico', href: '#medico' },
  { label: 'Metodologie', href: '#metodologie' },
  { label: 'Studio', href: '#studio' },
] as const;

export default function App() {
  const [bookingTreatment, setBookingTreatment] = useState<string>(TREATMENTS[0].title);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSelectForBooking = (treatmentTitle: string) => {
    setBookingTreatment(treatmentTitle);
    const el = document.getElementById('prenotazione');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAFAF8] text-[#202322] pb-16 md:pb-0">
        <MonetiqWatermark />

        {/* Top Bar Contract: 3 zones separated by gap-8, single-line controls */}
        <header className="sticky top-0 z-40 bg-[#FAFAF8]/92 backdrop-blur-md border-b border-[#EAE2D8]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 md:h-16 flex items-center justify-between gap-8">
            <a
              href="#"
              className="font-display text-2xl font-semibold tracking-tight text-[#202322] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
            >
              {CLINIC_INFO.brand}
            </a>

            <nav
              aria-label="Navigazione principale"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E665E]"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#202322] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline decoration-[#C4AD92]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#202322] text-[#FAFAF8] text-xs font-medium hover:bg-[#333735] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C4AD92]" />
                <span>Richiedi su WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                className="md:hidden min-w-10 min-h-10 flex items-center justify-center rounded-md border border-[#EAE2D8] bg-[#FAFAF8] text-[#202322] active:scale-[0.97] transition-transform duration-150"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen ? (
              <motion.nav
                aria-label="Menu mobile"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: KOWALSKI_EASE }}
                className="md:hidden border-t border-[#EAE2D8] bg-[#FAFAF8] px-5 py-4 flex flex-col gap-3"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 text-sm font-medium text-[#202322] hover:text-[#6E665E]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#domande"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-[#202322] hover:text-[#6E665E]"
                >
                  Domande frequenti
                </a>
                <a
                  href="#prenotazione"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#202322] text-[#FAFAF8] text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-[#C4AD92]" />
                  <span>Contatti e WhatsApp</span>
                </a>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </header>

        <main>
          {/* 1. Immersive 3-Slide Hero Section */}
          <HeroSlider />

          {/* 2. Presentazione di SMIROS e Filosofia Professionale (Light · Bianco naturale #FAFAF8) */}
          <section
            id="filosofia"
            className="py-24 sm:py-32 bg-[#FAFAF8]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6E665E]">
                    SMIROS Medicina Estetica · Pescara
                  </p>
                  <BlurRevealText>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.08] tracking-tight text-[#202322] text-balance">
                      La medicina estetica come atto clinico di ascolto e misura.
                    </h2>
                  </BlurRevealText>
                  <p className="text-[15px] leading-relaxed text-[#4F4943] max-w-[46ch]">
                    Nel mio studio medico in Corso Vittorio Emanuele II, 310 a
                    Pescara accolgo ogni paziente con un principio preciso:
                    rispettare la tua fisiologia, comprendere le tue aspettative
                    e intervenire solo dove esiste una reale indicazione clinica.
                  </p>
                </div>

                <div className="lg:col-span-7 divide-y divide-[#EAE2D8] border-t border-b border-[#EAE2D8]">
                  {PHILOSOPHY_PILLARS.map((pillar, index) => (
                    <EditorialFadeUp
                      key={pillar.title}
                      delay={index * 0.08}
                      className="py-9 sm:py-11 space-y-3"
                    >
                      <h3 className="font-display text-2xl sm:text-[28px] font-medium text-[#202322] leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#4F4943] max-w-[60ch]">
                        {pillar.description}
                      </p>
                    </EditorialFadeUp>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3 & 4. Aree di Trattamento e Approfondimenti Interattivi */}
          <TreatmentShowcase onSelectForBooking={handleSelectForBooking} />

          {/* Soft Chromatic Transition Light -> Dark */}
          <div
            aria-hidden="true"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FAFAF8] via-[#EAE2D8]/35 to-[#202322]"
          />

          {/* 5. Presentazione del Dott. Simone A. Smiraglia (Dark · Nero carbone #202322) */}
          <section
            id="medico"
            className="py-24 sm:py-32 bg-[#202322] text-[#FAFAF8]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 relative">
                  <ClipParallaxPhoto
                    parallaxRange={18}
                    className="relative aspect-[3/4] w-full"
                  >
                    <ResilientImage
                      src={CLINIC_IMAGES.doctorPortrait}
                      alt="Dott. Simone A. Smiraglia nello studio SMIROS Medicina Estetica a Pescara"
                      className="w-full h-full object-cover object-top"
                    />
                  </ClipParallaxPhoto>
                  {/* Soft gradient edge blending into #202322 */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202322] via-transparent to-[#202322]/40"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#202322] via-transparent to-[#202322]"
                  />
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#C4AD92]">
                    Il Medico · Direzione Sanitaria
                  </p>
                  <BlurRevealText>
                    <h2 className="font-display text-3xl sm:text-5xl font-medium leading-[1.06] tracking-tight text-[#FAFAF8] text-balance">
                      {CLINIC_INFO.doctorName}
                    </h2>
                  </BlurRevealText>
                  <p className="text-sm font-medium tracking-[0.01em] text-[#EAE2D8]">
                    {CLINIC_INFO.doctorCredentials}
                  </p>
                  <p className="text-[15px] sm:text-base leading-relaxed tracking-[0.01em] text-[#EAE2D8]/85 max-w-[60ch]">
                    La mia formazione in Anestesia e Rianimazione orienta ogni
                    scelta clinica in medicina estetica. Affronto ciascuna visita
                    e procedura personalmente, con attenzione rigorosa all’anatomia
                    vascolare, al comfort del paziente durante il trattamento e
                    alla chiarezza del percorso proposto.
                  </p>

                  <div className="pt-8 border-t border-[#6E665E]/40 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                      <p className="font-display text-2xl font-medium text-[#FAFAF8]">
                        Visita diretta
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#EAE2D8]/80">
                        Colloquio e trattamento eseguiti interamente dal medico
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-medium text-[#FAFAF8]">
                        Comfort analgesico
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#EAE2D8]/80">
                        Protocolli dedicati alla tollerabilità di ogni seduta
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-medium text-[#FAFAF8]">
                        Tracciabilità CE
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#EAE2D8]/80">
                        Dispositivi medici certificati con etichetta dedicata
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Soft Chromatic Transition Dark -> Light */}
          <div
            aria-hidden="true"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#202322] via-[#EAE2D8]/35 to-[#FAFAF8]"
          />

          {/* 6. Tecnologie e Metodologie Utilizzate (Light · Bianco naturale #FAFAF8) */}
          <section
            id="metodologie"
            className="py-24 sm:py-32 bg-[#FAFAF8]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6E665E]">
                      Tecnologie e metodologie
                    </p>
                    <BlurRevealText>
                      <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.08] tracking-tight text-[#202322] text-balance">
                        Strumenti certificati e protocolli medici essenziali.
                      </h2>
                    </BlurRevealText>
                  </div>

                  <div className="divide-y divide-[#EAE2D8] border-t border-b border-[#EAE2D8]">
                    {METHODOLOGIES.map((method, idx) => (
                      <EditorialFadeUp
                        key={method.id}
                        delay={idx * 0.06}
                        className="py-7 space-y-2.5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#6E665E]">
                          {method.subtitle}
                        </p>
                        <h3 className="font-display text-2xl sm:text-[26px] font-medium text-[#202322]">
                          {method.title}
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-[#4F4943]">
                          {method.description}
                        </p>
                        <p className="pt-1 text-xs font-medium text-[#6E665E]">
                          {method.clinicalBasis}
                        </p>
                      </EditorialFadeUp>
                    ))}
                  </div>
                </div>

                {/* Feathered Clinical Image of Dermapen 4 */}
                <div className="lg:col-span-5 relative">
                  <ClipParallaxPhoto
                    parallaxRange={16}
                    className="relative aspect-square w-full"
                  >
                    <ResilientImage
                      src={CLINIC_IMAGES.dermapenTreatment}
                      alt="Trattamento di microneedling controllato con dispositivo Dermapen 4 presso SMIROS Pescara"
                      className="w-full h-full object-cover object-center"
                    />
                  </ClipParallaxPhoto>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-[#FAFAF8]/65"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/55 via-transparent to-[#FAFAF8]/55"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 7. Galleria Fotografica dello Studio (Warm Surface · Beige caldo #EAE2D8/45) */}
          <section
            id="studio"
            className="py-24 sm:py-32 border-t border-[#EAE2D8] bg-[#EAE2D8]/45"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C4AD92]/40">
                <div className="max-w-xl">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6E665E]">
                    Lo studio · {CLINIC_INFO.address}, Pescara
                  </p>
                  <BlurRevealText>
                    <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.08] tracking-tight text-[#202322] text-balance">
                      Uno spazio riservato nel cuore di Pescara.
                    </h2>
                  </BlurRevealText>
                </div>
                <p className="text-sm leading-relaxed text-[#4F4943] max-w-md">
                  Ambienti dedicati alla visita medica e ai trattamenti
                  ambulatoriali, organizzati su appuntamento per garantire
                  riservatezza e puntualità.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-end">
                {STUDIO_GALLERY.map((photo, index) => (
                  <EditorialFadeUp
                    key={photo.id}
                    delay={index * 0.08}
                    className="space-y-4"
                  >
                    <div className="relative overflow-hidden group">
                      <ClipParallaxPhoto
                        parallaxRange={10}
                        className={`relative w-full ${photo.aspectClass}`}
                      >
                        <ResilientImage
                          src={photo.src}
                          alt={photo.alt}
                          className={`w-full h-full object-cover ${photo.objectPositionClass} transition-transform duration-700 ease-editorial group-hover:scale-[1.03]`}
                        />
                      </ClipParallaxPhoto>
                    </div>
                    <div className="pt-2 border-t border-[#C4AD92]/45">
                      <p className="font-display text-xl font-medium text-[#202322]">
                        {photo.title}
                      </p>
                      <p className="mt-1 text-xs text-[#6E665E]">
                        {photo.caption}
                      </p>
                    </div>
                  </EditorialFadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Domande Frequenti (Light · Bianco naturale #FAFAF8) */}
          <section
            id="domande"
            className="py-24 sm:py-28 border-t border-[#EAE2D8] bg-[#FAFAF8]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6E665E]">
                    Domande frequenti
                  </p>
                  <BlurRevealText>
                    <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-[#202322] text-balance">
                      Informazioni utili prima della prima visita.
                    </h2>
                  </BlurRevealText>
                  <p className="mt-4 text-sm leading-relaxed text-[#4F4943]">
                    Per qualsiasi chiarimento aggiuntivo sui trattamenti o sulle
                    disponibilità in agenda, puoi contattare direttamente lo studio
                    su WhatsApp.
                  </p>
                </div>

                <div className="lg:col-span-8 divide-y divide-[#EAE2D8] border-t border-b border-[#EAE2D8]">
                  {FAQ_ITEMS.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div key={faq.id} className="py-5">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                          className="w-full flex items-center justify-between gap-6 text-left py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202322]"
                        >
                          <span className="text-base font-medium text-[#202322]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#6E665E] shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#202322]' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.24, ease: KOWALSKI_EASE }}
                              className="overflow-hidden"
                            >
                              <p className="mt-3 pr-8 text-sm leading-relaxed text-[#4F4943]">
                                {faq.answer}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 9. Contatti e Richiesta di Appuntamento tramite WhatsApp */}
          <WhatsAppBookingSection preselectedTreatment={bookingTreatment} />
        </main>

        {/* Quiet Dark Architectural Colophon Footer */}
        <footer className="border-t border-[#6E665E]/30 bg-[#202322] text-[#FAFAF8] py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-1.5">
              <p className="font-display text-2xl font-medium text-[#FAFAF8]">
                {CLINIC_INFO.fullName}
              </p>
              <p className="text-xs tracking-[0.01em] text-[#EAE2D8]/85">
                {CLINIC_INFO.doctorName} · {CLINIC_INFO.address}, {CLINIC_INFO.city}
              </p>
              <p className="text-xs text-[#EAE2D8]/70 tabular-nums">
                {CLINIC_INFO.hours} · {CLINIC_INFO.closedDays}
              </p>
              <p className="pt-1 text-[11px] text-[#C4AD92]">
                Anteprima dimostrativa non ufficiale · MONETIQ
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#EAE2D8]">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#FAFAF8] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C4AD92]" />
                <span>Instagram</span>
              </a>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 hover:text-[#FAFAF8] transition-colors duration-150 tabular-nums whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C4AD92]" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#FAFAF8] font-semibold hover:text-[#EAE2D8] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C4AD92]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </footer>

        {/* Compact Mobile Sticky WhatsApp Bar (52px height, total sticky UI < 15% mobile viewport) */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[52px] bg-[#FAFAF8]/95 backdrop-blur-sm border-t border-[#EAE2D8] px-4 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#4F4943] truncate">
            Pescara · Dott. Smiraglia
          </span>
          <a
            href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#202322] text-[#FAFAF8] text-xs font-medium active:scale-[0.985] transition-transform duration-150 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C4AD92]" />
            <span>Prenota su WhatsApp</span>
          </a>
        </div>
      </div>
    </MotionConfig>
  );
}

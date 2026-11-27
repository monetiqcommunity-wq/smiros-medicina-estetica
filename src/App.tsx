/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
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
  PHILOSOPHY_PILLARS,
  TREATMENTS,
  TreatmentProtocol,
  VERIFIED_TECHNOLOGIES,
  buildWhatsAppUrl,
} from './data/clinicData';
import { ResilientImage } from './components/ResilientImage';
import { HeroSlider } from './components/HeroSlider';
import { TreatmentShowcase } from './components/TreatmentShowcase';
import { TreatmentDetailPanel } from './components/TreatmentDetailPanel';
import { StudioGallerySection } from './components/StudioGallerySection';
import { WhatsAppBookingSection } from './components/WhatsAppBookingSection';
import {
  BlurFade,
  BlurTextSequence,
  ClipParallaxPhoto,
  KOWALSKI_EASE,
  MaskedBlurHeading,
} from './components/EditorialMotion';
import { MonetiqWatermark } from './components/MonetiqWatermark';

const NAV_ITEMS = [
  { label: 'Filosofia', href: '#filosofia' },
  { label: 'Trattamenti', href: '#trattamenti' },
  { label: 'Il Medico', href: '#medico' },
  { label: 'Tecnologie', href: '#tecnologie' },
  { label: 'Lo Studio', href: '#studio' },
] as const;

export default function App() {
  const [activeTreatmentModal, setActiveTreatmentModal] =
    useState<TreatmentProtocol | null>(null);
  const [bookingTreatment, setBookingTreatment] = useState<string>(
    TREATMENTS[0].title
  );
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [headerSolid, setHeaderSolid] = useState<boolean>(false);

  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeSolid = latest > 48;
    if (shouldBeSolid !== headerSolid) {
      setHeaderSolid(shouldBeSolid);
    }
  });

  const interludeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: interludeProgress } = useScroll({
    target: interludeRef,
    offset: ['start end', 'end start'],
  });
  const interludeY = useTransform(
    interludeProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-28, 28]
  );

  const handleSelectForBooking = (treatmentTitle: string) => {
    setBookingTreatment(treatmentTitle);
    const el = document.getElementById('prenotazione');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8F5F0] text-[#1C1C1C] pb-16 md:pb-0">
        <MonetiqWatermark />

        {/* Dynamic Top Bar: Transparent over Video -> Warm Avorio on Scroll */}
        <header
          className={`fixed top-0 inset-x-0 z-40 transition-[background-color,border-color,color,backdrop-filter] duration-300 ease-editorial border-b ${
            headerSolid || mobileMenuOpen
              ? 'bg-[#F8F5F0]/95 backdrop-blur-md border-[#E6D8C9] text-[#1C1C1C]'
              : 'bg-transparent border-[#F8F5F0]/15 text-[#F8F5F0] [text-shadow:0_1px_12px_rgba(28,28,28,0.45)]'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 md:h-16 flex items-center justify-between gap-8">
            <a
              href="#"
              className={`font-display text-2xl font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                headerSolid || mobileMenuOpen
                  ? 'text-[#1C1C1C] focus-visible:outline-[#1C1C1C]'
                  : 'text-[#F8F5F0] focus-visible:outline-[#F8F5F0]'
              }`}
            >
              {CLINIC_INFO.brand}
            </a>

            <nav
              aria-label="Navigazione principale"
              className={`hidden md:flex items-center gap-7 text-sm font-medium transition-colors duration-200 ${
                headerSolid ? 'text-[#5E544C]' : 'text-[#F8F5F0]/90'
              }`}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline decoration-[#B39A7D] ${
                    headerSolid ? 'hover:text-[#1C1C1C]' : 'hover:text-[#F8F5F0]'
                  }`}
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
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium active:scale-[0.985] transition-[background-color,color,border-color,transform] duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  headerSolid
                    ? 'bg-[#1C1C1C] text-[#F8F5F0] hover:bg-[#332E2A] border border-transparent focus-visible:outline-[#1C1C1C]'
                    : 'bg-[#1C1C1C]/45 hover:bg-[#1C1C1C]/68 backdrop-blur-xs text-[#F8F5F0] border border-[#F8F5F0]/35 focus-visible:outline-[#F8F5F0]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B39A7D]" />
                <span>Richiedi su WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                className={`md:hidden min-w-10 min-h-10 flex items-center justify-center rounded-md border active:scale-[0.97] transition-colors duration-150 ${
                  headerSolid || mobileMenuOpen
                    ? 'border-[#E6D8C9] bg-[#F8F5F0] text-[#1C1C1C]'
                    : 'border-[#F8F5F0]/30 bg-[#1C1C1C]/40 text-[#F8F5F0]'
                }`}
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
                className="md:hidden border-t border-[#E6D8C9] bg-[#F8F5F0] px-5 py-4 flex flex-col gap-3 text-[#1C1C1C]"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 text-sm font-medium text-[#1C1C1C] hover:text-[#6B6056]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#domande"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-[#1C1C1C] hover:text-[#6B6056]"
                >
                  Domande frequenti
                </a>
                <a
                  href="#prenotazione"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#1C1C1C] text-[#F8F5F0] text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-[#B39A7D]" />
                  <span>Contatti e WhatsApp</span>
                </a>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </header>

        <main>
          {/* 1. Full-Viewport Cinematic Video Opening */}
          <HeroSlider />

          {/* 2. Principi Clinici (Photo-Left Asymmetric Editorial + Illustrative Art · Avorio caldo #F8F5F0) */}
          <section
            id="filosofia"
            className="-mt-px pt-12 pb-16 sm:pt-16 sm:pb-20 bg-[#F8F5F0]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F5F0] group">
                    <ClipParallaxPhoto
                      parallaxRange={10}
                      className="w-full h-full bg-[#F8F5F0]"
                    >
                      <ResilientImage
                        src={CLINIC_IMAGES.editorialPortraitHelix}
                        alt="Ritratto editoriale dai toni caldi dedicato alla luminosità e all’equilibrio cutaneo"
                        className="w-full h-full object-cover object-[50%_18%] scale-[1.06] brightness-[1.03] contrast-[0.96] transition-transform duration-700 ease-editorial group-hover:scale-[1.08]"
                      />
                    </ClipParallaxPhoto>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_76%_at_50%_46%,transparent_48%,rgba(248,245,240,0.48)_76%,#F8F5F0_98%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-[#F8F5F0] via-[#F8F5F0]/50 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-[#F8F5F0] via-[#F8F5F0]/55 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-20 bg-gradient-to-r from-[#F8F5F0] via-[#F8F5F0]/50 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#F8F5F0] via-[#F8F5F0]/50 to-transparent"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B6056]">
                      Approccio Diagnostico
                    </p>
                    <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.08] tracking-tight text-[#1C1C1C]">
                      <MaskedBlurHeading
                        lines={['Prima di intervenire,', 'si osserva l’anatomia.']}
                      />
                    </h2>
                    <BlurFade delay={0.12}>
                      <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#5E544C] max-w-[58ch]">
                        Ogni indicazione terapeutica nasce dall’analisi dei volumi,
                        degli spessori cutanei e della risposta biologica individuale,
                        senza protocolli standardizzati.
                      </p>
                    </BlurFade>
                  </div>

                  <div className="divide-y divide-[#E6D8C9] border-t border-b border-[#E6D8C9]">
                    {PHILOSOPHY_PILLARS.map((pillar, index) => (
                      <BlurFade
                        key={pillar.title}
                        delay={index * 0.08}
                        className="py-5 space-y-1.5"
                      >
                        <h3 className="font-display text-xl sm:text-2xl font-medium text-[#1C1C1C]">
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#5E544C]">
                          {pillar.description}
                        </p>
                      </BlurFade>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Aree Cliniche: Zig-Zag Bento Editorial Grid + Interactive Detail Drawer */}
          <TreatmentShowcase
            onOpenTreatment={(treatment) => setActiveTreatmentModal(treatment)}
          />

          {/* 4. Direzione Sanitaria: Dott. Simone A. Smiraglia & Competenze Anestesiologiche (Dark · #1C1C1C) */}
          <section
            id="medico"
            className="py-16 sm:py-24 bg-[#1C1C1C] text-[#F8F5F0]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-5 relative group">
                  <ClipParallaxPhoto
                    parallaxRange={14}
                    className="relative aspect-[3/4] w-full"
                  >
                    <ResilientImage
                      src={CLINIC_IMAGES.doctorPortrait}
                      alt="Dott. Simone A. Smiraglia nello studio SMIROS Medicina Estetica a Pescara"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
                    />
                  </ClipParallaxPhoto>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-[#1C1C1C]/35"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1C1C1C] via-transparent to-[#1C1C1C]"
                  />
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#B39A7D]">
                    Il Medico · Direzione Sanitaria
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-medium leading-[1.06] tracking-tight text-[#F8F5F0]">
                    <MaskedBlurHeading lines={[CLINIC_INFO.doctorName]} />
                  </h2>
                  <BlurFade delay={0.1}>
                    <p className="text-sm font-medium tracking-[0.01em] text-[#E6D8C9]">
                      {CLINIC_INFO.doctorCredentials}
                    </p>
                  </BlurFade>
                  <BlurFade delay={0.16}>
                    <p className="text-[15px] sm:text-base leading-relaxed tracking-[0.01em] text-[#E6D8C9]/90 max-w-[60ch]">
                      La specializzazione in Anestesia e Rianimazione guida il mio
                      lavoro in ambito ambulatoriale: conoscenza rigorosa dei piani
                      vascolari, gestione mirata del comfort durante la seduta ed
                      esecuzione personale di ogni visita e trattamento.
                    </p>
                  </BlurFade>

                  <BlurFade delay={0.24}>
                    <div className="pt-6 border-t border-[#82766B]/35 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <p className="font-display text-2xl font-medium text-[#F8F5F0]">
                          Rapporto 1:1
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#E6D8C9]/80">
                          Ogni visita e seduta seguita direttamente dal medico
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-2xl font-medium text-[#F8F5F0]">
                          Anestesia e comfort
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#E6D8C9]/80">
                          Protocolli analgesici topici o locali dedicati
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-2xl font-medium text-[#F8F5F0]">
                          Chiarezza clinica
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#E6D8C9]/80">
                          Indicazioni scritte, alternative e tempi di recupero reali
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Ricerca, Metodologie e Dispositivi (Full-Bleed Parallax Glass Helix + 3-Col Architectural Index) */}
          <section id="tecnologie" className="bg-[#F8F5F0]">
            <div
              ref={interludeRef}
              className="relative h-[44vh] sm:h-[52vh] w-full overflow-hidden bg-[#1C1C1C] flex items-center justify-center"
            >
              <motion.div
                style={{ y: interludeY }}
                className="absolute inset-0 -top-8 -bottom-8 will-change-transform"
              >
                <ResilientImage
                  src={CLINIC_IMAGES.glassDoubleHelix}
                  alt="Rappresentazione illustrativa della struttura molecolare cutanea per medicina rigenerativa e biostimolazione"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/62 via-[#1C1C1C]/48 to-[#1C1C1C]/72"
              />
              <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#E6D8C9]">
                  Tecnologia e Metodiche
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-medium leading-[1.12] text-[#F8F5F0] text-balance">
                  <BlurTextSequence text="Strumenti selettivi al servizio della biologia cutanea." />
                </h2>
              </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-b border-[#E6D8C9] py-10">
                {VERIFIED_TECHNOLOGIES.map((tech, index) => (
                  <BlurFade
                    key={tech.id}
                    delay={index * 0.08}
                    className="space-y-2.5 md:border-r md:last:border-r-0 md:border-[#E6D8C9] md:pr-8 md:last:pr-0"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6B6056]">
                      {tech.category}
                    </p>
                    <h3 className="font-display text-2xl font-medium text-[#1C1C1C]">
                      {tech.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5E544C]">
                      {tech.description}
                    </p>
                    <p className="pt-1 text-xs font-medium text-[#6B6056]">
                      {tech.clinicalNote}
                    </p>
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Galleria Fotografica Dinamica dello Studio */}
          <StudioGallerySection />

          {/* 8. Domande Frequenti */}
          <section
            id="domande"
            className="py-16 sm:py-20 border-t border-[#E6D8C9] bg-white"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                <div className="lg:col-span-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B6056]">
                    Domande frequenti
                  </p>
                  <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-[#1C1C1C]">
                    <MaskedBlurHeading lines={['Chiarimenti prima', 'della prima visita.']} />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E544C]">
                    Per qualsiasi dubbio specifico puoi scrivere direttamente alla
                    segreteria dello studio su WhatsApp.
                  </p>
                </div>

                <div className="lg:col-span-8 divide-y divide-[#E6D8C9] border-t border-b border-[#E6D8C9]">
                  {FAQ_ITEMS.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div key={faq.id} className="py-4 sm:py-5">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                          className="w-full flex items-center justify-between gap-6 text-left py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C]"
                        >
                          <span className="text-base font-medium text-[#1C1C1C]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#82766B] shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#1C1C1C]' : ''
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
                              <p className="mt-3 pr-8 text-sm leading-relaxed text-[#5E544C]">
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

          {/* 9. Contatti e Richiesta Appuntamento WhatsApp */}
          <WhatsAppBookingSection preselectedTreatment={bookingTreatment} />
        </main>

        {/* Quiet Dark Architectural Colophon Footer */}
        <footer className="border-t border-[#82766B]/30 bg-[#1C1C1C] text-[#F8F5F0] py-12">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-1.5">
              <p className="font-display text-2xl font-medium text-[#F8F5F0]">
                {CLINIC_INFO.fullName}
              </p>
              <p className="text-xs tracking-[0.01em] text-[#E6D8C9]/85">
                {CLINIC_INFO.doctorName} · {CLINIC_INFO.address}, {CLINIC_INFO.city}
              </p>
              <p className="text-xs text-[#E6D8C9]/70 tabular-nums">
                {CLINIC_INFO.hours} · {CLINIC_INFO.closedDays}
              </p>
              <p className="pt-1 text-[11px] text-[#B39A7D]">
                Anteprima dimostrativa non ufficiale · MONETIQ
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#E6D8C9]">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#F8F5F0] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Instagram className="w-3.5 h-3.5 text-[#B39A7D]" />
                <span>Instagram</span>
              </a>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 hover:text-[#F8F5F0] transition-colors duration-150 tabular-nums whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#B39A7D]" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F8F5F0] font-semibold hover:text-[#E6D8C9] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B39A7D]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </footer>

        {/* Compact Mobile Sticky WhatsApp Bar (52px height) */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[52px] bg-[#F8F5F0]/95 backdrop-blur-sm border-t border-[#E6D8C9] px-4 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#5E544C] truncate">
            Pescara · Dott. Smiraglia
          </span>
          <a
            href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#1C1C1C] text-[#F8F5F0] text-xs font-medium active:scale-[0.985] transition-transform duration-150 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#B39A7D]" />
            <span>Prenota su WhatsApp</span>
          </a>
        </div>

        <TreatmentDetailPanel
          treatment={activeTreatmentModal}
          onClose={() => setActiveTreatmentModal(null)}
          onSelectForBooking={handleSelectForBooking}
        />
      </div>
    </MotionConfig>
  );
}

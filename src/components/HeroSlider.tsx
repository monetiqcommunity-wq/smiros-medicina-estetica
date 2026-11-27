import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import {
  CLINIC_INFO,
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../data/clinicData';
import { BlurFade, MaskedBlurHeading } from './EditorialMotion';

const HERO_MEDIA = {
  desktop: {
    video: '/assets/hero-desktop.mp4',
    poster: '/assets/hero-poster-desktop.jpg',
    objectPosition: 'object-[50%_20%]',
  },
  mobile: {
    video: '/assets/hero-mobile.mp4',
    poster: '/assets/hero-poster-mobile.jpg',
    objectPosition: 'object-[50%_42%]',
  },
} as const;

export function HeroSlider() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  const [videoReady, setVideoReady] = useState<boolean>(false);
  const [fallbackToPoster, setFallbackToPoster] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 56]
  );
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.05]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };
    setIsMobileViewport(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const activeMedia = isMobileViewport ? HERO_MEDIA.mobile : HERO_MEDIA.desktop;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    setVideoReady(false);
    setFallbackToPoster(false);
    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = video.play();
    if (attemptPlay !== undefined) {
      attemptPlay.catch(() => {
        setFallbackToPoster(true);
      });
    }
  }, [activeMedia.video, prefersReducedMotion]);

  const showLiveVideo = !prefersReducedMotion && !fallbackToPoster;

  return (
    <section
      ref={sectionRef}
      aria-label="Apertura video SMIROS Medicina Estetica"
      className="relative w-full min-h-[100svh] bg-[#1C1C1C] text-[#F8F5F0] overflow-hidden flex flex-col justify-end"
    >
      {/* Full-bleed responsive video & immediate poster layer with scroll-linked depth */}
      <motion.div
        style={{ y: mediaY, scale: mediaScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={activeMedia.poster}
          alt="Dott. Simone A. Smiraglia nello studio SMIROS Medicina Estetica a Pescara"
          className={`w-full h-full object-cover ${activeMedia.objectPosition}`}
        />

        {showLiveVideo ? (
          <video
            key={activeMedia.video}
            ref={videoRef}
            src={activeMedia.video}
            poster={activeMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-hidden="true"
            onPlaying={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setFallbackToPoster(true)}
            className={`absolute inset-0 w-full h-full object-cover ${activeMedia.objectPosition} pointer-events-none transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Top navigation readability veil + balanced lower editorial gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1C1C1C]/72 via-[#1C1C1C]/30 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/20 via-[#1C1C1C]/36 to-[#1C1C1C]/90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-transparent to-[#1C1C1C]/45"
        />
      </motion.div>

      {/* Main editorial overlay anchored gracefully in lower safe area */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 pt-36 sm:pt-48 pb-10 sm:pb-12 text-center">
        <div className="mx-auto max-w-4xl">
          <BlurFade immediate delay={0.05}>
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-medium tracking-[0.26em] uppercase text-[#F8F5F0]">
                {CLINIC_INFO.brand}
              </span>
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#E6D8C9]/90">
                Medicina Estetica · Pescara
              </p>
            </div>
          </BlurFade>

          <h1 className="mt-4 sm:mt-5 font-display text-[clamp(2.45rem,5.4vw,4.95rem)] font-medium leading-[1.03] tracking-[-0.018em] text-[#F8F5F0] drop-shadow-[0_2px_18px_rgba(28,28,28,0.35)]">
            <MaskedBlurHeading
              lines={['Armonia del volto,', 'guidata dal rigore medico.']}
              immediate
              baseDelay={0.2}
              wordStagger={0.06}
              lineStagger={0.14}
            />
          </h1>

          <BlurFade immediate delay={0.95}>
            <p className="mt-4 sm:mt-5 mx-auto text-[14px] sm:text-[17px] leading-relaxed text-[#E6D8C9] max-w-[58ch] drop-shadow-[0_1px_12px_rgba(28,28,28,0.4)]">
              Direzione sanitaria {CLINIC_INFO.doctorName}. Valutazione
              anatomica diretta e protocolli medici personalizzati in Corso
              Vittorio Emanuele II, 310.
            </p>
          </BlurFade>

          <BlurFade immediate delay={1.24}>
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#B39A7D] text-[#1C1C1C] text-sm font-semibold hover:bg-[#C4AD92] active:scale-[0.985] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Prenota una visita su WhatsApp</span>
              </a>

              <a
                href="#trattamenti"
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-[#F8F5F0] underline underline-offset-4 decoration-[#B39A7D] hover:text-[#E6D8C9] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F5F0]"
              >
                Esplora i trattamenti
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Quiet Scroll Indicator */}
        <BlurFade immediate delay={1.45}>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a
              href="#filosofia"
              aria-label="Scorri alla sezione successiva"
              className="group inline-flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#E6D8C9]/80 hover:text-[#F8F5F0] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8F5F0]"
            >
              <span>Scopri lo studio</span>
              <ChevronDown className="w-4 h-4 text-[#B39A7D] transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Soft Tonal Bridge dissolving seamlessly into Avorio caldo #F8F5F0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 h-14 sm:h-20 w-full bg-gradient-to-b from-transparent via-[#28231E]/45 to-[#F8F5F0]"
      />
    </section>
  );
}

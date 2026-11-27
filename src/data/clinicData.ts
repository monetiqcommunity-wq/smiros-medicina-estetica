export type TreatmentCategory =
  | 'tutti'
  | 'viso-volumi'
  | 'qualita-cutanea'
  | 'prevenzione';

export interface TreatmentProtocol {
  id: string;
  title: string;
  category: Exclude<TreatmentCategory, 'tutti'>;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  imageObjectPos: string;
  duration: string;
  recovery: string;
  shortDescription: string;
  natureOfTreatment: string;
  possibleIndications: string[];
  medicalEvaluationNote: string;
  sessionProcess: string;
}

export interface PhilosophyPillar {
  title: string;
  description: string;
}

export interface TechnologyItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  imageObjectPos: string;
  description: string;
  clinicalNote: string;
}

export interface StudioGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  locationNote: string;
  description: string;
  objectPositionClass: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  brand: 'SMIROS',
  fullName: 'SMIROS Medicina Estetica',
  doctorName: 'Dott. Simone A. Smiraglia',
  doctorCredentials:
    'Medico Chirurgo · Specialista in Anestesia e Rianimazione · Medico Estetico',
  address: 'Corso Vittorio Emanuele II, 310',
  city: '65122 Pescara (PE)',
  phoneDisplay: '+39 351 317 1020',
  phoneRaw: '393513171020',
  hours: 'Lunedì – Venerdì · 09:00 – 19:30',
  closedDays: 'Sabato e Domenica chiuso',
  instagramUrl: 'https://www.instagram.com/smiros_medicina_estetica/?hl=en',
  instagramHandle: '@smiros_medicina_estetica',
} as const;

export const CLINIC_IMAGES = {
  studioMacbook: '/assets/aistudio/IMG_6879_daef3bd6.jpeg',
  waitingHall: '/assets/aistudio/IMG_6883_fc1a6c7b.jpeg',
  treatmentSuite: '/assets/aistudio/IMG_6886_cf28960d.jpeg',
  doctorPortrait: '/assets/aistudio/530E256A-3FB0-4446-9872-F101332E4E0A_9ba779e0.png',
  facialAssessment: '/assets/aistudio/79e48e76-e87c-47f6-bd68-472bab154ab4_5487e61a.png',
  precisionInjection: '/assets/aistudio/IMG_6882_de138f6b.jpeg',
  dermapenDetail: '/assets/aistudio/4F26F5D4-E0B3-4EF7-BCFA-F05C6351A397_479866b2.png',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  'Buongiorno Dott. Smiraglia, vorrei richiedere informazioni e disponibilità per una consulenza presso SMIROS Medicina Estetica a Pescara.';

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    title: 'Analisi individuale prima di ogni trattamento',
    description:
      'Non applico schemi ripetitivi. Ogni volto presenta equilibri muscolari, spessori dermici e proporzioni proprie che richiedono una valutazione medica dedicata prima di decidere qualsiasi intervento.',
  },
  {
    title: 'Sicurezza derivante dall’Anestesia e Rianimazione',
    description:
      'La mia formazione specialistica ospedaliera orienta l’approccio ai piani anatomici vascolari, alla gestione del comfort durante la procedura e al rispetto dei protocolli clinici di sicurezza.',
  },
  {
    title: 'Gradualità e naturalezza espressiva',
    description:
      'L’obiettivo medico è sostenere e valorizzare i tessuti rispettando la fisionomia personale, senza alterare l’espressività naturale del viso.',
  },
];

export const TREATMENT_CATEGORIES: {
  id: TreatmentCategory;
  label: string;
}[] = [
  { id: 'tutti', label: 'Tutti i trattamenti' },
  { id: 'viso-volumi', label: 'Viso e Volumi' },
  { id: 'qualita-cutanea', label: 'Qualità Cutanea' },
  { id: 'prevenzione', label: 'Consulenza e Anti-Aging' },
];

export const TREATMENTS: TreatmentProtocol[] = [
  {
    id: 'armonizzazione-full-face',
    title: 'Armonizzazione Full Face e Prima Visita',
    category: 'prevenzione',
    categoryLabel: 'Valutazione e Piano Clinico',
    image: CLINIC_IMAGES.facialAssessment,
    imageAlt:
      'Valutazione medica delle proporzioni del volto eseguita dal Dott. Simone A. Smiraglia',
    imageObjectPos: 'object-[50%_20%]',
    duration: '40 min',
    recovery: 'Nessun tempo di recupero',
    shortDescription:
      'Visita medica specialistica per analizzare i volumi, la mimica e la qualità cutanea del volto e definire un piano personalizzato.',
    natureOfTreatment:
      'Consulenza medica diagnostica e pianificazione terapeutica su misura, propedeutica a qualunque eventuale procedura ambulatoriale.',
    possibleIndications: [
      'Analisi complessiva delle proporzioni del terzo superiore, medio e inferiore',
      'Programmazione graduale di interventi combinati di medicina estetica',
      'Valutazione medica per percorsi di medicina preventiva e anti-aging',
    ],
    medicalEvaluationNote:
      'Ogni trattamento viene proposto esclusivamente a seguito di visita medica individuale, anamnesi completa e verifica di assenza di controindicazioni.',
    sessionProcess:
      'Esamino personalmente la struttura del volto sia a riposo sia in movimento, condividendo obiettivi realistici, priorità di intervento e tempi.',
  },
  {
    id: 'filler-acido-ialuronico',
    title: 'Filler con Acido Ialuronico, Labbra e Rinofiller',
    category: 'viso-volumi',
    categoryLabel: 'Viso e Volumi',
    image: CLINIC_IMAGES.treatmentSuite,
    imageAlt:
      'Sala medica attrezzata per trattamenti con acido ialuronico presso SMIROS Pescara',
    imageObjectPos: 'object-[50%_65%]',
    duration: '30–45 min',
    recovery: 'Possibile lieve edema transitorio',
    shortDescription:
      'Trattamenti iniettivi con acido ialuronico medicale per filler labbra, rinofiller, solchi, occhiaie e sostegno dei volumi del volto.',
    natureOfTreatment:
      'Procedura medica ambulatoriale basata sull’impianto mirato di acidi ialuronici riassorbibili certificati CE, selezionati in base al piano anatomico.',
    possibleIndications: [
      'Filler labbra per idratazione, definizione del contorno o riequilibrio volumetrico',
      'Rinofiller non chirurgico per lievi irregolarità del profilo nasale',
      'Filler occhiaie, sostegno zigomatico e ridefinizione dell’ovale mandibolare',
    ],
    medicalEvaluationNote:
      'La scelta della formulazione, della quantità e della tecnica (microcannula o ago sottile) è stabilita solo dopo valutazione clinica individuale.',
    sessionProcess:
      'Dopo preparazione anestetica locale o topica, eseguo l’infiltrazione rispettando i piani vascolari profondi e consegnando la tracciabilità del dispositivo.',
  },
  {
    id: 'tossina-botulinica',
    title: 'Tossina Botulinica (Terzo Superiore)',
    category: 'viso-volumi',
    categoryLabel: 'Viso e Mimica',
    image: CLINIC_IMAGES.precisionInjection,
    imageAlt:
      'Dott. Simone A. Smiraglia durante trattamento iniettivo di precisione sul terzo superiore del volto',
    imageObjectPos: 'object-[50%_28%]',
    duration: '20–30 min',
    recovery: 'Ripresa delle attività in giornata',
    shortDescription:
      'Micro-infiltrazioni mirate per attenuare le rughe d’espressione di fronte, glabella e area perioculare preservando la naturalezza.',
    natureOfTreatment:
      'Trattamento medico ambulatoriale volto a modulare selettivamente l’iperattività dei muscoli mimici del terzo superiore del volto.',
    possibleIndications: [
      'Rughe glabellari tra le sopracciglia',
      'Linee dinamiche orizzontali della fronte',
      'Rughe perioculari laterali',
    ],
    medicalEvaluationNote:
      'Il dosaggio e i punti di inoculo vengono calibrati esclusivamente in base alla forza muscolare osservata durante la visita medica.',
    sessionProcess:
      'Eseguo una mappatura dinamica della mimica e procedo con micro-iniezioni mirate, programmando un controllo clinico di verifica dopo circa due settimane.',
  },
  {
    id: 'dermapen-microneedling',
    title: 'Microneedling Medico con Dermapen 4',
    category: 'qualita-cutanea',
    categoryLabel: 'Qualità Cutanea',
    image: CLINIC_IMAGES.dermapenDetail,
    imageAlt:
      'Applicazione clinica con dispositivo medico Dermapen 4 per il rinnovamento della pelle',
    imageObjectPos: 'object-center',
    duration: '35–45 min',
    recovery: 'Lieve eritema per 24–48 ore',
    shortDescription:
      'Stimolazione dermica meccanica di precisione con Dermapen 4 per migliorare texture cutanea, pori dilatati ed esiti cicatriziali.',
    natureOfTreatment:
      'Metodica di biostimolazione fisica controllata che genera micro-canali verticali nel derma per favorire il turnover cellulare e la sintesi di collagene.',
    possibleIndications: [
      'Irregolarità della grana cutanea e pori evidenti',
      'Esiti cicatriziali superficiali post-acneici e linee sottili',
      'Tonicità e luminosità di viso, collo e décolleté',
    ],
    medicalEvaluationNote:
      'La profondità d’azione e il numero di sedute vengono definiti dal medico in funzione del fototipo, dello spessore dermico e dello stato cutaneo.',
    sessionProcess:
      'Previa detersione e crema anestetica topica, eseguo passaggi calibrati su ciascuna area associando soluzioni sterili specifiche e fotoprotezione finale.',
  },
  {
    id: 'biorivitalizzazione-peeling',
    title: 'Biorivitalizzazione, Peeling e Anti-Aging',
    category: 'qualita-cutanea',
    categoryLabel: 'Qualità Cutanea e Prevenzione',
    image: CLINIC_IMAGES.studioMacbook,
    imageAlt:
      'Studio medico SMIROS a Pescara dedicato a consulenze di biorivitalizzazione, peeling e medicina anti-aging',
    imageObjectPos: 'object-[50%_68%]',
    duration: '30–45 min',
    recovery: 'Minimo o nullo in base al protocollo',
    shortDescription:
      'Percorsi di idratazione dermica profonda, peeling medici e medicina preventiva per sostenere la salute della pelle nel tempo.',
    natureOfTreatment:
      'Protocolli medici dedicati al miglioramento biologico della qualità cutanea e alla prevenzione del fotoinvecchiamento.',
    possibleIndications: [
      'Pelle disidratata, spenta o esposta a stress ossidativo',
      'Prevenzione dell’invecchiamento cutaneo precoce',
      'Esfoliazione chimica medicale controllata tramite peeling',
    ],
    medicalEvaluationNote:
      'La scelta tra biorivitalizzazione iniettiva, peeling medico o programma combinato viene stabilita dopo valutazione clinica della cute.',
    sessionProcess:
      'Le sedute vengono programmate in cicli personalizzati stagionali, integrate da indicazioni dermocosmetiche essenziali per il mantenimento domiciliare.',
  },
];

export const VERIFIED_TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'tech-dermapen',
    title: 'Dermapen 4 per Microneedling Medico',
    category: 'Dispositivo medico certificato',
    image: CLINIC_IMAGES.dermapenDetail,
    imageAlt: 'Dettaglio del manipolo Dermapen 4 durante trattamento medico in studio',
    imageObjectPos: 'object-center',
    description:
      'Sistema di microneedling medico dotato di regolazione digitale della profondità per intervenire in modo selettivo sui diversi spessori cutanei di viso, collo e décolleté.',
    clinicalNote:
      'Consente di modulare la stimolazione dermica e la veicolazione di attivi sterili con recupero contenuto.',
  },
  {
    id: 'tech-iniettivi',
    title: 'Tecnica Iniettiva di Precisione e Microcannule',
    category: 'Metodologia ambulatoriale',
    image: CLINIC_IMAGES.precisionInjection,
    imageAlt: 'Esecuzione di procedura iniettiva di precisione in ambiente medico controllato',
    imageObjectPos: 'object-top',
    description:
      'Utilizzo combinato di aghi ultrasottili e microcannule atraumatiche a punta smussa in base al distretto da trattare, con acidi ialuronici medicali tracciabili.',
    clinicalNote:
      'Approccio mirato a ridurre il trauma tessutale e rispettare l’anatomia vascolare.',
  },
  {
    id: 'tech-anestesia',
    title: 'Protocolli di Valutazione e Comfort Anestesiologico',
    category: 'Sicurezza clinica',
    image: CLINIC_IMAGES.facialAssessment,
    imageAlt: 'Analisi clinica preliminare del volto eseguita dal Dott. Simone A. Smiraglia',
    imageObjectPos: 'object-[50%_22%]',
    description:
      'Integrazione delle competenze di Anestesia e Rianimazione nella preparazione topica o locale della cute e nel monitoraggio clinico del paziente.',
    clinicalNote:
      'Nessuna tecnologia o macchinario non espressamente verificato viene aggiunto: ogni strumento presente in studio risponde a reali protocolli medici.',
  },
];

export const STUDIO_GALLERY: StudioGalleryItem[] = [
  {
    id: 'reception-attesa',
    src: CLINIC_IMAGES.waitingHall,
    alt: 'Area accoglienza e ingresso di SMIROS Medicina Estetica in Corso Vittorio Emanuele II, 310 a Pescara',
    title: 'Accoglienza e ingresso riservato',
    locationNote: 'Corso Vittorio Emanuele II, 310 · Pescara',
    description:
      'Spazio d’ingresso luminoso e silenzioso, organizzato esclusivamente su appuntamento per garantire privacy senza attese.',
    objectPositionClass: 'object-center',
  },
  {
    id: 'studio-direzionale',
    src: CLINIC_IMAGES.studioMacbook,
    alt: 'Postazione medica di consulenza e vista sulla sala trattamenti di SMIROS Medicina Estetica',
    title: 'Area colloquio e pianificazione clinica',
    locationNote: 'Prima visita e ascolto individuale',
    description:
      'La postazione dedicata all’anamnesi e alla definizione condivisa del percorso medico personalizzato.',
    objectPositionClass: 'object-[50%_68%]',
  },
  {
    id: 'sala-trattamenti',
    src: CLINIC_IMAGES.treatmentSuite,
    alt: 'Sala trattamenti ambulatoriale SMIROS Medicina Estetica con lettino medico, luce dedicata e scrivania',
    title: 'Sala trattamenti ambulatoriale',
    locationNote: 'Ambiente medico attrezzato',
    description:
      'Ambienti igienizzati e illuminazione dedicata per l’esecuzione delle procedure di medicina estetica.',
    objectPositionClass: 'object-[50%_66%]',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'prima-visita',
    question: 'Come si svolge la prima visita presso SMIROS Medicina Estetica?',
    answer:
      'La prima visita dura circa 40 minuti ed è dedicata esclusivamente all’ascolto, all’anamnesi clinica e all’analisi anatomica del volto. Al termine condividiamo un piano chiaro con indicazioni mediche, tempi e costi prima di decidere se procedere.',
  },
  {
    id: 'dolore-sicurezza',
    question: 'I trattamenti con acido ialuronico, botulino o Dermapen 4 sono fastidiosi?',
    answer:
      'Grazie alla mia formazione in Anestesia e Rianimazione adotto protocolli analgesici mirati (creme anestetiche efficaci, microcannule atraumatiche e tecniche delicate) per rendere ogni seduta confortevole e ben tollerata.',
  },
  {
    id: 'naturalezza',
    question: 'Come si evita un risultato artificiale o eccessivo?',
    answer:
      'Lavoro per micro-incrementi rispettando i piani anatomici e le proporzioni individuali. Quando indicato, distribuisco il percorso in sedute progressive evitando sovracorrezioni.',
  },
  {
    id: 'prenotazione-whatsapp',
    question: 'Come posso richiedere informazioni o fissare un appuntamento?',
    answer:
      'Puoi inviare un messaggio su WhatsApp al +39 351 317 1020 oppure compilare la richiesta guidata in fondo a questa pagina. Lo studio riceve su appuntamento dal lunedì al venerdì, dalle 09:00 alle 19:30.',
  },
  {
    id: 'sede-pescara',
    question: 'Dove si trova lo studio e chi esegue i trattamenti?',
    answer:
      'SMIROS Medicina Estetica si trova a Pescara in Corso Vittorio Emanuele II, 310. Tutte le visite e i trattamenti sono eseguiti personalmente da me, Dott. Simone A. Smiraglia.',
  },
];

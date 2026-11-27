export type TreatmentCategory =
  | 'tutti'
  | 'viso-volumi'
  | 'qualita-cutanea'
  | 'corpo';

export interface TreatmentProtocol {
  id: string;
  title: string;
  category: Exclude<TreatmentCategory, 'tutti'>;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  imageObjectPos: string;
  isIllustrative?: boolean;
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
  // Authentic studio & clinical photography
  studioMacbook: '/assets/aistudio/IMG_6879_daef3bd6.jpeg',
  waitingHall: '/assets/aistudio/IMG_6883_fc1a6c7b.jpeg',
  treatmentSuite: '/assets/aistudio/IMG_6886_cf28960d.jpeg',
  doctorPortrait: '/assets/aistudio/530E256A-3FB0-4446-9872-F101332E4E0A_9ba779e0.png',
  facialAssessment: '/assets/aistudio/79e48e76-e87c-47f6-bd68-472bab154ab4_5487e61a.png',
  precisionInjection: '/assets/aistudio/IMG_6882_de138f6b.jpeg',
  dermapenDetail: '/assets/aistudio/4F26F5D4-E0B3-4EF7-BCFA-F05C6351A397_479866b2.png',
  // Illustrative editorial visuals
  editorialPortraitHelix:
    '/assets/aistudio/Ritratto_di_bellezza_con_elica_dorata_b1a611c1.png',
  glassDoubleHelix:
    '/assets/aistudio/Doppia_elica_di_vetro_scintillante_2c0b5d80.png',
  bodyCareSilhouette:
    '/assets/aistudio/Gambe_abbronzate_su_fondo_beige_lucido_232b0893.png',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  'Buongiorno Dott. Smiraglia, vorrei richiedere informazioni e disponibilità per una visita presso SMIROS Medicina Estetica a Pescara.';

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    title: 'Diagnosi statica e dinamica del volto',
    description:
      'Ogni distretto cutaneo e muscolare risponde a equilibri propri. L’analisi clinica a riposo e durante la mimica precede sempre la scelta dell’eventuale procedura.',
  },
  {
    title: 'Dosaggi modulati nel tempo',
    description:
      'Preferisco interventi graduali e distribuiti in sedute mirate, evitando sovracorrezioni e rispettando l’anatomia individuale.',
  },
  {
    title: 'Dispositivi medici certificati CE',
    description:
      'Ogni prodotto e dispositivo utilizzato in ambulatorio è tracciabile, documentato in cartella e selezionato per qualità biologica e compatibilità tissutale.',
  },
];

export const TREATMENT_CATEGORIES: {
  id: TreatmentCategory;
  label: string;
}[] = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'viso-volumi', label: 'Viso e Volumi' },
  { id: 'qualita-cutanea', label: 'Qualità Cutanea' },
  { id: 'corpo', label: 'Corpo e Lassità' },
];

export const TREATMENTS: TreatmentProtocol[] = [
  {
    id: 'armonizzazione-full-face',
    title: 'Prima Visita e Valutazione Full Face',
    category: 'viso-volumi',
    categoryLabel: 'Diagnostica del Volto',
    image: CLINIC_IMAGES.facialAssessment,
    imageAlt:
      'Dott. Simone A. Smiraglia durante la valutazione anatomica del volto con tutela privacy SMIROS',
    imageObjectPos: 'object-[50%_20%]',
    duration: '40 min',
    recovery: 'Nessun tempo di recupero',
    shortDescription:
      'Esame medico dei terzi del volto, della qualità dermica e delle richieste del paziente per impostare un programma clinico ragionato.',
    natureOfTreatment:
      'Consulenza medica specialistica propedeutica a ogni trattamento ambulatoriale, dedicata ad anamnesi, studio delle proporzioni e definizione delle priorità.',
    possibleIndications: [
      'Valutazione integrata di terzo superiore, medio e inferiore del viso',
      'Pianificazione graduale tra procedure iniettive e cura della pelle',
      'Inquadramento preventivo anti-aging su misura',
    ],
    medicalEvaluationNote:
      'Ogni eventuale procedura è indicata solo dopo visita diretta ed esclusione di controindicazioni cliniche.',
    sessionProcess:
      'Osservo la mimica e i piani di sostegno facciale, illustrando al paziente possibilità reali, alternative e tempi di recupero.',
  },
  {
    id: 'iniettivi-volto',
    title: 'Tossina Botulinica e Filler con Acido Ialuronico',
    category: 'viso-volumi',
    categoryLabel: 'Viso, Labbra e Mimica',
    image: CLINIC_IMAGES.precisionInjection,
    imageAlt:
      'Dott. Simone A. Smiraglia durante una procedura iniettiva di precisione in studio',
    imageObjectPos: 'object-top',
    duration: '30–45 min',
    recovery: 'Ripresa in giornata o lieve edema transitorio',
    shortDescription:
      'Trattamenti iniettivi mirati per rughe d’espressione del terzo superiore, filler labbra, rinofiller, occhiaie e sostegno dei volumi.',
    natureOfTreatment:
      'Impiego mirato di tossina botulinica e acidi ialuronici medicali riassorbibili selezionati per reologia e piano anatomico.',
    possibleIndications: [
      'Modulazione di glabella, fronte e area perioculare tramite tossina botulinica',
      'Filler labbra, solchi nasogenieni, occhiaie e ridefinizione mandibolare',
      'Rinofiller non chirurgico in casi clinicamente selezionati',
    ],
    medicalEvaluationNote:
      'Formulazioni, volumi e scelta tra ago ultrasottile o microcannula sono decisi unicamente dopo visita medica.',
    sessionProcess:
      'Previa preparazione topica o locale, procedo al trattamento consegnando al paziente la tracciabilità completa del dispositivo.',
  },
  {
    id: 'qualita-cutanea-dermapen',
    title: 'Dermapen 4, Biorivitalizzazione e Peeling',
    category: 'qualita-cutanea',
    categoryLabel: 'Rinnovamento Dermico',
    image: CLINIC_IMAGES.dermapenDetail,
    imageAlt:
      'Trattamento di microneedling medico controllato con dispositivo Dermapen 4 presso SMIROS',
    imageObjectPos: 'object-center',
    duration: '35–45 min',
    recovery: 'Lieve eritema per 24–48 ore',
    shortDescription:
      'Microneedling medico con Dermapen 4, biostimolazione dermica e peeling medici per grana cutanea, luminosità, pori ed esiti superficiali.',
    natureOfTreatment:
      'Protocolli biologici e meccanici controllati per sostenere il turnover cellulare, la sintesi di collagene e l’idratazione del derma.',
    possibleIndications: [
      'Pori dilatati, rugosità sottili ed esiti cicatriziali post-acneici superficiali',
      'Cute spenta, disidratata o foto-esposta di viso, collo e décolleté',
      'Cicli stagionali di prevenzione e mantenimento della qualità cutanea',
    ],
    medicalEvaluationNote:
      'Profondità d’azione del manipolo, acidi per peeling e frequenza delle sedute variano in base a fototipo e stato cutaneo.',
    sessionProcess:
      'Dopo preparazione anestetica locale ove indicata, eseguo passaggi calibrati su ciascuna area completando con protocollo lenitivo.',
  },
  {
    id: 'corpo-cellulite-lassita',
    title: 'Cellulite, Lassità e Tono Cutaneo Corpo',
    category: 'corpo',
    categoryLabel: 'Medicina Estetica Corpo',
    image: CLINIC_IMAGES.bodyCareSilhouette,
    imageAlt:
      'Composizione editoriale illustrativa dedicata al tono e alla qualità cutanea del corpo',
    imageObjectPos: 'object-[50%_40%]',
    isIllustrative: true,
    duration: '30–45 min',
    recovery: 'Ritorno immediato alle attività',
    shortDescription:
      'Percorsi ambulatoriali per inestetismi legati a cellulite, microcircolo e lassità cutanea localizzata, definiti in sede di visita.',
    natureOfTreatment:
      'Valutazione clinica del tessuto sottocutaneo e pianificazione di metodiche mediche quali carbossiterapia e tecniche mirate per il microcircolo.',
    possibleIndications: [
      'Alterazioni del microcircolo periferico e ritenzione idrica localizzata',
      'Lassità cutanea lieve o moderata di arti inferiori e aree corporee mirate',
      'Miglioramento graduale della compattezza superficiale dei tessuti',
    ],
    medicalEvaluationNote:
      'Immagine a scopo puramente illustrativo. L’indicazione clinica effettiva e il numero di sedute sono stabiliti esclusivamente dal medico durante la visita.',
    sessionProcess:
      'Dopo inquadramento anamnestico, imposto un ciclo ambulatoriale progressivo eventualmente associato a indicazioni comportamentali.',
  },
];

export const VERIFIED_TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'tech-dermapen',
    title: 'Dermapen 4 a profondità digitale',
    category: 'Strumentazione dermica',
    description:
      'Manipolo medicale per microneedling con controllo micrometrico della penetrazione, adattabile ai diversi spessori di viso, collo e décolleté.',
    clinicalNote:
      'Permette di veicolare soluzioni sterili mirate con tempi di ripresa sociali brevi.',
  },
  {
    id: 'tech-microcannule',
    title: 'Microcannule atraumatiche e aghi sottili',
    category: 'Metodica iniettiva',
    description:
      'Selezione differenziata di microcannule a punta smussa e aghi ultrasottili per rispettare i piani vascolari e ridurre ecchimosi ed edema.',
    clinicalNote:
      'Associata esclusivamente a formulazioni medicali riassorbibili certificate.',
  },
  {
    id: 'tech-tessuti',
    title: 'Terapie per microcircolo e biorigenerazione',
    category: 'Prevenzione e corpo',
    description:
      'Integrazione tra biorivitalizzazione dermica, peeling controllati e metodiche ambulatoriali per cellulite e lassità tissutale.',
    clinicalNote:
      'Protocolli calibrati stagionalmente sulla risposta biologica individuale.',
  },
];

export const STUDIO_GALLERY: StudioGalleryItem[] = [
  {
    id: 'reception-attesa',
    src: CLINIC_IMAGES.waitingHall,
    alt: 'Area accoglienza e ingresso di SMIROS Medicina Estetica in Corso Vittorio Emanuele II, 310 a Pescara',
    title: 'Accoglienza riservata',
    locationNote: 'Corso Vittorio Emanuele II, 310 · Pescara',
    description:
      'Ingresso luminoso e silenzioso, gestito solo su appuntamento per garantire puntualità e privacy senza attese.',
    objectPositionClass: 'object-center',
  },
  {
    id: 'studio-direzionale',
    src: CLINIC_IMAGES.studioMacbook,
    alt: 'Postazione medica di consulenza e vista sulla sala trattamenti di SMIROS Medicina Estetica',
    title: 'Studio di consulenza',
    locationNote: 'Anamnesi e pianificazione',
    description:
      'Lo spazio dedicato al colloquio clinico preliminare, alla lettura dell’anatomia facciale e alla definizione del percorso.',
    objectPositionClass: 'object-[50%_68%]',
  },
  {
    id: 'sala-trattamenti',
    src: CLINIC_IMAGES.treatmentSuite,
    alt: 'Sala trattamenti ambulatoriale SMIROS Medicina Estetica con lettino medico e illuminazione dedicata',
    title: 'Sala ambulatoriale',
    locationNote: 'Procedure mediche',
    description:
      'Ambiente clinico attrezzato e sanificato con illuminazione dedicata per l’esecuzione delle sedute in sicurezza.',
    objectPositionClass: 'object-[50%_66%]',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'prima-visita',
    question: 'Come si svolge la prima visita presso lo studio?',
    answer:
      'La visita dura circa 40 minuti ed è dedicata ad anamnesi, esame obiettivo del viso o dell’area di interesse e definizione scritta di indicazioni, tempi e costi prima di procedere.',
  },
  {
    id: 'comfort-recupero',
    question: 'I trattamenti sono dolorosi o richiedono assenza dal lavoro?',
    answer:
      'Utilizzo protocolli anestesiologici topici o locali mirati e microcannule atraumatiche per rendere le sedute ben tollerate. Nella maggior parte dei casi la ripresa sociale avviene in giornata o entro 24–48 ore.',
  },
  {
    id: 'tracciabilita',
    question: 'Che tipo di prodotti vengono impiegati in ambulatorio?',
    answer:
      'Impiego esclusivamente dispositivi medici e farmaci autorizzati e certificati CE, consegnando al termine della seduta il riferimento di tracciabilità.',
  },
  {
    id: 'sede-orari',
    question: 'Dove si trova SMIROS e come si prenota un appuntamento?',
    answer:
      'Lo studio è in Corso Vittorio Emanuele II, 310 a Pescara e riceve su appuntamento dal lunedì al venerdì (09:00–19:30) tramite WhatsApp o telefono al +39 351 317 1020.',
  },
];

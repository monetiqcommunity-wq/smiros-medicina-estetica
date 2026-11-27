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
  duration: string;
  recovery: string;
  summary: string;
  clinicalObjective: string;
  sessionProcess: string;
  indications: string[];
  postCareNote: string;
}

export interface PhilosophyPillar {
  title: string;
  description: string;
}

export interface MethodologyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  clinicalBasis: string;
}

export interface StudioGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  aspectClass: string;
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
  studioInterior: '/assets/aistudio/IMG_6879_daef3bd6.jpeg',
  dermapenTreatment: '/assets/aistudio/4F26F5D4-E0B3-4EF7-BCFA-F05C6351A397_479866b2.png',
  doctorPortrait: '/assets/aistudio/530E256A-3FB0-4446-9872-F101332E4E0A_9ba779e0.png',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  'Buongiorno Dott. Smiraglia, vorrei richiedere informazioni e disponibilità per una consulenza presso SMIROS Medicina Estetica a Pescara.';

export const HERO_SLIDES = [
  {
    id: 'medicina-estetica',
    tabLabel: 'Medicina estetica',
    kicker: 'SMIROS Medicina Estetica · Pescara',
    title: 'Equilibrio, misura e ascolto clinico per il tuo volto.',
    subtitle:
      'Nel mio studio a Pescara ti accompagno in percorsi medici personalizzati di estetica del volto e prevenzione dell’invecchiamento cutaneo.',
    image: CLINIC_IMAGES.studioInterior,
    imageAlt:
      'Studio medico SMIROS Medicina Estetica a Pescara con postazione clinica e sala trattamenti',
    objectPosition: 'object-[50%_62%]',
    ctaLabel: 'Richiedi informazioni su WhatsApp',
    whatsappMessage: DEFAULT_WHATSAPP_MESSAGE,
  },
  {
    id: 'trattamenti-personalizzati',
    tabLabel: 'Trattamenti personalizzati',
    kicker: 'Protocolli su misura · Qualità cutanea e volumi',
    title: 'Ogni indicazione nasce dall’analisi della tua anatomia.',
    subtitle:
      'Trattamenti mirati con acido ialuronico, microneedling medico Dermapen 4 e biostimolazione, calibrati sul rispetto naturale dei tessuti.',
    image: CLINIC_IMAGES.dermapenTreatment,
    imageAlt:
      'Trattamento di microneedling medico con Dermapen 4 presso SMIROS Medicina Estetica',
    objectPosition: 'object-[50%_50%]',
    ctaLabel: 'Chiedi una valutazione su WhatsApp',
    whatsappMessage:
      'Buongiorno Dott. Smiraglia, vorrei ricevere informazioni sui trattamenti personalizzati presso SMIROS Medicina Estetica.',
  },
  {
    id: 'dott-smiraglia',
    tabLabel: 'Dott. Simone Smiraglia',
    kicker: 'Direzione Sanitaria · Anestesia, Rianimazione e Medicina Estetica',
    title: 'Competenza medica e attenzione individuale in ogni seduta.',
    subtitle:
      'Eseguo personalmente ogni visita e procedura, integrando sicurezza anestesiologica, controllo del comfort e tracciabilità dei dispositivi medici.',
    image: CLINIC_IMAGES.doctorPortrait,
    imageAlt:
      'Dott. Simone A. Smiraglia nello studio SMIROS Medicina Estetica a Pescara',
    objectPosition: 'object-[50%_36%]',
    ctaLabel: 'Prenota una visita su WhatsApp',
    whatsappMessage:
      'Buongiorno Dott. Smiraglia, vorrei prenotare una prima visita conoscitiva presso lo studio di Pescara.',
  },
] as const;

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    title: 'Valutazione anatomica prima di qualsiasi proposta',
    description:
      'Ogni percorso inizia con un colloquio medico approfondito. Osservo le proporzioni del volto, la dinamica espressiva e la qualità della pelle per proporre esclusivamente ciò che risponde a una reale esigenza clinica.',
  },
  {
    title: 'Sicurezza anestesiologica e gestione del comfort',
    description:
      'La mia specializzazione in Anestesia e Rianimazione guida ogni gesto ambulatoriale: conoscenza rigorosa dei piani vascolari, riduzione del disagio durante la seduta e attenzione costante alla sicurezza del paziente.',
  },
  {
    title: 'Gradualità e rispetto dell’identità espressiva',
    description:
      'Evito correzioni standardizzate o eccessive. Preferisco interventi progressivi e misurati che rispettino la fisionomia naturale di chi si affida al mio studio.',
  },
];

export const TREATMENT_CATEGORIES: {
  id: TreatmentCategory;
  label: string;
  description: string;
}[] = [
  {
    id: 'tutti',
    label: 'Tutti i trattamenti',
    description:
      'Panoramica completa dei percorsi ambulatoriali eseguiti personalmente dal Dott. Simone A. Smiraglia.',
  },
  {
    id: 'viso-volumi',
    label: 'Viso e Volumi',
    description:
      'Interventi mirati al sostegno dei compartimenti del volto, alla definizione dei contorni e all’armonizzazione delle labbra.',
  },
  {
    id: 'qualita-cutanea',
    label: 'Qualità Cutanea',
    description:
      'Protocolli dedicati al rinnovamento dermico, alla texture cutanea e alla stimolazione biologica del collagene.',
  },
  {
    id: 'prevenzione',
    label: 'Consulenza e Anti-Aging',
    description:
      'Valutazione clinica iniziale e piani preventivi calibrati sull’evoluzione fisiologica dei tessuti nel tempo.',
  },
];

export const TREATMENTS: TreatmentProtocol[] = [
  {
    id: 'consulenza-medica',
    title: 'Visita di Medicina Estetica',
    category: 'prevenzione',
    categoryLabel: 'Consulenza e Anti-Aging',
    duration: '40 min',
    recovery: 'Nessun tempo di recupero',
    summary:
      'Il primo incontro dedicato all’ascolto delle tue esigenze, all’anamnesi clinica e alla costruzione condivisa di un piano medico su misura.',
    clinicalObjective:
      'Analizzare lo stato dei tessuti, le proporzioni del volto e la mimica muscolare per definire priorità realistiche, tempi e modalità di intervento prima di eseguire qualsiasi trattamento.',
    sessionProcess:
      'Dopo una raccolta anamnestica completa, valutiamo insieme le aree di interesse e definiamo un programma graduale e trasparente, comprensivo di indicazioni domiciliari.',
    indications: [
      'Primo avvicinamento consapevole alla medicina estetica',
      'Pianificazione progressiva di trattamenti combinati',
      'Valutazione di procedure eseguite in precedenza',
    ],
    postCareNote:
      'Al termine della consulenza ricevi un riepilogo chiaro del percorso proposto senza alcun obbligo di trattamento immediato.',
  },
  {
    id: 'acido-ialuronico',
    title: 'Trattamenti con Acido Ialuronico',
    category: 'viso-volumi',
    categoryLabel: 'Viso e Volumi',
    duration: '30–45 min',
    recovery: 'Possibile lieve gonfiore transitorio',
    summary:
      'Ripristino misurato dei volumi, sostegno strutturale del volto e armonizzazione naturale di labbra e solchi.',
    clinicalObjective:
      'Restituire equilibrio ai volumi profondi e ridefinire i profili rispettando la mobilità naturale del sorriso e dell’espressività.',
    sessionProcess:
      'Utilizzo acido ialuronico medicale certificato a reologia specifica per ogni distretto anatomico, applicato mediante microcannule atraumatiche o aghi sottili previa preparazione anestetica locale o topica.',
    indications: [
      'Idratazione e armonizzazione dei volumi labiali',
      'Sostegno dell’area zigomatica e del terzo medio',
      'Attenuazione dei solchi nasogenieni e ridefinizione mandibolare',
    ],
    postCareNote:
      'Consegna della tracciabilità del dispositivo medico utilizzato e indicazioni comportamentali per le 48 ore successive.',
  },
  {
    id: 'dermapen-microneedling',
    title: 'Microneedling con Dermapen 4',
    category: 'qualita-cutanea',
    categoryLabel: 'Qualità Cutanea',
    duration: '35–45 min',
    recovery: 'Lieve rossore per 24–48 ore',
    summary:
      'Trattamento di stimolazione dermica controllata con dispositivo Dermapen 4 per migliorare grana, compattezza e uniformità cutanea.',
    clinicalObjective:
      'Attivare i fisiologici processi di rinnovamento del derma e favorire l’assorbimento mirato di soluzioni sterili biorivitalizzanti.',
    sessionProcess:
      'Dopo detersione medica e applicazione di crema anestetica, eseguo passaggi calibrati regolando la profondità dei micro-aghi in base allo spessore di ciascuna area di viso, collo o décolleté.',
    indications: [
      'Irregolarità della texture cutanea e pori dilatati',
      'Esiti cicatriziali superficiali e linee sottili',
      'Perdita di compattezza e luminosità di viso e collo',
    ],
    postCareNote:
      'È fondamentale evitare l’esposizione solare diretta e utilizzare fotoprotezione alta nei giorni successivi alla seduta.',
  },
  {
    id: 'biorivitalizzazione',
    title: 'Biorivitalizzazione Cutanea',
    category: 'qualita-cutanea',
    categoryLabel: 'Qualità Cutanea',
    duration: '30 min',
    recovery: 'Eventuali micro-segni per 24 ore',
    summary:
      'Micro-infusioni dermiche di acido ialuronico libero e complessi biostimolanti per nutrire e sostenere la fisiologia della pelle.',
    clinicalObjective:
      'Migliorare idratazione profonda, elasticità e risposta biologica dei fibroblasti senza modificare i volumi del volto.',
    sessionProcess:
      'La seduta si svolge in ambulatorio tramite micro-iniezioni superficiali mirate su viso, collo o décolleté, modulate in cicli personalizzati.',
    indications: [
      'Pelle disidratata, sottile o segnata da stress ambientale',
      'Supporto cutaneo nei cambi di stagione',
      'Prevenzione dell’invecchiamento dermico precoce',
    ],
    postCareNote:
      'Ritorno alle normali attività quotidiane in giornata seguendo semplici accorgimenti igienici e fotoprotettivi.',
  },
  {
    id: 'tossina-botulinica',
    title: 'Trattamento Rughe d’Espressione',
    category: 'viso-volumi',
    categoryLabel: 'Viso e Volumi',
    duration: '20–30 min',
    recovery: 'Ripresa delle attività in giornata',
    summary:
      'Modulazione mirata dell’iperattività muscolare del terzo superiore del volto per distendere lo sguardo mantenendo naturalezza.',
    clinicalObjective:
      'Ridurre la tensione dei muscoli responsabili delle rughe di fronte, glabella e contorno occhi evitando ogni effetto rigido.',
    sessionProcess:
      'Previa mappatura dinamica della mimica facciale, eseguo micro-infiltrazioni mirate con ago ultrasottile e programmo una rivalutazione clinica di controllo a distanza di circa due settimane.',
    indications: [
      'Rughe glabellari tra le sopracciglia',
      'Linee orizzontali della fronte',
      'Rughe perioculari laterali',
    ],
    postCareNote:
      'L’effetto si sviluppa progressivamente nei giorni successivi alla seduta; nelle prime ore si evita di massaggiare o comprimere la zona trattata.',
  },
  {
    id: 'medicina-preventiva',
    title: 'Medicina Anti-Aging e Preventiva',
    category: 'prevenzione',
    categoryLabel: 'Consulenza e Anti-Aging',
    duration: '45 min',
    recovery: 'Nessun tempo di recupero',
    summary:
      'Strategia medica longitudinale dedicata alla preservazione della salute cutanea e dell’equilibrio dei tessuti nel medio e lungo periodo.',
    clinicalObjective:
      'Accompagnare l’evoluzione fisiologica del volto attraverso protocolli combinati personalizzati e indicazioni dermocosmetiche mirate.',
    sessionProcess:
      'Integriamo valutazione medica, programmazione stagionale di eventuali sedute ambulatoriali leggere e impostazione di una routine domiciliare essenziale ed efficace.',
    indications: [
      'Percorsi preventivi dai 28–35 anni in poi',
      'Mantenimento equilibrato di precedenti trattamenti',
      'Razionalizzazione della routine skincare su base medica',
    ],
    postCareNote:
      'Controlli periodici programmati in base alle caratteristiche cutanee e alla stagionalità.',
  },
];

export const METHODOLOGIES: MethodologyItem[] = [
  {
    id: 'dermapen-4',
    title: 'Dermapen 4 per microneedling medico',
    subtitle: 'Rigenerazione controllata',
    description:
      'Dispositivo medico impiegato nello studio per eseguire micro-perforazioni verticali precise e regolabili in profondità su viso, collo e décolleté, favorendo la stimolazione dermica e la veicolazione sterile di principi attivi.',
    clinicalBasis: 'Utilizzato in protocolli personalizzati previa preparazione anestetica topica.',
  },
  {
    id: 'acido-ialuronico-certificato',
    title: 'Acido Ialuronico a reologia differenziata',
    subtitle: 'Volumi e idratazione',
    description:
      'Formulazioni medicali certificate selezionate in base al piano anatomico da trattare: gel più coesivi per il sostegno profondo, formulazioni morbide per labbra e aree dinamiche, acido ialuronico libero per la biorivitalizzazione.',
    clinicalBasis: 'Applicazione con microcannule atraumatiche o aghi ultrasottili e consegna della tracciabilità.',
  },
  {
    id: 'approccio-anestesiologico',
    title: 'Metodologia anestesiologica e sicurezza clinica',
    subtitle: 'Comfort e padronanza anatomica',
    description:
      'L’esperienza specialistica in Anestesia e Rianimazione consente di gestire con rigore la preparazione analgesica della cute, l’anatomia vascolare dei distretti trattati e l’assistenza clinica in ogni fase della seduta.',
    clinicalBasis: 'Procedure eseguite personalmente dal Dott. Simone A. Smiraglia in ambiente medico.',
  },
];

export const STUDIO_GALLERY: StudioGalleryItem[] = [
  {
    id: 'studio-ambiente',
    src: CLINIC_IMAGES.studioInterior,
    alt: 'Studio SMIROS Medicina Estetica a Pescara con scrivania medica, sala trattamenti e area accoglienza',
    title: 'La sala medica e l’area accoglienza',
    caption: 'Corso Vittorio Emanuele II, 310 · Pescara',
    aspectClass: 'aspect-[4/5]',
    objectPositionClass: 'object-[50%_65%]',
  },
  {
    id: 'trattamento-dermapen',
    src: CLINIC_IMAGES.dermapenTreatment,
    alt: 'Esecuzione del trattamento medico con Dermapen 4 presso SMIROS Medicina Estetica',
    title: 'Protocolli cutanei con Dermapen 4',
    caption: 'Precisione applicativa in ambiente controllato',
    aspectClass: 'aspect-square',
    objectPositionClass: 'object-center',
  },
  {
    id: 'dott-smiraglia-studio',
    src: CLINIC_IMAGES.doctorPortrait,
    alt: 'Dott. Simone A. Smiraglia nello studio SMIROS Medicina Estetica a Pescara',
    title: 'Colloquio e pianificazione clinica',
    caption: 'Dott. Simone A. Smiraglia · Ricevimento su appuntamento',
    aspectClass: 'aspect-[3/4]',
    objectPositionClass: 'object-top',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'prima-visita',
    question: 'Come si svolge la prima visita presso SMIROS Medicina Estetica?',
    answer:
      'La prima visita dura circa 40 minuti ed è interamente dedicata all’ascolto delle tue aspettative, all’anamnesi clinica e all’analisi anatomica del volto. Al termine condividiamo un piano terapeutico chiaro con obiettivi realistici, tempi e costi prima di decidere se e come procedere.',
  },
  {
    id: 'dolore-sicurezza',
    question: 'I trattamenti con filler o Dermapen 4 sono fastidiosi?',
    answer:
      'La gestione del comfort è parte integrante del metodo medico. Grazie alla mia specializzazione in Anestesia e Rianimazione adotto protocolli analgesici mirati — creme anestetiche efficaci, microcannule atraumatiche e tecniche delicate — per rendere ogni seduta ben tollerata.',
  },
  {
    id: 'naturalezza',
    question: 'Come viene preservata la naturalezza dei lineamenti?',
    answer:
      'Lavoro per micro-incrementi rispettando i piani anatomici e le proporzioni individuali del volto. Quando indicato, preferisco distribuire il percorso in più sedute progressive anziché intervenire in modo eccessivo in un’unica occasione.',
  },
  {
    id: 'prenotazione-whatsapp',
    question: 'Come posso richiedere un appuntamento o informazioni?',
    answer:
      'Puoi scrivere direttamente tramite WhatsApp al +39 351 317 1020 oppure compilare la richiesta guidata nella sezione contatti di questa pagina. Riceviamo su appuntamento dal lunedì al venerdì, dalle 09:00 alle 19:30.',
  },
  {
    id: 'sede-pescara',
    question: 'Dove si trova lo studio e chi esegue i trattamenti?',
    answer:
      'Lo studio SMIROS Medicina Estetica si trova a Pescara in Corso Vittorio Emanuele II, 310. Tutte le visite e le procedure vengono eseguite personalmente dal Dott. Simone A. Smiraglia.',
  },
];

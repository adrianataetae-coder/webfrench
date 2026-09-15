export type Level = 'a1' | 'a2' | 'b1';

export interface Version {
  name: string;
  label: string;
  french: string;
  translation: string;
  question: string;
  questionPronunciation: string;
  pronunciation: string;
  substitution: string;
  substitutionPronunciation: string;
}

export interface Phrase {
  id: number;
  title: string;
  context: string;
  versions: Version[];
}

export interface Block {
  id: number;
  title: string;
  phrases: Phrase[];
}

export interface VocabItem {
  term: string;
  pronunciation: string;
  translation: string;
}

export interface Lesson {
  slug: string;
  level: Level;
  title: string;
  theme: string;
  tense: string;
  audioPath: string;
  blocks: Block[];
  vocabulary: VocabItem[];
}

export interface LevelInfo {
  id: Level;
  name: string;
  description: string;
  color: string;
  lessons: LessonMeta[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  theme: string;
}

export const LEVELS: LevelInfo[] = [
  {
    id: 'a1',
    name: 'A1 - Presente',
    description: 'Presente de indicativo. Vocabulario cotidiano y estructuras básicas.',
    color: '#10b981',
    lessons: [
      { slug: 'bano', title: 'Baño', theme: 'Aseo personal y rutina' },
      { slug: 'cocina', title: 'Cocina', theme: 'Cocinar y alimentación' },
      { slug: 'dormitorio', title: 'Dormitorio', theme: 'Descanso y rutina' },
      { slug: 'espacio_publico', title: 'Espacio Público', theme: 'Transporte y ciudad' },
      { slug: 'sala_comedor', title: 'Salón/Comedor', theme: 'Hogar y convivencia' },
      { slug: 'servicios', title: 'Servicios', theme: 'Trámites y servicios' },
      { slug: 'trabajo', title: 'Trabajo', theme: 'Oficina y profesión' },
    ],
  },
  {
    id: 'a2',
    name: 'A2 - Pasado',
    description: 'Passé Composé e Imparfait. Narración y descripción en el pasado.',
    color: '#3b82f6',
    lessons: [
      { slug: 'bano', title: 'Baño', theme: 'Pasado en el aseo' },
      { slug: 'cocina', title: 'Cocina', theme: 'Pasado en la cocina' },
      { slug: 'dormitorio', title: 'Dormitorio', theme: 'Pasado en el descanso' },
      { slug: 'espacio_publico', title: 'Espacio Público', theme: 'Pasado en la ciudad' },
      { slug: 'sala_comedor', title: 'Salón/Comedor', theme: 'Pasado en el hogar' },
      { slug: 'servicios', title: 'Servicios', theme: 'Pasado en trámites' },
      { slug: 'trabajo', title: 'Trabajo', theme: 'Pasado laboral' },
    ],
  },
  {
    id: 'b1',
    name: 'B1 - Futuro e Hipótesis',
    description: 'Futuro simple, futuro próximo y condicional. Planes e hipótesis.',
    color: '#8b5cf6',
    lessons: [
      { slug: 'bano', title: 'Baño', theme: 'Futuro en el aseo' },
      { slug: 'cocina', title: 'Cocina', theme: 'Futuro en la cocina' },
      { slug: 'dormitorio', title: 'Dormitorio', theme: 'Futuro en el descanso' },
      { slug: 'espacio_publico', title: 'Espacio Público', theme: 'Futuro en la ciudad' },
      { slug: 'sala_comedor', title: 'Salón/Comedor', theme: 'Futuro en el hogar' },
      { slug: 'servicios', title: 'Servicios', theme: 'Futuro en trámites' },
      { slug: 'trabajo', title: 'Trabajo', theme: 'Futuro laboral' },
    ],
  },
];

export const THEMES: Record<string, string> = {
  bano: 'salle de bains',
  cocina: 'cuisine',
  dormitorio: 'chambre',
  espacio_publico: 'espace public',
  sala_comedor: 'salon',
  services: 'services',
  servicios: 'services',
  travail: 'travail',
  trabajo: 'travail',
};

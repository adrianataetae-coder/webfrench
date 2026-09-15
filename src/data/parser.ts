import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import type { Lesson, Block, Phrase, Version, VocabItem, Level } from './types';

const lessonsDir = join(process.cwd(), 'src', 'lessons');

function stripFormatting(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/_/g, '')
    .replace(/\*/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();
}

function stripAll(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/_/g, '')
    .replace(/\*/g, '')
    .trim();
}

function parseVersion(lines: string[]): Version | null {
  if (lines.length === 0) return null;

  const headerLine = lines[0];
  const nameMatch = headerLine.match(/\*\*Versión\s+(.+?):\*\*\s*(.+?)$/);
  if (!nameMatch) return null;

  const label = stripAll(nameMatch[1].trim());
  const frenchRaw = nameMatch[2].trim();
  const french = stripAll(frenchRaw.replace(/^\*+/, '').replace(/\*+$/, '')).trim();

  let translation = '';
  let question = '';
  let questionPronunciation = '';
  let pronunciation = '';
  let substitution = '';
  let substitutionPronunciation = '';

  let lastField = '';

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.match(/^[-*]\s+\*\*/)) continue;

    if (line.match(/^[-*]\s+\*\*Traducción:\*\*/)) {
      translation = stripAll(line.replace(/^[-*]\s+\*\*Traducción:\*\*/, ''));
      lastField = 'traduccion';
    } else if (line.match(/^[-*]\s+\*\*Pregunta:\*\*/)) {
      const raw = line.replace(/^[-*]\s+\*\*Pregunta:\*\*/, '').trim();
      question = stripAll(raw);
      lastField = 'pregunta';
    } else if (line.match(/^[-*]\s+\*\*Sustitución:\*\*/)) {
      const raw = line.replace(/^[-*]\s+\*\*Sustitución:\*\*/, '').trim();
      substitution = stripAll(raw);
      lastField = 'sustitucion';
    } else if (line.match(/^[-*]\s+\*\*Pronunciación Pregunta:\*\*/)) {
      questionPronunciation = stripAll(line.replace(/^[-*]\s+\*\*Pronunciación Pregunta:\*\*/, ''));
      lastField = '';
    } else if (line.match(/^[-*]\s+\*\*Pronunciación Sustitución:\*\*/)) {
      substitutionPronunciation = stripAll(line.replace(/^[-*]\s+\*\*Pronunciación Sustitución:\*\*/, ''));
      lastField = '';
    } else if (line.match(/^[-*]\s+\*\*Pronunciación:\*\*/)) {
      const pronText = stripAll(line.replace(/^[-*]\s+\*\*Pronunciación:\*\*/, ''));
      if (lastField === 'pregunta') {
        questionPronunciation = pronText;
      } else if (lastField === 'sustitucion') {
        substitutionPronunciation = pronText;
      } else {
        pronunciation = pronText;
      }
      lastField = '';
    }
  }

  const name = label.toLowerCase()
    .replace(/_/g, '')
    .replace('base (estándar)', 'base')
    .replace('base (estandar)', 'base')
    .replace('real talk', 'realTalk')
    .replace('estilo indirecto con énfasis', 'indirectoEnfasis')
    .replace('estilo indirecto con enfasis', 'indirectoEnfasis')
    .replace('estilo indirecto', 'indirecto')
    .replace('voz pasiva (pasado)', 'vozPasiva')
    .replace('voz pasiva (imperfecto)', 'vozPasiva')
    .replace('voz pasiva', 'vozPasiva')
    .replace('hipótesis / condicional', 'hipotesis')
    .replace('hipotesis / condicional', 'hipotesis');

  return { name, label, french, translation, question, questionPronunciation, pronunciation, substitution, substitutionPronunciation };
}

function parsePhrasesFromLines(lines: string[]): Phrase[] {
  const phrases: Phrase[] = [];
  let currentVersions: string[] = [];
  let phraseTitle = '';
  let phraseContext = '';
  let phraseNum = 0;

  function flushPhrase() {
    if (currentVersions.length > 0 && phraseTitle) {
      const versions: Version[] = [];
      let versionLines: string[] = [];
      for (const line of currentVersions) {
        if (line.match(/^\s*[-*]\s+\*\*Versión/)) {
          const v = parseVersion(versionLines);
          if (v) versions.push(v);
          versionLines = [];
        }
        versionLines.push(line);
      }
      const v = parseVersion(versionLines);
      if (v) versions.push(v);

      if (versions.length > 0) {
        phraseNum++;
        phrases.push({
          id: phraseNum,
          title: phraseTitle,
          context: phraseContext,
          versions,
        });
      }
    }
    currentVersions = [];
    phraseTitle = '';
    phraseContext = '';
  }

  for (const line of lines) {
    const phraseMatch = line.match(/^#{3,5}\s+Frase\s+\d+[.:]\s*(.+)/);
    if (phraseMatch) {
      flushPhrase();
      const raw = stripAll(phraseMatch[1].trim());
      const ctxMatch = raw.match(/\((.+?)\)\s*$/);
      phraseContext = ctxMatch ? ctxMatch[1] : '';
      phraseTitle = ctxMatch ? raw.replace(ctxMatch[0], '').trim() : raw;
    } else if (line.match(/^\s*[-*]\s+\*\*Versión/)) {
      currentVersions.push(line);
    } else if (currentVersions.length > 0 && line.trim().match(/^[-*]\s+\*\*/)) {
      currentVersions.push(line);
    }
  }
  flushPhrase();

  return phrases;
}

function parseVocabulary(lines: string[]): VocabItem[] {
  const vocab: VocabItem[] = [];
  for (const line of lines) {
    const match = line.match(/^[-*]\s+\*\*(.+?)\*\*\s+\((.+?)\):\s*(.+)/);
    if (match) {
      vocab.push({
        term: stripAll(match[1].trim()),
        pronunciation: stripAll(match[2].trim()),
        translation: stripAll(match[3].trim()),
      });
    }
  }
  return vocab;
}

function mapThemeToAudioDir(theme: string): string {
  const map: Record<string, string> = {
    baño: 'bano',
    bano: 'bano',
    cocina: 'cocina',
    dormitorio: 'dormitorio',
    'espacio público': 'espacio_publico',
    espacio_publico: 'espacio_publico',
    'salón/comedor': 'sala_comedor',
    'sala/comedor': 'sala_comedor',
    sala_comedor: 'sala_comedor',
    servicios: 'servicios',
    trabajo: 'trabajo',
  };
  return map[theme.toLowerCase()] || theme.toLowerCase().replace(/\s+/g, '_');
}

function parseLessonFile(filePath: string, level: Level): Lesson | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const fileName = basename(filePath, '.md');

    let theme = fileName
      .replace(/^A1\s+/i, '')
      .replace(/^A2\s+/i, '')
      .replace(/^B1\s+/i, '')
      .replace(/\s*\(.*\)\s*$/, '')
      .trim();

    const audioDir = mapThemeToAudioDir(theme);

    const blocks: Block[] = [];
    let currentBlockLines: string[] = [];
    let blockTitle = '';
    let blockNum = 0;

    const vocabLines: string[] = [];
    let inVocab = false;
    let inGrammarPreface = false;

    function flushBlock() {
      if (currentBlockLines.length > 0) {
        const phrases = parsePhrasesFromLines(currentBlockLines);
        if (phrases.length > 0) {
          blockNum++;
          const title = blockTitle || `Bloque ${blockNum}`;
          blocks.push({ id: blockNum, title, phrases });
        }
      }
      currentBlockLines = [];
      blockTitle = '';
    }

    for (const line of lines) {
      if (line.match(/^###\s+Vocabulario/i) || line.match(/^###\s+Vocabulaire/i)) {
        flushBlock();
        inVocab = true;
        inGrammarPreface = false;
        continue;
      }

      if (line.match(/^###\s+\d+\.\s+/) || line.match(/^###\s+Resumen/i)) {
        inGrammarPreface = true;
        inVocab = false;
        continue;
      }

      const blockMatch = line.match(/^###\s+Bloque\s+\d+\s*[.:]\s*(.+)/);
      if (blockMatch) {
        if (inGrammarPreface) {
          inGrammarPreface = false;
        }
        inVocab = false;
        flushBlock();
        blockTitle = stripAll(blockMatch[1].trim().replace(/\s*\(.*\)\s*$/, '').trim());
        continue;
      }

      if (inVocab) {
        vocabLines.push(line);
        continue;
      }

      if (inGrammarPreface) {
        continue;
      }

      currentBlockLines.push(line);
    }

    flushBlock();

    const vocabulary = parseVocabulary(vocabLines);

    let tense = '';
    if (level === 'a1') tense = 'Presente de indicativo';
    else if (level === 'a2') tense = 'Passé Composé e Imparfait';
    else tense = 'Futuro e Hipótesis';

    return {
      slug: audioDir,
      level,
      title: theme,
      theme,
      tense,
      audioPath: `/audio/${level}/${audioDir}`,
      blocks,
      vocabulary,
    };
  } catch (e) {
    console.error(`Error parsing ${filePath}:`, e);
    return null;
  }
}

export function loadAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  const levels: Level[] = ['a1', 'a2', 'b1'];

  const allFiles = readdirSync(lessonsDir);

  for (const level of levels) {
    const prefix = level.toUpperCase();
    const levelFiles = allFiles.filter(f => {
      return f.startsWith(prefix) && f.endsWith('.md') && !f.toLowerCase().startsWith('examen');
    });

    for (const file of levelFiles) {
      const lesson = parseLessonFile(join(lessonsDir, file), level);
      if (lesson) lessons.push(lesson);
    }
  }

  return lessons;
}

export function getLessonsByLevel(level: Level): Lesson[] {
  return loadAllLessons().filter(l => l.level === level);
}

export function getLesson(level: Level, slug: string): Lesson | undefined {
  return loadAllLessons().find(l => l.level === level && l.slug === slug);
}

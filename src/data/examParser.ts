import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface ExamOption {
  label: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number | string;
  text: string;
  type: 'input' | 'choice' | 'select' | 'textarea';
  options?: ExamOption[];
  prefix?: string;
  answer?: string;
}

export interface ExamSection {
  title: string;
  instructions: string;
  questions: ExamQuestion[];
}

export interface Exam {
  title: string;
  sections: ExamSection[];
}

export function loadExam(level: string): Exam | null {
  try {
    const lessonsDir = join(process.cwd(), 'src', 'lessons');
    let fileName: string;
    if (level === 'a2') {
      fileName = 'Examen a2.md';
    } else {
      fileName = `Examen ${level.toUpperCase()}.md`;
    }
    const filePath = join(lessonsDir, fileName);
    const content = readFileSync(filePath, 'utf-8');

    const lines = content.split('\n');
    let title = '';
    const sections: ExamSection[] = [];
    let currentTitle = '';
    let currentLines: string[] = [];

    function flushSection() {
      if (currentTitle) {
        sections.push(parseSection(currentTitle, currentLines, sections.length));
      }
      currentTitle = '';
      currentLines = [];
    }

    for (const line of lines) {
      if (line.startsWith('### ')) {
        title = line.replace('### ', '').trim();
      } else if (line.startsWith('#### ')) {
        flushSection();
        currentTitle = line.replace('#### ', '').trim();
      } else {
        currentLines.push(line);
      }
    }
    flushSection();

    return { title, sections };
  } catch (e) {
    console.error(`Error loading exam for ${level}:`, e);
    return null;
  }
}

function clean(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\\rightarrow/g, '→')
    .replace(/_{3,}/g, 'BLANKMARKER')
    .trim();
}

function parseSection(title: string, lines: string[], sectionIdx: number): ExamSection {
  let instructions = '';
  const questions: ExamQuestion[] = [];
  const options: ExamOption[] = [];
  let collectingOptions = false;
  let qNum = 0;
  let currentPrefix = '';

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    i++;

    if (!trimmed) continue;

    if (trimmed.startsWith('_') && trimmed.endsWith('_') && !trimmed.match(/^\d/)) {
      const inner = trimmed.replace(/^_|_$/g, '');
      if (inner.startsWith('Opciones')) {
        collectingOptions = true;
        continue;
      }
      instructions += inner + ' ';
      continue;
    }

    if (collectingOptions) {
      const optMatch = trimmed.match(/^-\s+([A-Z])\)\s+(.*)/);
      if (optMatch) {
        options.push({ label: optMatch[1], text: clean(optMatch[2]) });
        continue;
      }
      if (trimmed.match(/^\d+\./) || trimmed.startsWith('**')) {
        collectingOptions = false;
      } else {
        continue;
      }
    }

    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      currentPrefix = clean(trimmed.replace(/\*\*/g, ''));
      continue;
    }

    const qMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
    if (qMatch) {
      const qText = qMatch[2].trim();
      const collectedLines: string[] = [qText];

      while (i < lines.length) {
        const nextTrimmed = lines[i].trim();
        if (!nextTrimmed || nextTrimmed.match(/^\d+[\.\)]/) || nextTrimmed.startsWith('**') || nextTrimmed.startsWith('####')) break;

        const subMatch = nextTrimmed.match(/^-\s+([a-z])\)\s+(.*)/);
        if (subMatch) break;

        if (nextTrimmed.startsWith('-') && !nextTrimmed.match(/^-\s+([a-z])\)/)) {
          i++;
          continue;
        }

        collectedLines.push(nextTrimmed);
        i++;
      }

      let fullText = clean(collectedLines.join(' '));
      let answer = '';

      const arrowMatch = fullText.match(/^(.*?)\s*→\s*(.*)$/);
      if (arrowMatch) {
        fullText = clean(arrowMatch[1]);
        answer = clean(arrowMatch[2]);
      }

      const boldAnswerMatch = fullText.match(/^(.*?)\s*\*\*(.+?)\*\*\s*$/);
      if (boldAnswerMatch) {
        fullText = clean(boldAnswerMatch[1]);
        answer = clean(boldAnswerMatch[2]);
      }

      const hasBlank = fullText.includes('BLANKMARKER');

      let qType: ExamQuestion['type'] = 'textarea';
      let qOptions: ExamOption[] | undefined;

      if (hasBlank) {
        qType = 'input';
      }

      qNum++;
      const qId = `q${sectionIdx}-${qNum - 1}`;

      questions.push({
        id: qId,
        number: qNum,
        text: fullText,
        type: qType,
        prefix: currentPrefix || undefined,
        answer: answer || undefined,
      });
      currentPrefix = '';
      continue;
    }

    const firstOpt = trimmed.match(/^-\s+([a-z])\)\s+(.*)/);
    if (firstOpt) {
      const lastQ = questions[questions.length - 1];
      if (lastQ) {
        lastQ.type = 'choice';
        lastQ.options = [];
        lastQ.options.push({ label: firstOpt[1], text: clean(firstOpt[2]) });

        while (i < lines.length) {
          const nextTrimmed = lines[i].trim();
          const optMatch = nextTrimmed.match(/^-\s+([a-z])\)\s+(.*)/);
          if (!optMatch) break;
          lastQ.options.push({ label: optMatch[1], text: clean(optMatch[2]) });
          i++;
        }
      }
      continue;
    }
  }

  if (options.length > 0 && questions.length > 0) {
    const matchable = questions.filter(q => q.text.length < 80);
    if (matchable.length === options.length) {
      questions.forEach(q => {
        if (q.text.length < 80) {
          q.type = 'select';
          q.options = options;
        }
      });
    }
  }

  return { title, instructions: instructions.trim(), questions };
}

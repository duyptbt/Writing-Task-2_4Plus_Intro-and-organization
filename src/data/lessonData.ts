export type StageId =
  | 'task-analysis'
  | 'introduction'
  | 'organization'
  | 'model-paragraph'
  | 'brainstorm-draft';

export interface StageMeta {
  id: StageId;
  number: string;
  navLabel: string;
  title: string;
  exercisesLabel: string;
  teacherTip: string;
}

export const STAGES: StageMeta[] = [
  {
    id: 'task-analysis',
    number: '01',
    navLabel: '1. Task Analysis',
    title: 'Analysing Writing Task 2',
    exercisesLabel: 'Exercise 1',
    teacherTip:
      'Spend 3–4 minutes analysing the question and making a brief plan before writing. Identify every part of the italic rubric so nothing is missed.',
  },
  {
    id: 'introduction',
    number: '02',
    navLabel: '2. Introduction',
    title: 'Evaluating Essay Introductions',
    exercisesLabel: 'Exercises 2 & 3',
    teacherTip:
      'A strong introduction opens with a general statement, paraphrases both views, and sets the direction for the whole essay—keep referring back to this structure for continuity.',
  },
  {
    id: 'organization',
    number: '03',
    navLabel: '3. Organization',
    title: 'Paragraph Organization & Linking Words',
    exercisesLabel: 'Exercises 4, 5 & 6',
    teacherTip:
      'Adverbs and conjunctions show clear links between ideas in a paragraph. Note that "so" can function in both categories depending on how it connects clauses.',
  },
  {
    id: 'model-paragraph',
    number: '04',
    navLabel: '4. Model Paragraph',
    title: 'Word Forms & Model Paragraph',
    exercisesLabel: 'Exercises 7 & 8',
    teacherTip:
      'Working out the grammatical word form (noun, verb, conjunction, adverb) before choosing a word is also a high-value strategy for IELTS Reading and Listening gap-fills.',
  },
  {
    id: 'brainstorm-draft',
    number: '05',
    navLabel: '5. Brainstorm & Draft',
    title: 'Brainstorming Drawbacks & Guided Paragraph',
    exercisesLabel: 'Exercises 9, 10 & 11',
    teacherTip:
      'At Level B1 (4.0 Plus), focus on writing one well-organized paragraph with clear discourse markers rather than rushing into a full essay. Use the positive model paragraph as your structural framework.',
  },
];

export const LESSON_INFO = {
  appTitle: 'Writing Task 2 - Level B1 (4.0 Plus)',
  subtitle: 'Introduction & Organization',
  aim: 'This section aims to help students to write a paragraph with guidance.',
  strategy:
    'Make a brief list of three or four main ideas. Then support the ideas with reasons and examples.',
  examInformation:
    "In Writing Task 2, you have to write an essay on a general academic subject. You do not need to have any specialist knowledge. You are often asked to discuss other people's ideas and give your own opinion.",
};

export const TASK_PROMPT = {
  timingInstruction: 'You should spend about 40 minutes on this task. Write about the following topic:',
  part1Positive:
    'Some people think that the use of computers in primary and secondary schools makes education more enjoyable and efficient,',
  part2Negative:
    'while others believe that too much dependence on computers causes both physical and emotional problems.',
  part3Opinion: 'Discuss both points of view and give your opinion.',
  closingInstruction:
    'Give reasons for your answer and include any relevant examples from your own knowledge and experience. Write at least 250 words.',
};

// Exercise 1: 7 questions about Writing Task 2
export interface Ex1Question {
  id: number;
  question: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  keyAnswer: string;
  explanation: string;
}

export const EX1_QUESTIONS: Ex1Question[] = [
  {
    id: 1,
    question: 'How many main parts are there in the task in italics? 1, 2, 3 or 4?',
    options: [
      { id: '1', label: '1' },
      { id: '2', label: '2' },
      { id: '3', label: '3' },
      { id: '4', label: '4' },
    ],
    correctOptionId: '3',
    keyAnswer: '3',
    explanation:
      'There are 3 parts: (1) the positive view about computers making education enjoyable and efficient, (2) the negative view about physical and emotional problems, and (3) giving your own opinion.',
  },
  {
    id: 2,
    question: 'For each part of the question, what do you need to include?',
    options: [
      {
        id: 'reasons-examples',
        label: 'Give reasons for your answer and include any relevant examples from your own knowledge and experience.',
      },
      {
        id: 'statistics',
        label: 'Include academic research statistics and specialist technical definitions.',
      },
      {
        id: 'summary-only',
        label: 'Only summarize what other people think without adding personal examples.',
      },
    ],
    correctOptionId: 'reasons-examples',
    keyAnswer:
      'Give reasons for your answer and include any relevant examples from your own knowledge and experience.',
    explanation:
      'The prompt explicitly instructs you to support your points with reasons and relevant examples from your own knowledge and experience.',
  },
  {
    id: 3,
    question: 'How long should the introduction be?',
    options: [
      { id: '10-15', label: 'Only 10–15 words (one short phrase).' },
      { id: '25-30', label: 'About 25–30 words is enough (no fixed number of words).' },
      { id: '80-100', label: 'At least 80–100 words to explain all examples.' },
    ],
    correctOptionId: '25-30',
    keyAnswer: 'About 25–30 words is enough. There is no fixed number of words.',
    explanation:
      'Keep your introduction focused and concise—around 25–30 words is plenty to introduce the topic and signal the direction of your essay.',
  },
  {
    id: 4,
    question: 'Do you need a conclusion?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    correctOptionId: 'yes',
    keyAnswer: 'Yes.',
    explanation:
      'Every Writing Task 2 essay needs a clear conclusion to bring your discussion and opinion together.',
  },
  {
    id: 5,
    question: 'How many paragraphs should you write for your answer?',
    options: [
      { id: '2-3', label: '2 or 3 paragraphs' },
      { id: '4-5', label: '4 or 5 paragraphs' },
      { id: '7-8', label: '7 or 8 paragraphs' },
    ],
    correctOptionId: '4-5',
    keyAnswer: '4/5',
    explanation:
      'A well-organized IELTS Task 2 essay typically has 4 or 5 paragraphs: an introduction, 2–3 body paragraphs, and a conclusion.',
  },
  {
    id: 6,
    question: 'How long should each paragraph be, excluding the introduction and conclusion?',
    options: [
      { id: '25-40', label: 'About 25–40 words.' },
      { id: '60-85', label: 'About 60–85 words (no fixed number of words).' },
      { id: '150-200', label: 'About 150–200 words.' },
    ],
    correctOptionId: '60-85',
    keyAnswer: 'About 60–85 words. But note there is no fixed number of words.',
    explanation:
      'Body paragraphs of around 60–85 words give enough room for a topic idea, reason, examples, result, and mini-conclusion while keeping the essay over 250 words.',
  },
  {
    id: 7,
    question: 'How many main ideas do you need?',
    options: [
      { id: '1', label: 'Only 1 main idea' },
      { id: '3', label: 'About 3 main ideas' },
      { id: '8', label: 'At least 8 main ideas' },
    ],
    correctOptionId: '3',
    keyAnswer: 'about 3',
    explanation:
      'As the Strategy box advises, make a brief list of about 3 (or 3–4) main ideas and develop them thoroughly with reasons and examples.',
  },
];

// Exercise 2: Two Introductions
export interface IntroOption {
  id: '1' | '2';
  label: string;
  wordCount: number;
  text: string;
  segments: {
    text: string;
    highlight?: 'copied' | 'general' | 'paraphrase' | 'direction';
    note?: string;
  }[];
}

export const EX2_INTRODUCTIONS: IntroOption[] = [
  {
    id: '1',
    label: 'Introduction 1',
    wordCount: 44,
    text: 'Some people believe that using computers in primary and secondary schools makes education better for children, while others believe that depending too much on computers creates both physical and emotional problems. I agree with both opinions, but I think that technology does more harm than good.',
    segments: [
      { text: 'Some people believe that ' },
      {
        text: 'using computers in primary and secondary schools makes education',
        highlight: 'copied',
        note: 'Copies rubric words directly',
      },
      { text: ' better for children, ' },
      {
        text: 'while others believe that depending too much on computers creates both physical and emotional problems.',
        highlight: 'copied',
        note: 'Same grammar structure & wording as the rubric',
      },
      { text: ' I agree with both opinions, but I think that technology does more harm than good.' },
    ],
  },
  {
    id: '2',
    label: 'Introduction 2',
    wordCount: 43,
    text: 'Computers are increasingly common in schools everywhere. While the benefits of such technology are obvious, there are also some people who believe that relying on technology is harmful. I personally believe that technology has a role to play in schools, but needs to be used with care.',
    segments: [
      {
        text: 'Computers are increasingly common in schools everywhere.',
        highlight: 'general',
        note: 'General opening statement introducing the topic',
      },
      { text: ' ' },
      {
        text: 'While the benefits of such technology are obvious, there are also some people who believe that relying on technology is harmful.',
        highlight: 'paraphrase',
        note: 'Paraphrases positive & negative views with synonyms and new grammar',
      },
      { text: ' ' },
      {
        text: 'I personally believe that technology has a role to play in schools, but needs to be used with care.',
        highlight: 'direction',
        note: 'Clear personal opinion setting the essay direction: positive → negative → opinion',
      },
    ],
  },
];

// Exercise 3: Reasons why Introduction 2 is better
export interface Ex3Reason {
  id: number;
  text: string;
  isTrueForBest: boolean;
  explanation: string;
}

export const EX3_REASONS: Ex3Reason[] = [
  {
    id: 1,
    text: 'It uses different words/synonyms.',
    isTrueForBest: true,
    explanation: 'Uses synonyms such as "benefits", "such technology", "relying on", and "harmful".',
  },
  {
    id: 2,
    text: 'It copies the words in the rubric.',
    isTrueForBest: false,
    explanation: 'That is the weakness of Introduction 1, not Introduction 2.',
  },
  {
    id: 3,
    text: 'It mentions all three parts of the question.',
    isTrueForBest: true,
    explanation: 'Covers the benefits (positive), harm from reliance (negative), and personal opinion.',
  },
  {
    id: 4,
    text: 'It uses different grammatical structures.',
    isTrueForBest: true,
    explanation: 'Opens with a general statement and uses a "While..." concession clause instead of copying "Some people think..., while others believe...".',
  },
  {
    id: 5,
    text: "It doesn't copy the words in the rubric.",
    isTrueForBest: true,
    explanation: 'Avoids lifting phrases verbatim from the exam rubric, which examiners penalize.',
  },
  {
    id: 6,
    text: 'It shows the structure of the rest of the answer clearly: positive, negative, opinion.',
    isTrueForBest: true,
    explanation: 'Maps the exact progression of the essay: benefits → harm → balanced personal view.',
  },
  {
    id: 7,
    text: 'It uses the same grammatical structures.',
    isTrueForBest: false,
    explanation: 'Introduction 1 mirrors the rubric structure; Introduction 2 varies its sentence patterns.',
  },
];

// Exercise 4: Paragraph Organization Table
export interface Ex4Idea {
  id: 'a' | 'b' | 'c';
  text: string;
}

export const EX4_IDEAS: Ex4Idea[] = [
  { id: 'a', text: 'they can work fast' },
  { id: 'b', text: 'useful tool' },
  { id: 'c', text: 'interesting/exciting – colourful images, videos' },
];

export interface OrgRow {
  number: number;
  role: string;
  prefix?: string;
  fixedText?: string;
  blankKey?: 'a' | 'b' | 'c';
  linkingTarget: boolean;
  correctLinkers?: string[]; // primary first, acceptable alternatives next
  primaryLinker?: string;
}

export const EX4_6_TABLE_ROWS: OrgRow[] = [
  {
    number: 1,
    role: 'Topic',
    fixedText: 'computers convenient/save time for students and teachers',
    linkingTarget: false,
  },
  {
    number: 2,
    role: 'Reason',
    blankKey: 'a',
    linkingTarget: true,
    primaryLinker: 'because',
    correctLinkers: ['because'],
  },
  {
    number: 3,
    role: 'Example 1',
    fixedText: 'children/tasks like drawing, emails, letters, projects on subjects like animals, calculation, etc',
    linkingTarget: true,
    primaryLinker: 'for example',
    correctLinkers: ['for example'],
  },
  {
    number: 4,
    role: 'Example 2',
    prefix: 'also make',
    blankKey: 'c',
    linkingTarget: true,
    primaryLinker: 'moreover (... can ...)',
    correctLinkers: ['moreover (... can ...)', 'for example'],
  },
  {
    number: 5,
    role: 'Result',
    fixedText: 'enjoy learning',
    linkingTarget: true,
    primaryLinker: 'as a result',
    correctLinkers: ['as a result'],
  },
  {
    number: 6,
    role: 'Conclusion',
    prefix: 'definitely',
    blankKey: 'b',
    linkingTarget: true,
    primaryLinker: 'so',
    correctLinkers: ['so'],
  },
];

// Exercise 5: Adverbs vs Conjunctions
export type WordClassChoice = 'adverb' | 'conjunction' | 'both';

export interface Ex5Item {
  id: string;
  phrase: string;
  correct: WordClassChoice;
  note: string;
}

export const EX5_ITEMS: Ex5Item[] = [
  {
    id: 'for-example',
    phrase: 'for example',
    correct: 'adverb',
    note: 'Adverbial phrase used to introduce specific illustrations (usually followed by a comma).',
  },
  {
    id: 'as-a-result',
    phrase: 'as a result',
    correct: 'adverb',
    note: 'Adverbial phrase showing a consequence or outcome of the preceding idea.',
  },
  {
    id: 'because',
    phrase: 'because',
    correct: 'conjunction',
    note: 'Subordinating conjunction joining a main clause to a reason clause.',
  },
  {
    id: 'moreover',
    phrase: 'moreover (... can ...)',
    correct: 'adverb',
    note: 'Linking adverb used to add a further supporting point or second example.',
  },
  {
    id: 'so',
    phrase: 'so',
    correct: 'both',
    note: '"So" can be included in both categories: as a conjunction joining clauses and as a linking adverb introducing a conclusion.',
  },
];

// Exercise 7 & 8: Model Paragraph (9 gaps)
export type Ex7WordForm = 'noun' | 'verb' | '(modal) verb' | 'conjunction' | 'adverb';

export const EX7_WORD_FORM_OPTIONS: Ex7WordForm[] = [
  'noun',
  'verb',
  '(modal) verb',
  'conjunction',
  'adverb',
];

export interface ModelGap {
  id: number;
  correctForm: Ex7WordForm;
  acceptedForms: Ex7WordForm[];
  correctWord: string;
  wordBankLabel: string;
  formHint: string;
}

export const MODEL_GAPS: ModelGap[] = [
  {
    id: 1,
    correctForm: 'noun',
    acceptedForms: ['noun'],
    correctWord: 'advantage',
    wordBankLabel: 'advantage',
    formHint: 'Follows "The main ..." as the subject before "is".',
  },
  {
    id: 2,
    correctForm: 'verb',
    acceptedForms: ['verb'],
    correctWord: 'save',
    wordBankLabel: 'save',
    formHint: 'Parallel with "are very convenient and ___ a lot of time" (plural subject: computers).',
  },
  {
    id: 3,
    correctForm: 'conjunction',
    acceptedForms: ['conjunction'],
    correctWord: 'because',
    wordBankLabel: 'because',
    formHint: 'Connects the first clause with the reason clause that follows.',
  },
  {
    id: 4,
    correctForm: 'adverb',
    acceptedForms: ['adverb'],
    correctWord: 'For example',
    wordBankLabel: 'for example',
    formHint: 'Sentence-initial adverbial phrase followed by a comma introducing Example 1.',
  },
  {
    id: 5,
    correctForm: '(modal) verb',
    acceptedForms: ['(modal) verb', 'verb'],
    correctWord: 'can',
    wordBankLabel: 'can',
    formHint: 'Comes between subject "they" and base verb "send".',
  },
  {
    id: 6,
    correctForm: 'adverb',
    acceptedForms: ['adverb'],
    correctWord: 'like',
    wordBankLabel: 'like',
    formHint: 'Introduces examples of subjects ("animals and plants"); classified under adverb in the lesson key.',
  },
  {
    id: 7,
    correctForm: 'adverb',
    acceptedForms: ['adverb'],
    correctWord: 'Moreover',
    wordBankLabel: 'moreover',
    formHint: 'Sentence-initial linking adverb adding Example 2.',
  },
  {
    id: 8,
    correctForm: 'adverb',
    acceptedForms: ['adverb'],
    correctWord: 'As a result',
    wordBankLabel: 'as a result',
    formHint: 'Sentence-initial linking adverb introducing the Result.',
  },
  {
    id: 9,
    correctForm: 'adverb',
    acceptedForms: ['adverb'],
    correctWord: 'So',
    wordBankLabel: 'so',
    formHint: 'Sentence-initial linking adverb introducing the Conclusion.',
  },
];

export const EX8_WORD_BANK = [
  'can',
  'like',
  'moreover',
  'as a result',
  'so',
  'because',
  'advantage',
  'save',
  'for example',
] as const;

export interface ModelSentenceAnnotation {
  role: string;
  text: string;
  accentBg: string;
  accentText: string;
}

export const COMPLETED_MODEL_ANNOTATIONS: ModelSentenceAnnotation[] = [
  {
    role: 'Topic',
    text: 'The main advantage is that computers are very convenient and save a lot of time for both teachers and children,',
    accentBg: 'bg-[#FFF0F3]',
    accentText: 'text-[#B8002A]',
  },
  {
    role: 'Reason',
    text: 'because the children are able to work fast and do more tasks.',
    accentBg: 'bg-[#EEFAF8]',
    accentText: 'text-[#13675D]',
  },
  {
    role: 'Example 1',
    text: "For example, they can draw and write emails, which they can send to friends, and do 'electronic' projects on subjects like animals and plants.",
    accentBg: 'bg-[#EEFAF8]',
    accentText: 'text-[#13675D]',
  },
  {
    role: 'Example 2',
    text: 'Moreover, the teacher can make education enjoyable by using colourful images and videos from the Internet.',
    accentBg: 'bg-[#EEFAF8]',
    accentText: 'text-[#13675D]',
  },
  {
    role: 'Result',
    text: 'As a result, both the teacher and the children will enjoy learning.',
    accentBg: 'bg-[#FFF0F3]',
    accentText: 'text-[#B8002A]',
  },
  {
    role: 'Conclusion',
    text: 'So, technology is a very useful tool.',
    accentBg: 'bg-slate-100',
    accentText: 'text-slate-900',
  },
];

// Exercise 9: Physical & Emotional Mind Maps
export const EX9_SAMPLE_ANSWERS = {
  physical: {
    given: 'eyes',
    samples: ['hand', 'back', 'weight gain', 'tiredness'],
    extraB1Suggestions: ['headaches', 'poor posture', 'neck pain', 'less exercise'],
  },
  emotional: {
    given: 'laziness',
    samples: [
      'only talk to machines',
      "don't develop real friendships",
      "family 'breakdown'",
      'loneliness',
    ],
    extraB1Suggestions: ['stress', 'impatience', 'social isolation', 'screen addiction'],
  },
};

export const DISCOURSE_MARKERS_DRAFT = [
  'However,',
  'because',
  'For example,',
  'Moreover,',
  'As a result,',
  'So,',
];

export const SAMPLE_DRAWBACK_PARAGRAPH =
  "However, the main drawback is that too much dependence on computers can cause both physical and emotional problems, because children spend many hours sitting in front of a screen. For example, they can develop eye, hand, and back problems, as well as tiredness and weight gain. Moreover, young people who only talk to machines often do not develop real friendships and may experience loneliness or family 'breakdown'. As a result, their health and social life can suffer. So, relying too heavily on technology is clearly harmful.";

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  EX1_QUESTIONS,
  EX3_REASONS,
  EX4_6_TABLE_ROWS,
  EX5_ITEMS,
  EX9_SAMPLE_ANSWERS,
  Ex7WordForm,
  LESSON_INFO,
  MODEL_GAPS,
  STAGES,
  StageId,
  WordClassChoice,
} from './data/lessonData';
import { Language, STAGES_I18N, UI_TEXT } from './data/i18n';
import TaskPromptPanel from './components/TaskPromptPanel';
import Stage1TaskAnalysis from './components/Stage1TaskAnalysis';
import Stage2Introductions from './components/Stage2Introductions';
import Stage3Organization from './components/Stage3Organization';
import Stage4ModelParagraph from './components/Stage4ModelParagraph';
import Stage5BrainstormDraft from './components/Stage5BrainstormDraft';

const STORAGE_KEY = 'ielts_wt2_b1_intro_org_v1';

interface SavedProgress {
  lang: Language;
  activeStage: StageId;
  ex1Answers: Record<number, string>;
  ex1Checked: boolean;
  selectedIntro: '1' | '2' | null;
  ex2Checked: boolean;
  selectedReasons: number[];
  ex3Checked: boolean;
  ex4Answers: Record<number, 'a' | 'b' | 'c'>;
  ex4Checked: boolean;
  ex5Answers: Record<string, WordClassChoice>;
  ex5Checked: boolean;
  ex6Answers: Record<number, string>;
  ex6Checked: boolean;
  ex7Answers: Record<number, Ex7WordForm>;
  ex7Checked: boolean;
  ex8Answers: Record<number, string>;
  ex8Checked: boolean;
  physicalIdeas: [string, string, string, string];
  emotionalIdeas: [string, string, string, string];
  draftText: string;
}

const DEFAULT_PROGRESS: SavedProgress = {
  lang: 'en',
  activeStage: 'task-analysis',
  ex1Answers: {},
  ex1Checked: false,
  selectedIntro: null,
  ex2Checked: false,
  selectedReasons: [],
  ex3Checked: false,
  ex4Answers: {},
  ex4Checked: false,
  ex5Answers: {},
  ex5Checked: false,
  ex6Answers: {},
  ex6Checked: false,
  ex7Answers: {},
  ex7Checked: false,
  ex8Answers: {},
  ex8Checked: false,
  physicalIdeas: ['', '', '', ''],
  emotionalIdeas: ['', '', '', ''],
  draftText: 'However, ',
};

function loadSavedProgress(): SavedProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      lang: parsed.lang === 'vi' ? 'vi' : 'en',
      physicalIdeas:
        Array.isArray(parsed.physicalIdeas) && parsed.physicalIdeas.length === 4
          ? (parsed.physicalIdeas as [string, string, string, string])
          : DEFAULT_PROGRESS.physicalIdeas,
      emotionalIdeas:
        Array.isArray(parsed.emotionalIdeas) && parsed.emotionalIdeas.length === 4
          ? (parsed.emotionalIdeas as [string, string, string, string])
          : DEFAULT_PROGRESS.emotionalIdeas,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [state, setState] = useState<SavedProgress>(loadSavedProgress);
  const [promptDrawerOpen, setPromptDrawerOpen] = useState(false);

  const lang = state.lang;
  const t = UI_TEXT[lang];
  const stageCopy = STAGES_I18N[lang];

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Compute completion across exercises 1–9
  const completedExercises = [
    state.ex1Checked &&
      EX1_QUESTIONS.every((q) => state.ex1Answers[q.id] === q.correctOptionId),
    state.ex2Checked && state.selectedIntro === '2',
    state.ex3Checked &&
      EX3_REASONS.every(
        (r) => state.selectedReasons.includes(r.id) === r.isTrueForBest
      ),
    state.ex4Checked &&
      EX4_6_TABLE_ROWS.filter((r) => r.blankKey).every(
        (r) => state.ex4Answers[r.number] === r.blankKey
      ),
    state.ex5Checked &&
      EX5_ITEMS.every((item) => state.ex5Answers[item.id] === item.correct),
    state.ex6Checked &&
      EX4_6_TABLE_ROWS.filter((r) => r.linkingTarget).every((r) =>
        r.correctLinkers?.includes(state.ex6Answers[r.number] ?? '')
      ),
    state.ex7Checked &&
      MODEL_GAPS.every(
        (g) =>
          state.ex7Answers[g.id] &&
          g.acceptedForms.includes(state.ex7Answers[g.id])
      ),
    state.ex8Checked &&
      MODEL_GAPS.every(
        (g) =>
          state.ex8Answers[g.id]?.toLowerCase() ===
          g.wordBankLabel.toLowerCase()
      ),
    state.physicalIdeas.filter((s) => s.trim()).length >= 2 &&
      state.emotionalIdeas.filter((s) => s.trim()).length >= 2,
  ].filter(Boolean).length;

  const progressPct = Math.round((completedExercises / 9) * 100);
  const currentStageIndex = STAGES.findIndex((s) => s.id === state.activeStage);
  const prevStage = currentStageIndex > 0 ? STAGES[currentStageIndex - 1] : null;
  const nextStage =
    currentStageIndex < STAGES.length - 1 ? STAGES[currentStageIndex + 1] : null;

  const goToStage = (id: StageId) => {
    setState((prev) => ({ ...prev, activeStage: id }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLang = (nextLang: Language) => {
    setState((prev) => ({ ...prev, lang: nextLang }));
  };

  const resetAllProgress = () => {
    setState((prev) => ({ ...DEFAULT_PROGRESS, lang: prev.lang }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F9] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 border-t-[3px] border-t-[#EF0037]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => goToStage('task-analysis')}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037] rounded"
          >
            Writing Task 2
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Lesson Stages"
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
          >
            {STAGES.map((stage) => {
              const active = state.activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goToStage(stage.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E9788] ${
                    active
                      ? 'text-[#B8002A] border-[#EF0037]'
                      : 'text-slate-600 border-transparent hover:text-[#13675D] hover:border-[#9FD9D0]'
                  }`}
                >
                  {stageCopy[stage.id].navLabel}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setPromptDrawerOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.viewTaskPrompt}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8">
        {/* Editorial Module Header */}
        <div className="pb-6 mb-8 border-b border-slate-200 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#13675D] font-medium">
              <span>{t.subtitle}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">{t.academicWriting}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {LESSON_INFO.appTitle}
            </h1>
            <p className="text-[15px] text-slate-600 max-w-2xl leading-relaxed">
              {t.aim}
            </p>
          </div>

          {/* Workspace Toolbar Controls (below header) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Language Toggle (English / Tiếng Việt) */}
            <div
              role="group"
              aria-label="Language toggle"
              className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg"
            >
              <Globe
                className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 shrink-0"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                  lang === 'en'
                    ? 'bg-[#1E9788] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('vi')}
                aria-pressed={lang === 'vi'}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037] ${
                  lang === 'vi'
                    ? 'bg-[#EF0037] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tiếng Việt
              </button>
            </div>

            <div className="flex items-center gap-3 pr-3 border-r border-slate-200">
              <div className="text-right">
                <div className="text-xs text-slate-500">{t.exercisesMastered}</div>
                <div className="text-sm font-mono tabular-nums font-semibold text-slate-900">
                  {completedExercises} / 9 ({progressPct}%)
                </div>
              </div>
              <div
                className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.exercisesMastered}
              >
                <div
                  className="h-full bg-[#1E9788] transition-transform duration-200 origin-left"
                  style={{ transform: `scaleX(${progressPct / 100})` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={resetAllProgress}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:text-[#B8002A] hover:border-[#F9B8C6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.resetAll}</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Stage Selector */}
        <div className="lg:hidden mb-6 overflow-x-auto pb-1">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {STAGES.map((stage) => {
              const active = state.activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goToStage(stage.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#EF0037] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {stageCopy[stage.id].navLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Educational Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Interactive Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {state.activeStage === 'task-analysis' && (
              <Stage1TaskAnalysis
                lang={lang}
                answers={state.ex1Answers}
                checked={state.ex1Checked}
                onSelectAnswer={(qId, optId) =>
                  setState((prev) => ({
                    ...prev,
                    ex1Answers: { ...prev.ex1Answers, [qId]: optId },
                  }))
                }
                onCheck={() =>
                  setState((prev) => ({ ...prev, ex1Checked: true }))
                }
                onReset={() =>
                  setState((prev) => ({
                    ...prev,
                    ex1Answers: {},
                    ex1Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'introduction' && (
              <Stage2Introductions
                lang={lang}
                selectedIntro={state.selectedIntro}
                ex2Checked={state.ex2Checked}
                selectedReasons={state.selectedReasons}
                ex3Checked={state.ex3Checked}
                onSelectIntro={(id) =>
                  setState((prev) => ({ ...prev, selectedIntro: id }))
                }
                onCheckEx2={() =>
                  setState((prev) => ({ ...prev, ex2Checked: true }))
                }
                onResetEx2={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedIntro: null,
                    ex2Checked: false,
                  }))
                }
                onToggleReason={(id) =>
                  setState((prev) => {
                    const exists = prev.selectedReasons.includes(id);
                    return {
                      ...prev,
                      selectedReasons: exists
                        ? prev.selectedReasons.filter((r) => r !== id)
                        : [...prev.selectedReasons, id],
                    };
                  })
                }
                onCheckEx3={() =>
                  setState((prev) => ({ ...prev, ex3Checked: true }))
                }
                onResetEx3={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedReasons: [],
                    ex3Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'organization' && (
              <Stage3Organization
                lang={lang}
                ex4Answers={state.ex4Answers}
                ex4Checked={state.ex4Checked}
                ex5Answers={state.ex5Answers}
                ex5Checked={state.ex5Checked}
                ex6Answers={state.ex6Answers}
                ex6Checked={state.ex6Checked}
                onSetEx4={(rowNum, ideaId) =>
                  setState((prev) => ({
                    ...prev,
                    ex4Answers: { ...prev.ex4Answers, [rowNum]: ideaId },
                  }))
                }
                onCheckEx4={() =>
                  setState((prev) => ({ ...prev, ex4Checked: true }))
                }
                onResetEx4={() =>
                  setState((prev) => ({
                    ...prev,
                    ex4Answers: {},
                    ex4Checked: false,
                  }))
                }
                onSetEx5={(itemId, choice) =>
                  setState((prev) => ({
                    ...prev,
                    ex5Answers: { ...prev.ex5Answers, [itemId]: choice },
                  }))
                }
                onCheckEx5={() =>
                  setState((prev) => ({ ...prev, ex5Checked: true }))
                }
                onResetEx5={() =>
                  setState((prev) => ({
                    ...prev,
                    ex5Answers: {},
                    ex5Checked: false,
                  }))
                }
                onSetEx6={(rowNum, phrase) =>
                  setState((prev) => ({
                    ...prev,
                    ex6Answers: { ...prev.ex6Answers, [rowNum]: phrase },
                  }))
                }
                onCheckEx6={() =>
                  setState((prev) => ({ ...prev, ex6Checked: true }))
                }
                onResetEx6={() =>
                  setState((prev) => ({
                    ...prev,
                    ex6Answers: {},
                    ex6Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'model-paragraph' && (
              <Stage4ModelParagraph
                lang={lang}
                ex7Answers={state.ex7Answers}
                ex7Checked={state.ex7Checked}
                ex8Answers={state.ex8Answers}
                ex8Checked={state.ex8Checked}
                onSetEx7={(gapId, form) =>
                  setState((prev) => ({
                    ...prev,
                    ex7Answers: { ...prev.ex7Answers, [gapId]: form },
                  }))
                }
                onCheckEx7={() =>
                  setState((prev) => ({ ...prev, ex7Checked: true }))
                }
                onResetEx7={() =>
                  setState((prev) => ({
                    ...prev,
                    ex7Answers: {},
                    ex7Checked: false,
                  }))
                }
                onSetEx8={(gapId, word) =>
                  setState((prev) => ({
                    ...prev,
                    ex8Answers: { ...prev.ex8Answers, [gapId]: word },
                  }))
                }
                onClearEx8={(gapId) =>
                  setState((prev) => {
                    const next = { ...prev.ex8Answers };
                    delete next[gapId];
                    return { ...prev, ex8Answers: next };
                  })
                }
                onCheckEx8={() =>
                  setState((prev) => ({ ...prev, ex8Checked: true }))
                }
                onResetEx8={() =>
                  setState((prev) => ({
                    ...prev,
                    ex8Answers: {},
                    ex8Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'brainstorm-draft' && (
              <Stage5BrainstormDraft
                lang={lang}
                physicalIdeas={state.physicalIdeas}
                emotionalIdeas={state.emotionalIdeas}
                draftText={state.draftText}
                onUpdatePhysical={(idx, val) =>
                  setState((prev) => {
                    const next = [...prev.physicalIdeas] as [
                      string,
                      string,
                      string,
                      string,
                    ];
                    next[idx] = val;
                    return { ...prev, physicalIdeas: next };
                  })
                }
                onUpdateEmotional={(idx, val) =>
                  setState((prev) => {
                    const next = [...prev.emotionalIdeas] as [
                      string,
                      string,
                      string,
                      string,
                    ];
                    next[idx] = val;
                    return { ...prev, emotionalIdeas: next };
                  })
                }
                onLoadSampleMindMaps={() =>
                  setState((prev) => ({
                    ...prev,
                    physicalIdeas: [...EX9_SAMPLE_ANSWERS.physical.samples] as [
                      string,
                      string,
                      string,
                      string,
                    ],
                    emotionalIdeas: [...EX9_SAMPLE_ANSWERS.emotional.samples] as [
                      string,
                      string,
                      string,
                      string,
                    ],
                  }))
                }
                onResetMindMaps={() =>
                  setState((prev) => ({
                    ...prev,
                    physicalIdeas: ['', '', '', ''],
                    emotionalIdeas: ['', '', '', ''],
                  }))
                }
                onChangeDraft={(text) =>
                  setState((prev) => ({ ...prev, draftText: text }))
                }
                onResetDraft={() =>
                  setState((prev) => ({ ...prev, draftText: 'However, ' }))
                }
              />
            )}

            {/* Sequential Stage Footer Navigation */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {prevStage ? (
                <button
                  type="button"
                  onClick={() => goToStage(prevStage.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-[#1E9788] hover:text-[#13675D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>{stageCopy[prevStage.id].navLabel}</span>
                </button>
              ) : (
                <div />
              )}

              {nextStage && (
                <button
                  type="button"
                  onClick={() => goToStage(nextStage.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1E9788] rounded-lg hover:bg-[#177D70] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
                >
                  <span>
                    {t.nextPrefix}: {stageCopy[nextStage.id].navLabel}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Sticky Concept & Prompt Reference Deck (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <TaskPromptPanel lang={lang} activeStage={state.activeStage} />
          </div>
        </div>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            {LESSON_INFO.appTitle} · {t.subtitle}
          </span>
          <span>{t.academicWriting}</span>
        </div>
      </footer>

      {/* Task Prompt Quick-View Drawer (Triggered by Header Primary Action) */}
      {promptDrawerOpen && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-slate-950/40"
          role="dialog"
          aria-modal="true"
          aria-label={t.promptDrawerTitle}
        >
          <div
            className="flex-1"
            onClick={() => setPromptDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto border-l border-slate-200 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.promptDrawerTitle}
              </h2>
              <button
                type="button"
                onClick={() => setPromptDrawerOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label={t.closePromptDrawer}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TaskPromptPanel lang={lang} activeStage={state.activeStage} />
          </div>
        </div>
      )}
    </div>
  );
}

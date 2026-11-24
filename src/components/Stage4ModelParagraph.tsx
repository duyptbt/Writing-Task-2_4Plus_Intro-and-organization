import { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import {
  COMPLETED_MODEL_ANNOTATIONS,
  EX7_WORD_FORM_OPTIONS,
  EX8_WORD_BANK,
  Ex7WordForm,
  MODEL_GAPS,
} from '../data/lessonData';
import {
  EX7_FORM_LABELS_VI,
  EX7_HINTS_VI,
  Language,
  ORG_ROLE_VI,
  UI_TEXT,
} from '../data/i18n';

interface Stage4Props {
  lang: Language;
  ex7Answers: Record<number, Ex7WordForm>;
  ex7Checked: boolean;
  ex8Answers: Record<number, string>;
  ex8Checked: boolean;
  onSetEx7: (gapId: number, form: Ex7WordForm) => void;
  onCheckEx7: () => void;
  onResetEx7: () => void;
  onSetEx8: (gapId: number, word: string) => void;
  onClearEx8: (gapId: number) => void;
  onCheckEx8: () => void;
  onResetEx8: () => void;
}

const CAPITALIZED_GAPS = new Set([4, 7, 8, 9]);

function formatWordForGap(gapId: number, word: string) {
  if (!word) return '';
  if (CAPITALIZED_GAPS.has(gapId)) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return word;
}

export default function Stage4ModelParagraph({
  lang,
  ex7Answers,
  ex7Checked,
  ex8Answers,
  ex8Checked,
  onSetEx7,
  onCheckEx7,
  onResetEx7,
  onSetEx8,
  onClearEx8,
  onCheckEx8,
  onResetEx8,
}: Stage4Props) {
  const [subMode, setSubMode] = useState<'ex7' | 'ex8'>('ex7');
  const [activeGap, setActiveGap] = useState<number>(1);
  const [showStructureMap, setShowStructureMap] = useState(false);

  const t = UI_TEXT[lang];

  const ex7Score = MODEL_GAPS.filter((g) => {
    const val = ex7Answers[g.id];
    return val ? g.acceptedForms.includes(val) : false;
  }).length;

  const ex8Score = MODEL_GAPS.filter((g) => {
    const val = ex8Answers[g.id];
    return val?.toLowerCase() === g.wordBankLabel.toLowerCase();
  }).length;

  const usedWords = new Set(Object.values(ex8Answers).map((w) => w.toLowerCase()));

  const formatForm = (form: Ex7WordForm) =>
    lang === 'vi' ? EX7_FORM_LABELS_VI[form] : form;

  const handleSelectEx7Form = (form: Ex7WordForm) => {
    onSetEx7(activeGap, form);
    const nextUnfilled = MODEL_GAPS.find(
      (g) => g.id > activeGap && !ex7Answers[g.id]
    );
    if (nextUnfilled) {
      setActiveGap(nextUnfilled.id);
    } else if (activeGap < 9) {
      setActiveGap(activeGap + 1);
    }
  };

  const handlePickEx8Word = (word: string) => {
    onSetEx8(activeGap, word);
    const nextUnfilled = MODEL_GAPS.find(
      (g) => g.id > activeGap && !ex8Answers[g.id]
    );
    if (nextUnfilled) {
      setActiveGap(nextUnfilled.id);
    } else {
      const anyEmpty = MODEL_GAPS.find(
        (g) => g.id !== activeGap && !ex8Answers[g.id]
      );
      if (anyEmpty) setActiveGap(anyEmpty.id);
    }
  };

  const renderGapButton = (gapId: number) => {
    const gap = MODEL_GAPS.find((g) => g.id === gapId)!;
    const isActive = activeGap === gapId;

    if (subMode === 'ex7') {
      const val = ex7Answers[gapId];
      const isCorrect = val ? gap.acceptedForms.includes(val) : false;

      let stateCls = 'bg-white border-slate-300 text-slate-700 hover:border-[#1E9788]';
      if (ex7Checked) {
        stateCls = isCorrect
          ? 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]'
          : 'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023]';
      } else if (isActive) {
        stateCls = 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] ring-2 ring-[#1E9788]/25';
      } else if (val) {
        stateCls = 'bg-[#EEFAF8]/70 border-[#9FD9D0] text-[#13675D]';
      }

      const displayText = val || t.chooseFormPlaceholder;

      return (
        <button
          type="button"
          onClick={() => setActiveGap(gapId)}
          className={`inline-flex items-center gap-1.5 mx-1 px-2.5 py-0.5 rounded-md border text-sm font-medium align-baseline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${stateCls}`}
        >
          <span className="font-mono tabular-nums text-[11px] font-semibold opacity-75">
            {gapId}
          </span>
          <span>{displayText}</span>
        </button>
      );
    }

    // Exercise 8 mode
    const val = ex8Answers[gapId];
    const isCorrect = val?.toLowerCase() === gap.wordBankLabel.toLowerCase();

    let stateCls = 'bg-white border-slate-300 text-slate-600 hover:border-[#1E9788]';
    if (ex8Checked) {
      stateCls = isCorrect
        ? 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]'
        : 'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023]';
    } else if (isActive) {
      stateCls = 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] ring-2 ring-[#1E9788]/25';
    } else if (val) {
      stateCls = 'bg-[#EEFAF8]/70 border-[#9FD9D0] text-[#13675D]';
    }

    const displayText = val ? formatWordForGap(gapId, val) : '________';

    return (
      <button
        type="button"
        onClick={() => {
          if (val && isActive) {
            onClearEx8(gapId);
          } else {
            setActiveGap(gapId);
          }
        }}
        className={`inline-flex items-center gap-1.5 mx-1 px-2.5 py-0.5 rounded-md border text-sm font-semibold align-baseline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${stateCls}`}
      >
        <span className="font-mono tabular-nums text-[11px] font-semibold opacity-70">
          {gapId}
        </span>
        <span>{displayText}</span>
      </button>
    );
  };

  const activeGapMeta = MODEL_GAPS.find((g) => g.id === activeGap)!;

  return (
    <div className="space-y-8">
      <section aria-labelledby="stage4-heading" className="bg-white border border-slate-200 rounded-xl">
        {/* Header + Sub-mode segmented tabs */}
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s4Kicker}
            </div>
            <h2 id="stage4-heading" className="text-2xl font-semibold text-slate-900">
              {subMode === 'ex7' ? t.s4Ex7Heading : t.s4Ex8Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {subMode === 'ex7' ? t.s4Ex7Desc : t.s4Ex8Desc}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Model Paragraph Steps"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={subMode === 'ex7'}
              onClick={() => setSubMode('ex7')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                subMode === 'ex7'
                  ? 'bg-[#1E9788] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabEx7}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={subMode === 'ex8'}
              onClick={() => setSubMode('ex8')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                subMode === 'ex8'
                  ? 'bg-[#1E9788] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabEx8}
            </button>
          </div>
        </div>

        {/* Interactive Model Paragraph */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-6 rounded-xl bg-[#F7F9F9] border border-slate-200 text-[16px] leading-[2.15] text-slate-900">
            The main {renderGapButton(1)} is that computers are very convenient and{' '}
            {renderGapButton(2)} a lot of time for both teachers and children,{' '}
            {renderGapButton(3)} the children are able to work fast and do more tasks.{' '}
            {renderGapButton(4)}, they can draw and write emails, which they{' '}
            {renderGapButton(5)} send to friends, and do &lsquo;electronic&rsquo; projects on
            subjects {renderGapButton(6)} animals and plants. {renderGapButton(7)}, the
            teacher can make education enjoyable by using colourful images and videos from the
            Internet. {renderGapButton(8)}, both the teacher and the children will enjoy
            learning. {renderGapButton(9)}, technology is a very useful tool.
          </div>

          {/* Active Blank Selector Controls */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-900">
                {t.activeSpace}:{' '}
                <span className="font-mono tabular-nums text-[#EF0037]">
                  #{activeGap}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveGap((g) => Math.max(1, g - 1))}
                  disabled={activeGap === 1}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:border-[#1E9788] hover:text-[#13675D] disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  {t.previousBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGap((g) => Math.min(9, g + 1))}
                  disabled={activeGap === 9}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:border-[#1E9788] hover:text-[#13675D] disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  {t.nextBtn}
                </button>
              </div>
            </div>

            {subMode === 'ex7' ? (
              <div className="flex flex-wrap gap-2">
                {EX7_WORD_FORM_OPTIONS.map((form) => {
                  const selected = ex7Answers[activeGap] === form;
                  return (
                    <button
                      key={form}
                      type="button"
                      onClick={() => handleSelectEx7Form(form)}
                      aria-pressed={selected}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                        selected
                          ? 'bg-[#1E9788] text-white border-[#1E9788]'
                          : 'bg-[#F7F9F9] text-slate-800 border-slate-200 hover:border-[#1E9788] hover:bg-[#EEFAF8]/50'
                      }`}
                    >
                      {formatForm(form)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {EX8_WORD_BANK.map((word) => {
                    const isUsed = usedWords.has(word.toLowerCase());
                    const isAssignedHere =
                      ex8Answers[activeGap]?.toLowerCase() === word.toLowerCase();
                    return (
                      <button
                        key={word}
                        type="button"
                        onClick={() => handlePickEx8Word(word)}
                        className={`px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                          isAssignedHere
                            ? 'bg-[#1E9788] text-white border-[#1E9788]'
                            : isUsed
                              ? 'bg-slate-100 text-slate-400 border-slate-200 line-through hover:text-slate-700'
                              : 'bg-white text-slate-900 border-slate-300 hover:border-[#1E9788] hover:bg-[#EEFAF8]/50'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500">{t.grammarSaveNote}</p>
              </div>
            )}

            {/* Contextual Hint / Evaluation for Active Space */}
            {((subMode === 'ex7' && ex7Checked) ||
              (subMode === 'ex8' && ex8Checked)) && (
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {subMode === 'ex7' ? (
                  <>
                    {ex7Answers[activeGap] &&
                    activeGapMeta.acceptedForms.includes(ex7Answers[activeGap]) ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                        {t.correct}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                        <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                        {t.keyPrefix}: {formatForm(activeGapMeta.correctForm)}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>
                      {lang === 'vi' ? EX7_HINTS_VI[activeGap] : activeGapMeta.formHint}
                    </span>
                  </>
                ) : (
                  <>
                    {ex8Answers[activeGap]?.toLowerCase() ===
                    activeGapMeta.wordBankLabel.toLowerCase() ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                        {t.correct}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                        <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                        {t.keyPrefix}: {activeGapMeta.correctWord}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>
                      {t.wordFormLabel}: {formatForm(activeGapMeta.correctForm)}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Complete Answer Summary Grid when checked */}
          {((subMode === 'ex7' && ex7Checked) ||
            (subMode === 'ex8' && ex8Checked)) && (
            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-semibold text-slate-700 mb-3">
                {subMode === 'ex7' ? t.ex7KeyOverview : t.ex8KeyOverview}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                {MODEL_GAPS.map((g) => {
                  const isRight =
                    subMode === 'ex7'
                      ? Boolean(ex7Answers[g.id] && g.acceptedForms.includes(ex7Answers[g.id]))
                      : ex8Answers[g.id]?.toLowerCase() === g.wordBankLabel.toLowerCase();
                  const checkedNow = subMode === 'ex7' ? ex7Checked : ex8Checked;

                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setActiveGap(g.id)}
                      className={`p-2 rounded-lg border text-left transition-colors ${
                        activeGap === g.id ? 'ring-2 ring-[#1E9788]/40' : ''
                      } ${
                        checkedNow
                          ? isRight
                            ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                            : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
                          : 'bg-[#F7F9F9] border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="font-mono tabular-nums text-[11px] text-slate-500">
                        #{g.id}
                      </div>
                      <div className="text-xs font-semibold truncate mt-0.5">
                        {subMode === 'ex7' ? g.correctForm : g.correctWord}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {subMode === 'ex7' ? (
              ex7Checked ? (
                <span>
                  {t.score}: <strong className="text-slate-900">{ex7Score} / 9</strong>
                </span>
              ) : (
                <span>
                  {t.completed}: <strong className="text-slate-900">{Object.keys(ex7Answers).length} / 9</strong>
                </span>
              )
            ) : ex8Checked ? (
              <span>
                {t.score}: <strong className="text-slate-900">{ex8Score} / 9</strong>
              </span>
            ) : (
              <span>
                {t.completed}: <strong className="text-slate-900">{Object.keys(ex8Answers).length} / 9</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={subMode === 'ex7' ? onResetEx7 : onResetEx8}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={subMode === 'ex7' ? onCheckEx7 : onCheckEx8}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {subMode === 'ex7' ? t.checkWordFormsBtn : t.checkParagraphBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Paragraph Structure Mapping Reference */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {t.structureHeading}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{t.structureDesc}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowStructureMap((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showStructureMap
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showStructureMap ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {showStructureMap ? t.hideStructureBtn : t.showStructureBtn}
            </span>
          </button>
        </div>

        {showStructureMap && (
          <div className="mt-5 divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            {COMPLETED_MODEL_ANNOTATIONS.map((item) => (
              <div
                key={item.role}
                className="p-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 bg-white"
              >
                <span
                  className={`text-xs font-semibold w-36 shrink-0 ${item.accentText}`}
                >
                  {lang === 'vi' ? ORG_ROLE_VI[item.role] ?? item.role : item.role}
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

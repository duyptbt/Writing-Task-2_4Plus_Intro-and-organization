import { useState } from 'react';
import { AlertCircle, Check, CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { EX2_INTRODUCTIONS, EX3_REASONS } from '../data/lessonData';
import { EX3_VI, Language, UI_TEXT } from '../data/i18n';

interface Stage2Props {
  lang: Language;
  selectedIntro: '1' | '2' | null;
  ex2Checked: boolean;
  selectedReasons: number[];
  ex3Checked: boolean;
  onSelectIntro: (id: '1' | '2') => void;
  onCheckEx2: () => void;
  onResetEx2: () => void;
  onToggleReason: (id: number) => void;
  onCheckEx3: () => void;
  onResetEx3: () => void;
}

export default function Stage2Introductions({
  lang,
  selectedIntro,
  ex2Checked,
  selectedReasons,
  ex3Checked,
  onSelectIntro,
  onCheckEx2,
  onResetEx2,
  onToggleReason,
  onCheckEx3,
  onResetEx3,
}: Stage2Props) {
  const [compareHighlights, setCompareHighlights] = useState(false);
  const t = UI_TEXT[lang];

  const ex2Eval = ex2Checked;
  const ex2Correct = selectedIntro === '2';

  const ex3Eval = ex3Checked;
  const ex3Score = EX3_REASONS.filter((r) => {
    const ticked = selectedReasons.includes(r.id);
    return ticked === r.isTrueForBest;
  }).length;

  return (
    <div className="space-y-8">
      {/* Exercise 2: Choose the best introduction */}
      <section aria-labelledby="ex2-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s2Ex2Kicker}
            </div>
            <h2 id="ex2-heading" className="text-2xl font-semibold text-slate-900">
              {t.s2Ex2Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s2Ex2Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCompareHighlights((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
              compareHighlights
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {compareHighlights ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{compareHighlights ? t.hideOverlay : t.compareRubric}</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {compareHighlights && (
            <div className="p-3.5 rounded-lg bg-[#F7F9F9] border border-slate-200 text-xs text-slate-700 flex flex-wrap gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-[#FFE2E9] border border-[#F9B8C6]" aria-hidden="true" />
                {t.legendCopied}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-slate-200 border border-slate-300" aria-hidden="true" />
                {t.legendGeneral}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-[#D7F4EF] border border-[#9FD9D0]" aria-hidden="true" />
                {t.legendParaphrase}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-[#B7EAE2] border border-[#1E9788]" aria-hidden="true" />
                {t.legendDirection}
              </span>
            </div>
          )}

          <div className="grid gap-4">
            {EX2_INTRODUCTIONS.map((intro) => {
              const isSelected = selectedIntro === intro.id;
              const isBest = intro.id === '2';

              let borderClass = 'border-slate-200 hover:border-[#9FD9D0] bg-white';
              if (ex2Eval) {
                if (isBest && isSelected) {
                  borderClass = 'border-[#1E9788] bg-[#EEFAF8]/60';
                } else if (isSelected && !isBest) {
                  borderClass = 'border-[#EF0037] bg-[#FFF0F3]/60';
                }
              } else if (isSelected) {
                borderClass = 'border-[#1E9788] bg-[#EEFAF8]/50';
              }

              return (
                <button
                  key={intro.id}
                  type="button"
                  onClick={() => onSelectIntro(intro.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-5 rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${borderClass}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono tabular-nums font-semibold border ${
                          isSelected
                            ? 'bg-[#1E9788] text-white border-[#1E9788]'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {intro.id}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {t.introLabel} {intro.id}
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {intro.wordCount} {t.wordsUnit}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-slate-800">
                    {compareHighlights
                      ? intro.segments.map((seg, idx) => {
                          let highlightCls = '';
                          if (seg.highlight === 'copied') {
                            highlightCls = 'bg-[#FFE2E9] text-[#9A0023] px-1 rounded';
                          } else if (seg.highlight === 'general') {
                            highlightCls = 'bg-slate-200/80 text-slate-900 px-1 rounded';
                          } else if (seg.highlight === 'paraphrase') {
                            highlightCls = 'bg-[#D7F4EF] text-[#0E4F47] px-1 rounded';
                          } else if (seg.highlight === 'direction') {
                            highlightCls = 'bg-[#B7EAE2] text-[#0B3D37] px-1 rounded font-medium';
                          }
                          return (
                            <span key={idx} className={highlightCls} title={seg.note}>
                              {seg.text}
                            </span>
                          );
                        })
                      : intro.text}
                  </p>
                </button>
              );
            })}
          </div>

          {ex2Eval && (
            <div
              className={`p-4 rounded-lg border text-sm leading-relaxed ${
                selectedIntro
                  ? ex2Correct
                    ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                    : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
                  : 'bg-[#F7F9F9] border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                {selectedIntro ? (
                  ex2Correct ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#1E9788] shrink-0" aria-hidden="true" />
                      <span className="text-[#13675D]">{t.s2CorrectTitle}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-[#EF0037] shrink-0" aria-hidden="true" />
                      <span className="text-[#B8002A]">{t.s2WrongTitle}</span>
                    </>
                  )
                ) : (
                  <span className="text-slate-800">{t.s2KeyTitle}</span>
                )}
              </div>
              <p className="text-slate-700 text-[13px]">{t.s2Explanation}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex items-center justify-between gap-4">
          <span className="text-sm text-slate-600">
            {selectedIntro ? `${t.selectedIntroPrefix} ${selectedIntro}` : t.selectIntroPrompt}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx2}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx2}
              disabled={!selectedIntro}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.checkChoiceBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 3: Tick the reasons why the chosen Introduction is better */}
      <section aria-labelledby="ex3-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s2Ex3Kicker}
          </div>
          <h2 id="ex3-heading" className="text-2xl font-semibold text-slate-900">
            {t.s2Ex3Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s2Ex3Desc}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {EX3_REASONS.map((reason) => {
            const isTicked = selectedReasons.includes(reason.id);
            const matchesKey = isTicked === reason.isTrueForBest;
            const viReason = EX3_VI[reason.id];

            return (
              <div key={reason.id} className="px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => onToggleReason(reason.id)}
                  aria-pressed={isTicked}
                  className="w-full flex items-start gap-3.5 text-left group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E9788] rounded-md"
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isTicked
                        ? 'bg-[#1E9788] border-[#1E9788] text-white'
                        : 'bg-white border-slate-300 group-hover:border-[#1E9788]'
                    }`}
                  >
                    {isTicked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono tabular-nums text-xs text-slate-500">
                        {reason.id}.
                      </span>
                      <span className="text-[15px] text-slate-900 leading-snug">
                        {lang === 'vi' ? viReason.text : reason.text}
                      </span>
                    </div>
                    {lang === 'vi' && (
                      <div className="text-xs text-slate-500 mt-0.5 pl-5">
                        {reason.text}
                      </div>
                    )}

                    {ex3Eval && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                        {ex3Checked ? (
                          matchesKey ? (
                            <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                              {t.correct}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                              <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                              {reason.isTrueForBest ? t.shouldTick : t.shouldNotTick}
                            </span>
                          )
                        ) : (
                          <span
                            className={`font-medium ${
                              reason.isTrueForBest ? 'text-[#13675D]' : 'text-slate-500'
                            }`}
                          >
                            {reason.isTrueForBest ? t.keyTick : t.keyUntick}
                          </span>
                        )}
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600">
                          {lang === 'vi' ? viReason.explanation : reason.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex3Checked ? (
              <span>
                {t.accuracy}: <strong className="text-slate-900">{ex3Score} / {EX3_REASONS.length}</strong> ({t.keyPrefix}: 1, 3, 4, 5, 6)
              </span>
            ) : (
              <span>
                {t.tickedPrefix}: <strong className="text-slate-900">{selectedReasons.length}</strong> {t.of7Statements}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx3}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx3}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.checkReasonsBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

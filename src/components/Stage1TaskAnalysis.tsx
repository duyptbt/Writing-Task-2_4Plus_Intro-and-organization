import { AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { EX1_QUESTIONS } from '../data/lessonData';
import { EX1_VI, Language, UI_TEXT } from '../data/i18n';

interface Stage1Props {
  lang: Language;
  answers: Record<number, string>;
  checked: boolean;
  onSelectAnswer: (questionId: number, optionId: string) => void;
  onCheck: () => void;
  onReset: () => void;
}

export default function Stage1TaskAnalysis({
  lang,
  answers,
  checked,
  onSelectAnswer,
  onCheck,
  onReset,
}: Stage1Props) {
  const t = UI_TEXT[lang];
  const answeredCount = Object.keys(answers).length;
  const correctCount = EX1_QUESTIONS.filter(
    (q) => answers[q.id] === q.correctOptionId
  ).length;

  return (
    <section aria-labelledby="stage1-heading" className="bg-white border border-slate-200 rounded-xl">
      <div className="p-6 sm:p-8 border-b border-slate-200">
        <div className="text-xs font-medium text-[#13675D] mb-1.5">
          {t.s1Kicker}
        </div>
        <h2 id="stage1-heading" className="text-2xl font-semibold text-slate-900">
          {t.s1Heading}
        </h2>
        <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
          {t.s1Desc}
        </p>
      </div>

      <div className="divide-y divide-slate-200">
        {EX1_QUESTIONS.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctOptionId;
          const showEvaluation = checked;
          const viQ = EX1_VI[q.id];

          return (
            <div key={q.id} className="p-6 sm:px-8">
              <div className="flex items-start gap-3">
                <span className="font-mono tabular-nums text-sm font-semibold text-[#1E9788] mt-0.5 shrink-0 w-6">
                  {String(q.id).padStart(2, '0')}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-slate-900 leading-snug">
                    {lang === 'vi' ? viQ.question : q.question}
                  </p>

                  <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt) => {
                      const isSelected = selected === opt.id;
                      const isRightOption = opt.id === q.correctOptionId;

                      let buttonStyle =
                        'bg-white border-slate-200 text-slate-700 hover:border-[#9FD9D0] hover:bg-[#EEFAF8]/50';

                      if (showEvaluation) {
                        if (isRightOption && isSelected) {
                          buttonStyle =
                            'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] font-medium';
                        } else if (isSelected && !isRightOption) {
                          buttonStyle =
                            'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023] font-medium';
                        }
                      } else if (isSelected) {
                        buttonStyle =
                          'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] font-medium';
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onSelectAnswer(q.id, opt.id)}
                          aria-pressed={isSelected}
                          className={`text-left px-4 py-2.5 rounded-lg border text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                            q.options.length <= 3 ? 'sm:col-span-2' : ''
                          } ${buttonStyle}`}
                        >
                          {lang === 'vi' ? viQ.options[opt.id] ?? opt.label : opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {showEvaluation && (
                    <div
                      className={`mt-3 p-3.5 rounded-lg border text-sm leading-relaxed ${
                        selected
                          ? isCorrect
                            ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                            : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
                          : 'bg-[#F7F9F9] border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-medium text-xs mb-1">
                        {selected ? (
                          isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-[#1E9788] shrink-0" aria-hidden="true" />
                              <span className="text-[#13675D]">{t.correct}</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-[#EF0037] shrink-0" aria-hidden="true" />
                              <span className="text-[#B8002A]">{t.checkAgain}</span>
                            </>
                          )
                        ) : (
                          <span className="text-slate-700">{t.answerKey}</span>
                        )}
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-slate-800">
                          {t.keyPrefix}: {lang === 'vi' ? viQ.keyAnswer : q.keyAnswer}
                        </span>
                      </div>
                      <p className="text-slate-700 text-[13px]">
                        {lang === 'vi' ? viQ.explanation : q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-slate-600 font-mono tabular-nums">
          {checked ? (
            <span>
              {t.score}: <strong className="text-slate-900">{correctCount} / {EX1_QUESTIONS.length}</strong>
            </span>
          ) : (
            <span>
              {t.answered}: <strong className="text-slate-900">{answeredCount} / {EX1_QUESTIONS.length}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t.reset}</span>
          </button>
          <button
            type="button"
            onClick={onCheck}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
          >
            {t.s1CheckBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

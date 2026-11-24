import { AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  EX4_6_TABLE_ROWS,
  EX4_IDEAS,
  EX5_ITEMS,
  WordClassChoice,
} from '../data/lessonData';
import {
  EX4_IDEAS_VI,
  EX5_NOTES_VI,
  Language,
  ORG_ROLE_VI,
  UI_TEXT,
} from '../data/i18n';

interface Stage3Props {
  lang: Language;
  ex4Answers: Record<number, 'a' | 'b' | 'c'>;
  ex4Checked: boolean;
  ex5Answers: Record<string, WordClassChoice>;
  ex5Checked: boolean;
  ex6Answers: Record<number, string>;
  ex6Checked: boolean;
  onSetEx4: (rowNum: number, ideaId: 'a' | 'b' | 'c') => void;
  onCheckEx4: () => void;
  onResetEx4: () => void;
  onSetEx5: (itemId: string, choice: WordClassChoice) => void;
  onCheckEx5: () => void;
  onResetEx5: () => void;
  onSetEx6: (rowNum: number, phrase: string) => void;
  onCheckEx6: () => void;
  onResetEx6: () => void;
}

const LINKER_PHRASES = [
  'for example',
  'as a result',
  'because',
  'moreover (... can ...)',
  'so',
];

export default function Stage3Organization({
  lang,
  ex4Answers,
  ex4Checked,
  ex5Answers,
  ex5Checked,
  ex6Answers,
  ex6Checked,
  onSetEx4,
  onCheckEx4,
  onResetEx4,
  onSetEx5,
  onCheckEx5,
  onResetEx5,
  onSetEx6,
  onCheckEx6,
  onResetEx6,
}: Stage3Props) {
  const t = UI_TEXT[lang];
  const ex4BlankRows = EX4_6_TABLE_ROWS.filter((r) => r.blankKey);
  const ex4CorrectCount = ex4BlankRows.filter(
    (r) => ex4Answers[r.number] === r.blankKey
  ).length;

  const ex5CorrectCount = EX5_ITEMS.filter(
    (item) => ex5Answers[item.id] === item.correct
  ).length;

  const ex6Rows = EX4_6_TABLE_ROWS.filter((r) => r.linkingTarget);
  const ex6CorrectCount = ex6Rows.filter(
    (r) => r.correctLinkers?.includes(ex6Answers[r.number] ?? '')
  ).length;

  const getIdeaText = (id?: 'a' | 'b' | 'c') =>
    EX4_IDEAS.find((idea) => idea.id === id)?.text ?? '';

  const formatRole = (role: string) =>
    lang === 'vi' ? ORG_ROLE_VI[role] ?? role : role;

  const formatWordClassKey = (choice: WordClassChoice) => {
    if (choice === 'both') return t.bothFullLabel;
    if (choice === 'adverb') return t.adverbLabel;
    return t.conjunctionLabel;
  };

  return (
    <div className="space-y-8">
      {/* Exercise 4: Organization Table */}
      <section aria-labelledby="ex4-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s3Ex4Kicker}
          </div>
          <h2 id="ex4-heading" className="text-2xl font-semibold text-slate-900">
            {t.s3Ex4Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s3Ex4Desc}
          </p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3 bg-[#F7F9F9] border border-slate-200 rounded-lg p-4">
            {EX4_IDEAS.map((idea) => (
              <div key={idea.id} className="text-sm text-slate-800 leading-snug">
                <span className="font-mono font-semibold text-[#EF0037] mr-1.5">
                  {idea.id}.
                </span>
                <span>{idea.text}</span>
                {lang === 'vi' && (
                  <div className="text-xs text-slate-500 mt-0.5 pl-4">
                    ({EX4_IDEAS_VI[idea.id]})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F7F9F9] text-xs font-semibold text-slate-600">
                <th className="py-3 px-6 sm:px-8 w-44">{t.colOrganization}</th>
                <th className="py-3 px-6 sm:px-8">{t.colIdeas}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {EX4_6_TABLE_ROWS.map((row) => {
                const chosen = ex4Answers[row.number];
                const isBlankRow = Boolean(row.blankKey);
                const isCorrect = chosen === row.blankKey;
                const showEval = ex4Checked;

                return (
                  <tr key={row.number} className="align-top">
                    <td className="py-4 px-6 sm:px-8 font-semibold text-slate-900 whitespace-nowrap">
                      {formatRole(row.role)}
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-slate-700">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono tabular-nums text-xs font-semibold text-[#1E9788] mt-1 shrink-0">
                          {row.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          {!isBlankRow ? (
                            <p className="leading-relaxed">{row.fixedText}</p>
                          ) : (
                            <div className="space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                {row.prefix && (
                                  <span className="text-slate-700 font-medium">
                                    {row.prefix}
                                  </span>
                                )}
                                <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                                  {EX4_IDEAS.map((idea) => {
                                    const active = chosen === idea.id;
                                    return (
                                      <button
                                        key={idea.id}
                                        type="button"
                                        onClick={() => onSetEx4(row.number, idea.id)}
                                        aria-pressed={active}
                                        className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                                          active
                                            ? 'bg-[#1E9788] text-white shadow-sm'
                                            : 'text-slate-700 hover:bg-white hover:text-slate-900'
                                        }`}
                                      >
                                        {idea.id}
                                      </button>
                                    );
                                  })}
                                </div>
                                {chosen && (
                                  <span className="text-slate-900 font-medium">
                                    {getIdeaText(chosen)}
                                  </span>
                                )}
                              </div>

                              {showEval && (
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                                  {ex4Checked ? (
                                    isCorrect ? (
                                      <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                                        {t.correct}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                                        <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                                        {t.checkAgain}
                                      </span>
                                    )
                                  ) : null}
                                  <span className="text-slate-600">
                                    {t.keyPrefix}: <strong className="text-slate-900 font-mono">{row.blankKey}</strong> ({getIdeaText(row.blankKey)})
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex4Checked ? (
              <span>
                {t.score}: <strong className="text-slate-900">{ex4CorrectCount} / 3</strong> ({t.keyPrefix}: 2a, 4c, 6b)
              </span>
            ) : (
              <span>
                {t.placedPrefix}: <strong className="text-slate-900">{Object.keys(ex4Answers).length} / 3</strong> {t.ideasSuffix}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx4}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx4}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.checkTableBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 5: Adverbs or Conjunctions */}
      <section aria-labelledby="ex5-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s3Ex5Kicker}
          </div>
          <h2 id="ex5-heading" className="text-2xl font-semibold text-slate-900">
            {t.s3Ex5Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s3Ex5Desc}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {EX5_ITEMS.map((item) => {
            const chosen = ex5Answers[item.id];
            const isCorrect = chosen === item.correct;
            const showEval = ex5Checked;

            return (
              <div key={item.id} className="px-6 py-4 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold text-slate-900">
                    {item.phrase}
                  </span>

                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
                    {(
                      [
                        { id: 'adverb', label: t.adverbLabel },
                        { id: 'conjunction', label: t.conjunctionLabel },
                        { id: 'both', label: t.bothLabel },
                      ] as const
                    ).map((opt) => {
                      const active = chosen === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onSetEx5(item.id, opt.id)}
                          aria-pressed={active}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                            active
                              ? 'bg-[#1E9788] text-white shadow-sm'
                              : 'text-slate-700 hover:bg-white hover:text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showEval && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                    {ex5Checked ? (
                      isCorrect ? (
                        <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                          {t.correct}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                          {t.keyPrefix}: {formatWordClassKey(item.correct)}
                        </span>
                      )
                    ) : (
                      <span className="font-medium text-slate-800">
                        {t.keyPrefix}: {formatWordClassKey(item.correct)}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      {lang === 'vi' ? EX5_NOTES_VI[item.id] : item.note}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex5Checked ? (
              <span>
                {t.score}: <strong className="text-slate-900">{ex5CorrectCount} / {EX5_ITEMS.length}</strong>
              </span>
            ) : (
              <span>
                {t.classifiedPrefix}: <strong className="text-slate-900">{Object.keys(ex5Answers).length} / {EX5_ITEMS.length}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx5}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx5}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.checkCategoriesBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 6: Match words & phrases to ideas 2–6 */}
      <section aria-labelledby="ex6-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s3Ex6Kicker}
          </div>
          <h2 id="ex6-heading" className="text-2xl font-semibold text-slate-900">
            {t.s3Ex6Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s3Ex6Desc}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {ex6Rows.map((row) => {
            const chosen = ex6Answers[row.number] ?? '';
            const isCorrect = row.correctLinkers?.includes(chosen) ?? false;
            const showEval = ex6Checked;
            const ideaSummary = row.fixedText
              ? row.fixedText
              : `${row.prefix ? `${row.prefix} ` : ''}${getIdeaText(row.blankKey)}`;

            return (
              <div key={row.number} className="px-6 py-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#1E9788]">
                        {row.number}.
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatRole(row.role)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5 leading-snug">
                      {ideaSummary}
                    </p>
                  </div>

                  <div className="shrink-0 w-full md:w-56">
                    <label htmlFor={`ex6-row-${row.number}`} className="sr-only">
                      {t.chooseLinkingWord} ({row.role})
                    </label>
                    <select
                      id={`ex6-row-${row.number}`}
                      value={chosen}
                      onChange={(e) => onSetEx6(row.number, e.target.value)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                        showEval && ex6Checked
                          ? isCorrect
                            ? 'border-[#1E9788] bg-[#EEFAF8]/50'
                            : 'border-[#EF0037] bg-[#FFF0F3]/50'
                          : 'border-slate-300'
                      }`}
                    >
                      <option value="">{t.chooseLinkingWord}</option>
                      {LINKER_PHRASES.map((phrase) => (
                        <option key={phrase} value={phrase}>
                          {phrase}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {showEval && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    {ex6Checked ? (
                      isCorrect ? (
                        <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />
                          {t.correct}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#EF0037]" aria-hidden="true" />
                          {t.checkAgain}
                        </span>
                      )
                    ) : null}
                    <span className="text-slate-600">
                      {t.keyPrefix}: <strong className="text-slate-900">{row.primaryLinker}</strong>
                      {row.number === 4 ? ` ${t.orForExample}` : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex6Checked ? (
              <span>
                {t.score}: <strong className="text-slate-900">{ex6CorrectCount} / {ex6Rows.length}</strong>
              </span>
            ) : (
              <span>
                {t.matchedPrefix}: <strong className="text-slate-900">{Object.values(ex6Answers).filter(Boolean).length} / {ex6Rows.length}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx6}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx6}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.checkMatchesBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

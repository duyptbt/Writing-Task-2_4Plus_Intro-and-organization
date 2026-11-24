import { useState } from 'react';
import { CheckCircle2, Eye, EyeOff, Plus, RotateCcw } from 'lucide-react';
import {
  COMPLETED_MODEL_ANNOTATIONS,
  DISCOURSE_MARKERS_DRAFT,
  EX9_SAMPLE_ANSWERS,
  SAMPLE_DRAWBACK_PARAGRAPH,
} from '../data/lessonData';
import { Language, ORG_ROLE_VI, UI_TEXT } from '../data/i18n';

interface Stage5Props {
  lang: Language;
  physicalIdeas: [string, string, string, string];
  emotionalIdeas: [string, string, string, string];
  draftText: string;
  onUpdatePhysical: (index: number, value: string) => void;
  onUpdateEmotional: (index: number, value: string) => void;
  onLoadSampleMindMaps: () => void;
  onResetMindMaps: () => void;
  onChangeDraft: (text: string) => void;
  onResetDraft: () => void;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

interface RadialMapProps {
  heading: string;
  hubLabel: string;
  givenWord: string;
  givenPrefix: string;
  ideaPlaceholder: string;
  nodesUnit: string;
  values: [string, string, string, string];
  onChange: (index: number, value: string) => void;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  spokeColor: string;
  hubFill: string;
  hubStroke: string;
  hubTextClass: string;
  focusBorderClass: string;
}

function RadialMindMap({
  heading,
  hubLabel,
  givenWord,
  givenPrefix,
  ideaPlaceholder,
  nodesUnit,
  values,
  onChange,
  accentBg,
  accentBorder,
  accentText,
  spokeColor,
  hubFill,
  hubStroke,
  hubTextClass,
  focusBorderClass,
}: RadialMapProps) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-[#F7F9F9]">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${accentText}`}>{heading}</h3>
        <span className="text-xs font-mono tabular-nums text-slate-500">
          {values.filter((v) => v.trim().length > 0).length + 1} / 5 {nodesUnit}
        </span>
      </div>

      {/* Responsive radial layout with clean SVG spokes on sm+ and tidy stack on xs */}
      <div className="relative mx-auto max-w-[340px]">
        <svg
          viewBox="0 0 340 280"
          className="hidden sm:block w-full h-[280px] pointer-events-none"
          aria-hidden="true"
        >
          {/* Spokes from center (170, 145) to the 5 nodes */}
          <line x1="170" y1="145" x2="170" y2="38" stroke={spokeColor} strokeWidth="2" />
          <line x1="170" y1="145" x2="64" y2="112" stroke={spokeColor} strokeWidth="2" />
          <line x1="170" y1="145" x2="276" y2="112" stroke={spokeColor} strokeWidth="2" />
          <line x1="170" y1="145" x2="96" y2="236" stroke={spokeColor} strokeWidth="2" />
          <line x1="170" y1="145" x2="244" y2="236" stroke={spokeColor} strokeWidth="2" />
          {/* Center Hub */}
          <circle
            cx="170"
            cy="145"
            r="38"
            fill={hubFill}
            stroke={hubStroke}
            strokeWidth="2"
          />
          <text
            x="170"
            y="149"
            textAnchor="middle"
            className={`text-[12px] font-semibold ${hubTextClass}`}
          >
            {hubLabel}
          </text>
        </svg>

        {/* Desktop radial nodes overlaid on SVG */}
        <div className="hidden sm:block">
          {/* Top node: pre-filled given word */}
          <div
            className={`absolute top-[10px] left-1/2 -translate-x-1/2 w-[112px] py-2 px-2.5 rounded-lg border text-center text-xs font-semibold ${accentBg} ${accentBorder} ${accentText}`}
          >
            {givenWord}
          </div>

          {/* Left node: index 0 */}
          <input
            type="text"
            value={values[0]}
            onChange={(e) => onChange(0, e.target.value)}
            placeholder={`${ideaPlaceholder} 1...`}
            aria-label={`${heading} ${ideaPlaceholder} 1`}
            className={`absolute top-[94px] left-0 w-[124px] px-2.5 py-2 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 ${focusBorderClass}`}
          />

          {/* Right node: index 1 */}
          <input
            type="text"
            value={values[1]}
            onChange={(e) => onChange(1, e.target.value)}
            placeholder={`${ideaPlaceholder} 2...`}
            aria-label={`${heading} ${ideaPlaceholder} 2`}
            className={`absolute top-[94px] right-0 w-[124px] px-2.5 py-2 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 ${focusBorderClass}`}
          />

          {/* Bottom-left node: index 2 */}
          <input
            type="text"
            value={values[2]}
            onChange={(e) => onChange(2, e.target.value)}
            placeholder={`${ideaPlaceholder} 3...`}
            aria-label={`${heading} ${ideaPlaceholder} 3`}
            className={`absolute bottom-[14px] left-[18px] w-[136px] px-2.5 py-2 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 ${focusBorderClass}`}
          />

          {/* Bottom-right node: index 3 */}
          <input
            type="text"
            value={values[3]}
            onChange={(e) => onChange(3, e.target.value)}
            placeholder={`${ideaPlaceholder} 4...`}
            aria-label={`${heading} ${ideaPlaceholder} 4`}
            className={`absolute bottom-[14px] right-[18px] w-[136px] px-2.5 py-2 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 ${focusBorderClass}`}
          />
        </div>

        {/* Mobile stacked layout */}
        <div className="sm:hidden space-y-2.5">
          <div
            className={`px-3 py-2 rounded-lg border text-sm font-semibold ${accentBg} ${accentBorder} ${accentText}`}
          >
            {givenPrefix}: {givenWord}
          </div>
          {values.map((val, idx) => (
            <input
              key={idx}
              type="text"
              value={val}
              onChange={(e) => onChange(idx, e.target.value)}
              placeholder={`${ideaPlaceholder} ${idx + 1}...`}
              aria-label={`${heading} ${ideaPlaceholder} ${idx + 1}`}
              className={`w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 ${focusBorderClass}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Stage5BrainstormDraft({
  lang,
  physicalIdeas,
  emotionalIdeas,
  draftText,
  onUpdatePhysical,
  onUpdateEmotional,
  onLoadSampleMindMaps,
  onResetMindMaps,
  onChangeDraft,
  onResetDraft,
}: Stage5Props) {
  const [showWordHelper, setShowWordHelper] = useState(false);
  const [showModelFramework, setShowModelFramework] = useState(false);
  const [showSampleDraft, setShowSampleDraft] = useState(false);

  const t = UI_TEXT[lang];

  const wordCount = countWords(draftText);
  const inTargetRange = wordCount >= 60 && wordCount <= 85;
  const wordCountStatus =
    wordCount === 0
      ? t.statusStart
      : wordCount < 60
        ? t.statusAim
        : inTargetRange
          ? t.statusTarget
          : t.statusAbove;

  const insertPhysicalSuggestion = (word: string) => {
    if (physicalIdeas.some((v) => v.toLowerCase() === word.toLowerCase())) return;
    const emptyIdx = physicalIdeas.findIndex((v) => !v.trim());
    onUpdatePhysical(emptyIdx === -1 ? 3 : emptyIdx, word);
  };

  const insertEmotionalSuggestion = (word: string) => {
    if (emotionalIdeas.some((v) => v.toLowerCase() === word.toLowerCase())) return;
    const emptyIdx = emotionalIdeas.findIndex((v) => !v.trim());
    onUpdateEmotional(emptyIdx === -1 ? 3 : emptyIdx, word);
  };

  const insertMarkerIntoDraft = (marker: string) => {
    const trimmed = draftText.trimEnd();
    const spacer = trimmed.length === 0 ? '' : ' ';
    onChangeDraft(`${trimmed}${spacer}${marker} `);
  };

  const markerUsage = DISCOURSE_MARKERS_DRAFT.map((marker) => {
    const clean = marker.replace(',', '').toLowerCase();
    const used = draftText.toLowerCase().includes(clean);
    return { marker, used };
  });

  const activeBrainstormed = [
    EX9_SAMPLE_ANSWERS.physical.given,
    ...physicalIdeas.filter((s) => s.trim()),
    EX9_SAMPLE_ANSWERS.emotional.given,
    ...emotionalIdeas.filter((s) => s.trim()),
  ];

  return (
    <div className="space-y-8">
      {/* Exercise 9: Mind Maps */}
      <section aria-labelledby="ex9-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s5Ex9Kicker}
            </div>
            <h2 id="ex9-heading" className="text-2xl font-semibold text-slate-900">
              {t.s5Ex9Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s5Ex9Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowWordHelper((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showWordHelper
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showWordHelper ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{showWordHelper ? t.hideWordBankBtn : t.showWordBankBtn}</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RadialMindMap
              heading={t.physicalProblems}
              hubLabel={t.physicalHub}
              givenWord={EX9_SAMPLE_ANSWERS.physical.given}
              givenPrefix={t.givenPrefix}
              ideaPlaceholder={t.ideaPlaceholder}
              nodesUnit={t.nodesUnit}
              values={physicalIdeas}
              onChange={onUpdatePhysical}
              accentBg="bg-[#FFF0F3]"
              accentBorder="border-[#F9B8C6]"
              accentText="text-[#B8002A]"
              spokeColor="#F5A6B8"
              hubFill="#EF0037"
              hubStroke="#EF0037"
              hubTextClass="fill-white"
              focusBorderClass="focus:border-[#EF0037] focus-visible:outline-[#EF0037]/25"
            />
            <RadialMindMap
              heading={t.emotionalProblems}
              hubLabel={t.emotionalHub}
              givenWord={EX9_SAMPLE_ANSWERS.emotional.given}
              givenPrefix={t.givenPrefix}
              ideaPlaceholder={t.ideaPlaceholder}
              nodesUnit={t.nodesUnit}
              values={emotionalIdeas}
              onChange={onUpdateEmotional}
              accentBg="bg-[#EEFAF8]"
              accentBorder="border-[#9FD9D0]"
              accentText="text-[#13675D]"
              spokeColor="#8ED6CB"
              hubFill="#1E9788"
              hubStroke="#1E9788"
              hubTextClass="fill-white"
              focusBorderClass="focus:border-[#1E9788] focus-visible:outline-[#1E9788]/25"
            />
          </div>

          {showWordHelper && (
            <div className="p-5 rounded-xl bg-[#F7F9F9] border border-slate-200 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-xs font-semibold text-[#B8002A] mb-2">
                  {t.physicalIdeasHint}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ...EX9_SAMPLE_ANSWERS.physical.samples,
                    ...EX9_SAMPLE_ANSWERS.physical.extraB1Suggestions,
                  ].map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => insertPhysicalSuggestion(word)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-[#EF0037] hover:text-[#B8002A] transition-colors"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                      <span>{word}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#13675D] mb-2">
                  {t.emotionalIdeasHint}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ...EX9_SAMPLE_ANSWERS.emotional.samples,
                    ...EX9_SAMPLE_ANSWERS.emotional.extraB1Suggestions,
                  ].map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => insertEmotionalSuggestion(word)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-[#1E9788] hover:text-[#13675D] transition-colors"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                      <span>{word}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onLoadSampleMindMaps}
            className="px-4 py-2 text-xs font-semibold text-[#13675D] bg-[#EEFAF8] border border-[#9FD9D0] rounded-lg hover:bg-[#D7F4EF] transition-colors whitespace-nowrap shrink-0"
          >
            {t.fillSampleIdeasBtn}
          </button>
          <button
            type="button"
            onClick={onResetMindMaps}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t.clearDiagramsBtn}</span>
          </button>
        </div>
      </section>

      {/* Exercises 10 & 11: Guided Drawback Paragraph Builder */}
      <section aria-labelledby="ex11-heading" className="bg-white border border-slate-200 rounded-xl">
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s5Ex11Kicker}
            </div>
            <h2 id="ex11-heading" className="text-2xl font-semibold text-slate-900">
              {t.s5Ex11Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s5Ex11Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModelFramework((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showModelFramework
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showModelFramework ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {showModelFramework ? t.hideFrameworkBtn : t.viewFrameworkBtn}
            </span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {showModelFramework && (
            <div className="p-4 rounded-xl bg-[#F7F9F9] border border-slate-200 space-y-2 text-xs">
              <div className="font-semibold text-slate-900">
                {t.frameworkTitle}
              </div>
              {COMPLETED_MODEL_ANNOTATIONS.map((part) => (
                <p key={part.role} className="text-slate-700 leading-relaxed">
                  <strong className={part.accentText}>
                    {lang === 'vi' ? ORG_ROLE_VI[part.role] ?? part.role : part.role}:
                  </strong>{' '}
                  {part.text}
                </p>
              ))}
            </div>
          )}

          {/* Brainstormed ideas reminder */}
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 mr-1.5">
              {t.yourBrainstormedIdeas}
            </span>
            {activeBrainstormed.join(' · ')}
          </div>

          {/* Clickable Discourse Markers */}
          <div>
            <div className="text-xs font-medium text-slate-600 mb-2">
              {t.discourseMarkerPrompt}
            </div>
            <div className="flex flex-wrap gap-2">
              {markerUsage.map(({ marker, used }) => (
                <button
                  key={marker}
                  type="button"
                  onClick={() => insertMarkerIntoDraft(marker)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                    used
                      ? 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#1E9788] hover:bg-[#EEFAF8]/50'
                  }`}
                >
                  {used && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9788]" aria-hidden="true" />}
                  <span>{marker}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paragraph Writing Area */}
          <div>
            <label htmlFor="drawback-paragraph-input" className="sr-only">
              {t.s5Ex11Heading}
            </label>
            <textarea
              id="drawback-paragraph-input"
              rows={7}
              value={draftText}
              onChange={(e) => onChangeDraft(e.target.value)}
              placeholder={t.draftPlaceholder}
              className="w-full p-4 rounded-xl border border-slate-300 bg-white text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-[#1E9788] focus-visible:outline-2 focus-visible:outline-[#1E9788]/25 resize-y"
            />
          </div>

          {/* Live Self-Check Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
              <span className="font-mono tabular-nums">
                {t.wordsCounterLabel}:{' '}
                <strong className={inTargetRange ? 'text-[#13675D]' : 'text-slate-900'}>
                  {wordCount}
                </strong>{' '}
                / {t.targetWordRange}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className={inTargetRange ? 'text-[#13675D] font-medium' : 'text-slate-600'}>
                {wordCountStatus}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono tabular-nums">
                {t.linkingWordsUsed}:{' '}
                <strong className="text-slate-900">
                  {markerUsage.filter((m) => m.used).length} / {markerUsage.length}
                </strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowSampleDraft((prev) => !prev)}
              className="text-xs font-semibold text-[#B8002A] hover:text-[#EF0037] underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {showSampleDraft ? t.hideSampleBtn : t.compareSampleBtn}
            </button>
          </div>

          {showSampleDraft && (
            <div className="p-5 rounded-xl bg-[#F7F9F9] border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-900">
                  {t.modelDrawbackTitle}
                </span>
                <span className="font-mono tabular-nums text-slate-500">
                  {countWords(SAMPLE_DRAWBACK_PARAGRAPH)} {t.wordsUnit}
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">
                {SAMPLE_DRAWBACK_PARAGRAPH}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex items-center justify-between gap-4">
          <span className="text-xs text-slate-600">{t.autoSaveNote}</span>
          <button
            type="button"
            onClick={onResetDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t.resetDraftBtn}</span>
          </button>
        </div>
      </section>
    </div>
  );
}

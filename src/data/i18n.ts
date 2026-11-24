import { Ex7WordForm, StageId } from './lessonData';

export type Language = 'en' | 'vi';

export interface StageI18n {
  navLabel: string;
  title: string;
  exercisesLabel: string;
  teacherTip: string;
}

export const STAGES_I18N: Record<Language, Record<StageId, StageI18n>> = {
  en: {
    'task-analysis': {
      navLabel: '1. Task Analysis',
      title: 'Analysing Writing Task 2',
      exercisesLabel: 'Exercise 1',
      teacherTip:
        'Spend 3–4 minutes analysing the question and making a brief plan before writing. Identify every part of the italic rubric so nothing is missed.',
    },
    introduction: {
      navLabel: '2. Introduction',
      title: 'Evaluating Essay Introductions',
      exercisesLabel: 'Exercises 2 & 3',
      teacherTip:
        'A strong introduction opens with a general statement, paraphrases both views, and sets the direction for the whole essay—keep referring back to this structure for continuity.',
    },
    organization: {
      navLabel: '3. Organization',
      title: 'Paragraph Organization & Linking Words',
      exercisesLabel: 'Exercises 4, 5 & 6',
      teacherTip:
        'Adverbs and conjunctions show clear links between ideas in a paragraph. Note that "so" can function in both categories depending on how it connects clauses.',
    },
    'model-paragraph': {
      navLabel: '4. Model Paragraph',
      title: 'Word Forms & Model Paragraph',
      exercisesLabel: 'Exercises 7 & 8',
      teacherTip:
        'Working out the grammatical word form (noun, verb, conjunction, adverb) before choosing a word is also a high-value strategy for IELTS Reading and Listening gap-fills.',
    },
    'brainstorm-draft': {
      navLabel: '5. Brainstorm & Draft',
      title: 'Brainstorming Drawbacks & Guided Paragraph',
      exercisesLabel: 'Exercises 9, 10 & 11',
      teacherTip:
        'At Level B1 (4.0 Plus), focus on writing one well-organized paragraph with clear discourse markers rather than rushing into a full essay. Use the positive model paragraph as your structural framework.',
    },
  },
  vi: {
    'task-analysis': {
      navLabel: '1. Phân tích đề',
      title: 'Phân tích bài Writing Task 2',
      exercisesLabel: 'Bài tập 1',
      teacherTip:
        'Hãy dành 3–4 phút để phân tích câu hỏi và lập dàn ý ngắn trước khi viết. Xác định rõ từng phần trong đề bài in nghiêng để không bỏ sót ý nào.',
    },
    introduction: {
      navLabel: '2. Mở bài',
      title: 'Đánh giá đoạn Mở bài (Introduction)',
      exercisesLabel: 'Bài tập 2 & 3',
      teacherTip:
        'Một đoạn mở bài tốt bắt đầu bằng câu khái quát, diễn đạt lại cả hai quan điểm và định hướng rõ cho toàn bộ bài viết—hãy luôn bám sát cấu trúc này để đảm bảo mạch lạc.',
    },
    organization: {
      navLabel: '3. Bố cục đoạn',
      title: 'Tổ chức đoạn văn & Từ nối',
      exercisesLabel: 'Bài tập 4, 5 & 6',
      teacherTip:
        'Trạng từ và liên từ giúp thể hiện mối liên kết rõ ràng giữa các ý trong đoạn văn. Lưu ý rằng "so" có thể thuộc cả hai nhóm tùy cách nối mệnh đề.',
    },
    'model-paragraph': {
      navLabel: '4. Đoạn văn mẫu',
      title: 'Từ loại & Hoàn thành đoạn văn mẫu',
      exercisesLabel: 'Bài tập 7 & 8',
      teacherTip:
        'Xác định từ loại (danh từ, động từ, liên từ, trạng từ) trước khi điền từ cũng là chiến lược rất hiệu quả cho các bài điền từ trong IELTS Reading và Listening.',
    },
    'brainstorm-draft': {
      navLabel: '5. Lập ý & Viết đoạn',
      title: 'Tìm ý mặt trái & Viết đoạn có hướng dẫn',
      exercisesLabel: 'Bài tập 9, 10 & 11',
      teacherTip:
        'Ở trình độ B1 (4.0 Plus), hãy tập trung viết tốt một đoạn văn có bố cục chặt chẽ và từ nối rõ ràng thay vì vội viết cả bài luận hoàn chỉnh. Dùng đoạn văn mẫu tích cực làm khung tham khảo.',
    },
  },
};

export const UI_TEXT = {
  en: {
    viewTaskPrompt: 'View Task Prompt',
    subtitle: 'Introduction & Organization',
    academicWriting: 'IELTS Academic Writing',
    aim: 'This section aims to help students to write a paragraph with guidance.',
    exercisesMastered: 'Exercises mastered',
    resetAll: 'Reset All',
    nextPrefix: 'Next',
    promptDrawerTitle: 'Task Prompt & Strategy',
    closePromptDrawer: 'Close prompt drawer',

    // Task Prompt Panel
    task2PromptTitle: 'Task 2 Prompt',
    highlight3Parts: 'Highlight 3 Parts',
    hide3Parts: 'Hide 3 Parts',
    part1Label: 'Part 1:',
    part1Desc: 'Positive view (enjoyable & efficient)',
    part2Label: 'Part 2:',
    part2Desc: 'Negative view (physical & emotional problems)',
    part3Label: 'Part 3:',
    part3Desc: 'Discuss both views & give your opinion',
    viPromptTranslationTitle: '',
    viPromptTranslation: '',
    strategyTitle: 'Strategy',
    strategyBody:
      'Make a brief list of three or four main ideas. Then support the ideas with reasons and examples.',
    examInfoTitle: 'Exam information',
    examInfoBody:
      "In Writing Task 2, you have to write an essay on a general academic subject. You do not need to have any specialist knowledge. You are often asked to discuss other people's ideas and give your own opinion.",
    stageGuidancePrefix: 'Stage',
    stageGuidanceSuffix: 'Guidance',

    // Shared Feedback & Actions
    correct: 'Correct',
    checkAgain: 'Check again',
    answerKey: 'Answer Key',
    keyPrefix: 'Key',
    reset: 'Reset',
    score: 'Score',
    answered: 'Answered',
    completed: 'Completed',

    // Stage 1
    s1Kicker: 'Stage 01 · Exercise 1 · Understanding the Rubric',
    s1Heading: 'Analysing Writing Task 2',
    s1Desc:
      'Read the Task 2 prompt in the reference panel, then answer these seven questions about essay structure, word count, and main ideas.',
    s1CheckBtn: 'Check Answers',

    // Stage 2
    s2Ex2Kicker: 'Stage 02 · Exercise 2 · Paraphrasing & Direction',
    s2Ex2Heading: 'Choose the best introduction for the essay',
    s2Ex2Desc:
      'Compare both sample introductions against the Task 2 rubric and select the stronger opening paragraph.',
    compareRubric: 'Compare with Rubric',
    hideOverlay: 'Hide Analysis Overlay',
    legendCopied: 'Copied from rubric',
    legendGeneral: 'General opening statement',
    legendParaphrase: 'Paraphrased views',
    legendDirection: 'Clear opinion & direction',
    wordsUnit: 'words',
    introLabel: 'Introduction',
    s2CorrectTitle: 'Correct — Introduction 2 is stronger',
    s2WrongTitle: 'Check again — Introduction 2 is the better choice',
    s2KeyTitle: 'Answer Key: Introduction 2',
    s2Explanation:
      "Introduction 1 copies wording and grammar directly from the exam rubric. Introduction 2 opens with a general statement, paraphrases both views using synonyms, and clearly signals the essay's direction: positive, negative, and personal opinion.",
    selectedIntroPrefix: 'Selected: Introduction',
    selectIntroPrompt: 'Select an introduction above',
    checkChoiceBtn: 'Check Choice',

    s2Ex3Kicker: 'Stage 02 · Exercise 3 · Criteria Checklist',
    s2Ex3Heading: 'Tick the reasons why the chosen Introduction is better',
    s2Ex3Desc:
      'Select every statement below that accurately describes why the chosen Introduction in Exercise 2 works well.',
    shouldTick: 'Should be ticked',
    shouldNotTick: 'Should not be ticked',
    keyTick: 'Key: Tick',
    keyUntick: 'Key: Leave unticked',
    accuracy: 'Accuracy',
    tickedPrefix: 'Ticked',
    of7Statements: 'of 7 statements',
    checkReasonsBtn: 'Check Reasons',

    // Stage 3
    s3Ex4Kicker: 'Stage 03 · Exercise 4 · Paragraph Blueprint',
    s3Ex4Heading: 'Add ideas a–c to the paragraph organization table',
    s3Ex4Desc:
      'Place the three missing ideas for the second paragraph into rows 2, 4, and 6 so the paragraph flows logically from Topic to Conclusion.',
    colOrganization: 'Organization',
    colIdeas: 'Ideas',
    placedPrefix: 'Placed',
    ideasSuffix: 'ideas',
    checkTableBtn: 'Check Table',

    s3Ex5Kicker: 'Stage 03 · Exercise 5 · Grammar of Linking Words',
    s3Ex5Heading:
      'Decide whether these words and phrases are adverbs or conjunctions',
    s3Ex5Desc:
      'Classify each linking expression below. Hint: one word can belong to both categories.',
    adverbLabel: 'Adverb',
    conjunctionLabel: 'Conjunction',
    bothLabel: 'Both',
    bothFullLabel: 'Both (Adverb & Conjunction)',
    classifiedPrefix: 'Classified',
    checkCategoriesBtn: 'Check Categories',

    s3Ex6Kicker: 'Stage 03 · Exercise 6 · Linking Ideas Together',
    s3Ex6Heading: 'Match the linking phrases to ideas 2–6 in the table',
    s3Ex6Desc:
      'Choose the linking word or phrase from Exercise 5 that best introduces each part of the paragraph plan.',
    chooseLinkingWord: 'Choose linking word...',
    orForExample: '(or for example)',
    matchedPrefix: 'Matched',
    checkMatchesBtn: 'Check Matches',

    // Stage 4
    s4Kicker: 'Stage 04 · Exercises 7 & 8 · Model Paragraph Lab',
    s4Ex7Heading: 'Exercise 7: Identify the word form for each space',
    s4Ex8Heading: 'Exercise 8: Complete the model paragraph',
    s4Ex7Desc:
      'Click each numbered space in the model paragraph and choose whether a noun, verb, (modal) verb, conjunction, or adverb is required.',
    s4Ex8Desc:
      'Select a numbered space and click a word from the bank to build the complete positive body paragraph. Click a filled active space to clear it.',
    tabEx7: 'Ex. 7 Word Forms',
    tabEx8: 'Ex. 8 Fill Words',
    chooseFormPlaceholder: 'choose form',
    activeSpace: 'Active Space',
    previousBtn: 'Previous',
    nextBtn: 'Next',
    grammarSaveNote:
      'Grammar note: The plural subject "computers" takes the base verb "save" (the printed box on page 27 shows "saves", while the official answer key confirms "save").',
    wordFormLabel: 'Word form',
    ex7KeyOverview: 'Exercise 7 Key Overview',
    ex8KeyOverview: 'Exercise 8 Key Overview',
    checkWordFormsBtn: 'Check Word Forms',
    checkParagraphBtn: 'Check Paragraph',
    structureHeading: 'How the Organization Table Builds the Model Paragraph',
    structureDesc:
      'Inspect how each sentence in Exercise 8 corresponds to the six-part plan from Exercises 4–6.',
    showStructureBtn: 'Show Structure Breakdown',
    hideStructureBtn: 'Hide Structure Breakdown',

    // Stage 5
    s5Ex9Kicker: 'Stage 05 · Exercise 9 · Brainstorming Vocabulary & Ideas',
    s5Ex9Heading:
      'Add ideas for physical and emotional problems caused by technology',
    s5Ex9Desc:
      'Complete both diagrams with four additional problems each. Recording word groups in diagrams helps you plan ideas quickly in the exam.',
    showWordBankBtn: 'B1 Word Bank Helper',
    hideWordBankBtn: 'Hide B1 Word Bank',
    physicalProblems: 'Physical Problems',
    emotionalProblems: 'Emotional Problems',
    physicalHub: 'Physical',
    emotionalHub: 'Emotional',
    nodesUnit: 'nodes',
    givenPrefix: 'Given',
    ideaPlaceholder: 'Idea',
    physicalIdeasHint: 'Physical ideas (click to add)',
    emotionalIdeasHint: 'Emotional ideas (click to add)',
    fillSampleIdeasBtn: 'Fill Official Sample Ideas',
    clearDiagramsBtn: 'Clear Diagrams',

    s5Ex11Kicker: 'Stage 05 · Exercises 10 & 11 · Guided Paragraph Writing',
    s5Ex11Heading: 'Write the drawback paragraph using your ideas',
    s5Ex11Desc:
      'Follow the same six-part organization (Topic → Reason → Example 1 → Example 2 → Result → Conclusion). Begin with "However" and connect your points with clear discourse markers.',
    viewFrameworkBtn: 'View Ex. 8 Framework',
    hideFrameworkBtn: 'Hide Ex. 8 Framework',
    frameworkTitle: 'Positive Model Paragraph Framework (Exercise 8)',
    yourBrainstormedIdeas: 'Your brainstormed ideas:',
    discourseMarkerPrompt:
      'Click a discourse marker to insert it into your paragraph:',
    draftPlaceholder:
      'However, the main drawback is that too much dependence on computers...',
    wordsCounterLabel: 'Words',
    targetWordRange: '60–85 target',
    statusStart: 'Start drafting',
    statusAim: 'Aim for 60–85 words',
    statusTarget: 'Target range reached',
    statusAbove: 'Above 85 words (concise is fine)',
    linkingWordsUsed: 'Linking words used',
    compareSampleBtn: 'Compare with Sample Paragraph',
    hideSampleBtn: 'Hide Sample Paragraph',
    modelDrawbackTitle:
      'Model Drawback Paragraph (Level B1 4.0 Plus Reference)',
    autoSaveNote: 'Your draft saves automatically in this browser.',
    resetDraftBtn: 'Reset Draft',
  },
  vi: {
    viewTaskPrompt: 'Xem đề bài',
    subtitle: 'Mở bài & Bố cục đoạn văn',
    academicWriting: 'IELTS Writing Học thuật',
    aim: 'Phần học này giúp học viên thực hành viết một đoạn văn hoàn chỉnh theo từng bước có hướng dẫn.',
    exercisesMastered: 'Bài tập đã hoàn thành',
    resetAll: 'Làm lại tất cả',
    nextPrefix: 'Tiếp theo',
    promptDrawerTitle: 'Đề bài & Chiến lược',
    closePromptDrawer: 'Đóng khung đề bài',

    // Task Prompt Panel
    task2PromptTitle: 'Đề bài Task 2',
    highlight3Parts: 'Tô sáng 3 phần',
    hide3Parts: 'Ẩn tô sáng',
    part1Label: 'Phần 1:',
    part1Desc: 'Quan điểm tích cực (thú vị & hiệu quả hơn)',
    part2Label: 'Phần 2:',
    part2Desc: 'Quan điểm tiêu cực (vấn đề thể chất & tinh thần)',
    part3Label: 'Phần 3:',
    part3Desc: 'Thảo luận cả hai quan điểm & nêu ý kiến cá nhân',
    viPromptTranslationTitle: 'Dịch nghĩa đề bài:',
    viPromptTranslation:
      'Một số người cho rằng việc sử dụng máy tính ở trường tiểu học và trung học giúp việc học thú vị và hiệu quả hơn, trong khi những người khác tin rằng phụ thuộc quá nhiều vào máy tính gây ra cả vấn đề thể chất lẫn tinh thần. Hãy thảo luận cả hai quan điểm và đưa ra ý kiến của bạn. (Viết tối thiểu 250 từ trong khoảng 40 phút.)',
    strategyTitle: 'Chiến lược làm bài',
    strategyBody:
      'Lập danh sách ngắn gọn gồm ba hoặc bốn ý chính. Sau đó phát triển các ý này bằng lý do và ví dụ cụ thể.',
    examInfoTitle: 'Thông tin bài thi',
    examInfoBody:
      'Trong Writing Task 2, bạn cần viết một bài luận về chủ đề học thuật phổ thông và không cần kiến thức chuyên ngành. Bạn thường được yêu cầu thảo luận quan điểm của người khác và nêu ý kiến của riêng mình.',
    stageGuidancePrefix: 'Hướng dẫn Chặng',
    stageGuidanceSuffix: '',

    // Shared Feedback & Actions
    correct: 'Chính xác',
    checkAgain: 'Kiểm tra lại',
    answerKey: 'Đáp án chuẩn',
    keyPrefix: 'Đáp án',
    reset: 'Làm lại',
    score: 'Điểm',
    answered: 'Đã trả lời',
    completed: 'Đã điền',

    // Stage 1
    s1Kicker: 'Chặng 01 · Bài tập 1 · Đọc hiểu yêu cầu đề bài',
    s1Heading: 'Phân tích bài Writing Task 2',
    s1Desc:
      'Đọc đề bài Task 2 ở khung tham khảo bên phải, sau đó trả lời 7 câu hỏi dưới đây về bố cục bài luận, độ dài từ và số lượng ý chính.',
    s1CheckBtn: 'Kiểm tra đáp án',

    // Stage 2
    s2Ex2Kicker: 'Chặng 02 · Bài tập 2 · Diễn đạt lại (Paraphrase) & Định hướng',
    s2Ex2Heading: 'Chọn đoạn mở bài tốt nhất cho bài luận',
    s2Ex2Desc:
      'So sánh hai đoạn mở bài mẫu với đề bài gốc và chọn đoạn mở đầu hiệu quả hơn.',
    compareRubric: 'So sánh với đề gốc',
    hideOverlay: 'Ẩn phân tích màu',
    legendCopied: 'Chép lại từ đề gốc',
    legendGeneral: 'Câu mở đầu khái quát',
    legendParaphrase: 'Diễn đạt lại hai quan điểm',
    legendDirection: 'Ý kiến & định hướng bài viết',
    wordsUnit: 'từ',
    introLabel: 'Mở bài',
    s2CorrectTitle: 'Chính xác — Mở bài 2 tốt hơn',
    s2WrongTitle: 'Kiểm tra lại — Mở bài 2 là lựa chọn tốt hơn',
    s2KeyTitle: 'Đáp án chuẩn: Mở bài 2',
    s2Explanation:
      'Mở bài 1 sao chép gần như nguyên văn từ ngữ và cấu trúc ngữ pháp của đề bài. Mở bài 2 mở đầu bằng một câu khái quát, diễn đạt lại cả hai quan điểm bằng từ đồng nghĩa và thể hiện rõ bố cục bài viết: tích cực → tiêu cực → ý kiến cá nhân.',
    selectedIntroPrefix: 'Đã chọn: Mở bài',
    selectIntroPrompt: 'Hãy chọn một đoạn mở bài ở trên',
    checkChoiceBtn: 'Kiểm tra lựa chọn',

    s2Ex3Kicker: 'Chặng 02 · Bài tập 3 · Tiêu chí đánh giá Mở bài',
    s2Ex3Heading: 'Đánh dấu các lý do khiến đoạn mở bài bạn chọn tốt hơn',
    s2Ex3Desc:
      'Chọn tất cả các nhận định đúng giải thích vì sao đoạn mở bài bạn chọn ở Bài tập 2 hiệu quả hơn.',
    shouldTick: 'Nên đánh dấu chọn',
    shouldNotTick: 'Không nên chọn',
    keyTick: 'Đáp án: Chọn',
    keyUntick: 'Đáp án: Không chọn',
    accuracy: 'Độ chính xác',
    tickedPrefix: 'Đã chọn',
    of7Statements: 'trong 7 nhận định',
    checkReasonsBtn: 'Kiểm tra lý do',

    // Stage 3
    s3Ex4Kicker: 'Chặng 03 · Bài tập 4 · Khung tổ chức đoạn văn',
    s3Ex4Heading: 'Điền các ý a–c vào vị trí thích hợp trong bảng tổ chức',
    s3Ex4Desc:
      'Đặt ba ý còn thiếu cho đoạn văn thứ hai vào các dòng 2, 4 và 6 để đoạn văn triển khai logic từ Chủ đề đến Kết đoạn.',
    colOrganization: 'Bố cục (Organization)',
    colIdeas: 'Ý tưởng (Ideas)',
    placedPrefix: 'Đã điền',
    ideasSuffix: 'ý',
    checkTableBtn: 'Kiểm tra bảng',

    s3Ex5Kicker: 'Chặng 03 · Bài tập 5 · Ngữ pháp từ nối',
    s3Ex5Heading: 'Xác định các từ và cụm từ sau là trạng từ hay liên từ',
    s3Ex5Desc:
      'Phân loại từng từ nối dưới đây. Gợi ý: có một từ có thể thuộc cả hai nhóm.',
    adverbLabel: 'Trạng từ (Adverb)',
    conjunctionLabel: 'Liên từ (Conjunction)',
    bothLabel: 'Cả hai (Both)',
    bothFullLabel: 'Cả hai (Trạng từ & Liên từ)',
    classifiedPrefix: 'Đã phân loại',
    checkCategoriesBtn: 'Kiểm tra phân loại',

    s3Ex6Kicker: 'Chặng 03 · Bài tập 6 · Nối các ý trong đoạn',
    s3Ex6Heading: 'Ghép các từ nối ở Bài tập 5 với các ý 2–6 trong bảng',
    s3Ex6Desc:
      'Chọn từ hoặc cụm từ nối phù hợp nhất để dẫn dắt từng phần trong dàn ý đoạn văn.',
    chooseLinkingWord: 'Chọn từ nối...',
    orForExample: '(hoặc for example)',
    matchedPrefix: 'Đã ghép',
    checkMatchesBtn: 'Kiểm tra ghép nối',

    // Stage 4
    s4Kicker: 'Chặng 04 · Bài tập 7 & 8 · Thực hành đoạn văn mẫu',
    s4Ex7Heading: 'Bài tập 7: Xác định từ loại cần điền vào mỗi chỗ trống',
    s4Ex8Heading: 'Bài tập 8: Hoàn thành đoạn văn mẫu bằng từ cho sẵn',
    s4Ex7Desc:
      'Nhấn vào từng ô đánh số trong đoạn văn mẫu và chọn từ loại phù hợp: danh từ, động từ, động từ khuyết thiếu, liên từ hoặc trạng từ.',
    s4Ex8Desc:
      'Chọn một ô đánh số rồi nhấn vào từ trong kho từ để hoàn thành đoạn thân bài tích cực. Nhấn lại vào ô đang chọn đã điền để xóa.',
    tabEx7: 'BT 7: Từ loại',
    tabEx8: 'BT 8: Điền từ',
    chooseFormPlaceholder: 'chọn từ loại',
    activeSpace: 'Ô đang chọn',
    previousBtn: 'Ô trước',
    nextBtn: 'Ô tiếp',
    grammarSaveNote:
      'Lưu ý ngữ pháp: Chủ ngữ số nhiều "computers" đi với động từ nguyên mẫu "save" (khung từ in trên trang 27 ghi "saves", nhưng đáp án chính thức xác nhận là "save").',
    wordFormLabel: 'Từ loại',
    ex7KeyOverview: 'Tổng hợp đáp án Bài tập 7',
    ex8KeyOverview: 'Tổng hợp đáp án Bài tập 8',
    checkWordFormsBtn: 'Kiểm tra từ loại',
    checkParagraphBtn: 'Kiểm tra đoạn văn',
    structureHeading: 'Cách bảng tổ chức tạo nên đoạn văn mẫu hoàn chỉnh',
    structureDesc:
      'Xem cách từng câu trong Bài tập 8 tương ứng với 6 bước bố cục từ Bài tập 4–6.',
    showStructureBtn: 'Xem phân tích bố cục',
    hideStructureBtn: 'Ẩn phân tích bố cục',

    // Stage 5
    s5Ex9Kicker: 'Chặng 05 · Bài tập 9 · Lập sơ đồ từ vựng & ý tưởng',
    s5Ex9Heading:
      'Thêm ý tưởng về các vấn đề thể chất và tinh thần do công nghệ gây ra',
    s5Ex9Desc:
      'Hoàn thành cả hai sơ đồ với 4 vấn đề cho mỗi nhóm. Ghi chép từ vựng theo sơ đồ giúp bạn lập ý nhanh hơn trong phòng thi.',
    showWordBankBtn: 'Gợi ý từ vựng B1',
    hideWordBankBtn: 'Ẩn gợi ý từ vựng',
    physicalProblems: 'Vấn đề Thể chất (Physical)',
    emotionalProblems: 'Vấn đề Tinh thần (Emotional)',
    physicalHub: 'Thể chất',
    emotionalHub: 'Tinh thần',
    nodesUnit: 'ý',
    givenPrefix: 'Cho sẵn',
    ideaPlaceholder: 'Ý',
    physicalIdeasHint: 'Gợi ý vấn đề thể chất (nhấn để thêm)',
    emotionalIdeasHint: 'Gợi ý vấn đề tinh thần (nhấn để thêm)',
    fillSampleIdeasBtn: 'Điền ý mẫu từ đáp án',
    clearDiagramsBtn: 'Xóa sơ đồ',

    s5Ex11Kicker: 'Chặng 05 · Bài tập 10 & 11 · Viết đoạn văn có hướng dẫn',
    s5Ex11Heading: 'Viết đoạn văn về mặt hạn chế dựa trên các ý của bạn',
    s5Ex11Desc:
      'Áp dụng đúng bố cục 6 phần (Chủ đề → Lý do → Ví dụ 1 → Ví dụ 2 → Kết quả → Kết đoạn). Bắt đầu bằng "However" và dùng các từ nối mạch lạc.',
    viewFrameworkBtn: 'Xem khung mẫu BT 8',
    hideFrameworkBtn: 'Ẩn khung mẫu BT 8',
    frameworkTitle: 'Khung đoạn văn mẫu tích cực (Bài tập 8)',
    yourBrainstormedIdeas: 'Các ý bạn đã lập:',
    discourseMarkerPrompt:
      'Nhấn vào một từ nối để chèn nhanh vào đoạn văn của bạn:',
    draftPlaceholder:
      'However, the main drawback is that too much dependence on computers...',
    wordsCounterLabel: 'Số từ',
    targetWordRange: 'mục tiêu 60–85 từ',
    statusStart: 'Bắt đầu viết đoạn',
    statusAim: 'Hướng tới 60–85 từ',
    statusTarget: 'Đạt độ dài mục tiêu',
    statusAbove: 'Trên 85 từ (viết gọn hơn càng tốt)',
    linkingWordsUsed: 'Từ nối đã dùng',
    compareSampleBtn: 'So sánh với đoạn văn mẫu',
    hideSampleBtn: 'Ẩn đoạn văn mẫu',
    modelDrawbackTitle:
      'Đoạn văn mẫu về mặt hạn chế (Tham khảo B1 4.0 Plus)',
    autoSaveNote: 'Bản nháp của bạn được tự động lưu trên trình duyệt này.',
    resetDraftBtn: 'Đặt lại bản nháp',
  },
} as const;

export const EX1_VI: Record<
  number,
  {
    question: string;
    options: Record<string, string>;
    keyAnswer: string;
    explanation: string;
  }
> = {
  1: {
    question: 'Có bao nhiêu phần chính trong đề bài in nghiêng? 1, 2, 3 hay 4?',
    options: { '1': '1', '2': '2', '3': '3', '4': '4' },
    keyAnswer: '3 phần',
    explanation:
      'Có 3 phần chính: (1) quan điểm tích cực rằng máy tính làm việc học thú vị và hiệu quả hơn, (2) quan điểm tiêu cực về vấn đề thể chất và tinh thần, và (3) đưa ra ý kiến của chính bạn.',
  },
  2: {
    question: 'Với mỗi phần của câu hỏi, bạn cần đưa vào nội dung gì?',
    options: {
      'reasons-examples':
        'Đưa ra lý do cho câu trả lời và bao gồm các ví dụ liên quan từ kiến thức và trải nghiệm của bản thân.',
      statistics:
        'Đưa vào số liệu nghiên cứu học thuật và các định nghĩa kỹ thuật chuyên sâu.',
      'summary-only':
        'Chỉ tóm tắt suy nghĩ của người khác mà không thêm ví dụ cá nhân.',
    },
    keyAnswer:
      'Đưa ra lý do cho câu trả lời và các ví dụ liên quan từ kiến thức, trải nghiệm cá nhân.',
    explanation:
      'Đề bài yêu cầu rõ ràng phải chứng minh luận điểm bằng lý do và ví dụ thực tế từ hiểu biết và trải nghiệm của bản thân.',
  },
  3: {
    question: 'Đoạn mở bài nên dài khoảng bao nhiêu từ?',
    options: {
      '10-15': 'Chỉ khoảng 10–15 từ (một cụm ngắn).',
      '25-30': 'Khoảng 25–30 từ là đủ (không có số từ bắt buộc cố định).',
      '80-100': 'Ít nhất 80–100 từ để giải thích toàn bộ ví dụ.',
    },
    keyAnswer: 'Khoảng 25–30 từ là đủ. Không có giới hạn số từ cố định.',
    explanation:
      'Hãy giữ mở bài ngắn gọn và đúng trọng tâm—khoảng 25–30 từ là đủ để giới thiệu chủ đề và nêu hướng triển khai của bài viết.',
  },
  4: {
    question: 'Bạn có cần viết đoạn kết bài (conclusion) không?',
    options: { yes: 'Có (Yes)', no: 'Không (No)' },
    keyAnswer: 'Có (Yes).',
    explanation:
      'Mọi bài luận Writing Task 2 đều cần đoạn kết bài rõ ràng để tổng kết phần thảo luận và khẳng định lại ý kiến của bạn.',
  },
  5: {
    question: 'Bạn nên viết tổng cộng bao nhiêu đoạn văn cho bài làm?',
    options: {
      '2-3': '2 hoặc 3 đoạn văn',
      '4-5': '4 hoặc 5 đoạn văn',
      '7-8': '7 hoặc 8 đoạn văn',
    },
    keyAnswer: '4 hoặc 5 đoạn (4/5)',
    explanation:
      'Một bài IELTS Task 2 có bố cục tốt thường gồm 4 hoặc 5 đoạn: 1 mở bài, 2–3 đoạn thân bài và 1 kết bài.',
  },
  6: {
    question:
      'Mỗi đoạn thân bài (không tính mở bài và kết bài) nên dài khoảng bao nhiêu từ?',
    options: {
      '25-40': 'Khoảng 25–40 từ.',
      '60-85': 'Khoảng 60–85 từ (không có số từ cố định).',
      '150-200': 'Khoảng 150–200 từ.',
    },
    keyAnswer: 'Khoảng 60–85 từ. Tuy nhiên không có số từ cố định.',
    explanation:
      'Đoạn thân bài dài khoảng 60–85 từ đủ không gian cho câu chủ đề, lý do, ví dụ, kết quả và câu kết đoạn, đồng thời giúp tổng bài vượt mốc 250 từ.',
  },
  7: {
    question: 'Bạn cần chuẩn bị khoảng bao nhiêu ý chính?',
    options: {
      '1': 'Chỉ 1 ý chính',
      '3': 'Khoảng 3 ý chính',
      '8': 'Ít nhất 8 ý chính',
    },
    keyAnswer: 'Khoảng 3 ý (about 3)',
    explanation:
      'Như hộp Chiến lược khuyên, hãy lập danh sách ngắn gọn khoảng 3 (hoặc 3–4) ý chính và phát triển kỹ bằng lý do và ví dụ.',
  },
};

export const EX3_VI: Record<number, { text: string; explanation: string }> = {
  1: {
    text: 'Sử dụng từ vựng khác / từ đồng nghĩa.',
    explanation:
      'Sử dụng các từ đồng nghĩa như "benefits", "such technology", "relying on", và "harmful".',
  },
  2: {
    text: 'Sao chép lại các từ trong đề bài gốc.',
    explanation: 'Đây là điểm yếu của Mở bài 1, không phải Mở bài 2.',
  },
  3: {
    text: 'Đề cập đầy đủ cả ba phần của câu hỏi.',
    explanation:
      'Bao quát lợi ích (tích cực), tác hại khi phụ thuộc (tiêu cực) và ý kiến cá nhân.',
  },
  4: {
    text: 'Sử dụng các cấu trúc ngữ pháp khác nhau.',
    explanation:
      'Mở đầu bằng câu khái quát và dùng mệnh đề nhượng bộ "While..." thay vì chép cấu trúc "Some people think..., while others believe...".',
  },
  5: {
    text: 'Không sao chép nguyên văn từ ngữ trong đề bài.',
    explanation:
      'Tránh chép lại cụm từ y nguyên từ đề bài—lỗi thường bị giám khảo trừ điểm.',
  },
  6: {
    text: 'Thể hiện rõ bố cục phần còn lại của bài viết: tích cực, tiêu cực, ý kiến cá nhân.',
    explanation:
      'Định hình chính xác trình tự bài luận: lợi ích → tác hại → quan điểm cân bằng.',
  },
  7: {
    text: 'Sử dụng y hệt các cấu trúc ngữ pháp của đề bài.',
    explanation:
      'Mở bài 1 lặp lại cấu trúc của đề bài, còn Mở bài 2 đa dạng hóa mẫu câu.',
  },
};

export const ORG_ROLE_VI: Record<string, string> = {
  Topic: 'Chủ đề (Topic)',
  Reason: 'Lý do (Reason)',
  'Example 1': 'Ví dụ 1 (Example 1)',
  'Example 2': 'Ví dụ 2 (Example 2)',
  Result: 'Kết quả (Result)',
  Conclusion: 'Kết đoạn (Conclusion)',
};

export const EX4_IDEAS_VI: Record<'a' | 'b' | 'c', string> = {
  a: 'học sinh có thể làm bài nhanh',
  b: 'công cụ hữu ích',
  c: 'thú vị/hấp dẫn – hình ảnh nhiều màu sắc, video',
};

export const EX5_NOTES_VI: Record<string, string> = {
  'for-example':
    'Cụm trạng từ dùng để giới thiệu ví dụ cụ thể (thường có dấu phẩy phía sau).',
  'as-a-result': 'Cụm trạng từ chỉ kết quả hoặc hệ quả của ý đứng trước.',
  because: 'Liên từ phụ thuộc nối mệnh đề chính với mệnh đề chỉ lý do.',
  moreover:
    'Trạng từ liên kết dùng để bổ sung thêm một luận điểm hỗ trợ hoặc ví dụ thứ hai.',
  so: '"So" có thể thuộc cả hai nhóm: vừa là liên từ nối mệnh đề vừa là trạng từ liên kết dẫn câu kết luận.',
};

export const EX7_FORM_LABELS_VI: Record<Ex7WordForm, string> = {
  noun: 'noun (danh từ)',
  verb: 'verb (động từ)',
  '(modal) verb': '(modal) verb (đt khuyết thiếu)',
  conjunction: 'conjunction (liên từ)',
  adverb: 'adverb (trạng từ)',
};

export const EX7_HINTS_VI: Record<number, string> = {
  1: 'Đứng sau "The main ..." làm chủ ngữ trước động từ "is".',
  2: 'Song song với "are very convenient and ___ a lot of time" (chủ ngữ số nhiều: computers).',
  3: 'Nối mệnh đề đầu tiên với mệnh đề nêu lý do phía sau.',
  4: 'Cụm trạng từ đầu câu, theo sau bởi dấu phẩy để giới thiệu Ví dụ 1.',
  5: 'Đứng giữa chủ ngữ "they" và động từ nguyên mẫu "send".',
  6: 'Dẫn ra ví dụ về các môn học ("animals and plants"); đáp án sách xếp vào nhóm adverb.',
  7: 'Trạng từ liên kết đầu câu dùng để bổ sung Ví dụ 2.',
  8: 'Trạng từ liên kết đầu câu giới thiệu Kết quả (Result).',
  9: 'Trạng từ liên kết đầu câu dẫn vào câu Kết đoạn (Conclusion).',
};

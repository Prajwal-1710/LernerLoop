export const MISCONCEPTION_RULES = [
  {
    id: "mis-001",
    subject: "mathematics",
    topic: "fractions-addition",
    concept: "Adding fractions with unlike denominators",
    incorrect_pattern: "2/5",
    likely_reasoning:
      "Student adds numerators and denominators independently (1+1=2, 2+3=5), treating fractions as whole numbers.",
    correct_explanation:
      "To add fractions with different denominators, first find a common denominator. 1/2 = 3/6 and 1/3 = 2/6. Then 3/6 + 2/6 = 5/6.",
    remedial_activity:
      "Use visual fraction bars to show that 1/2 and 1/3 need to be split into equal-sized pieces before adding.",
    follow_up_question: "What is 1/4 + 1/4?",
    confidence_threshold: 0.6,
  },
  {
    id: "mis-002",
    subject: "mathematics",
    topic: "equivalent-fractions",
    concept: "Equivalent fractions",
    incorrect_pattern: "1/2 = 2/4",
    likely_reasoning:
      "Student thinks equivalent fractions are found by adding the same number to numerator and denominator.",
    correct_explanation:
      "Equivalent fractions are found by multiplying or dividing both numerator and denominator by the same number. 1/2 × 2/2 = 2/4.",
    remedial_activity:
      "Use fraction circles to show that 1/2 and 2/4 cover the same amount of space.",
    follow_up_question: "Which is equivalent to 3/4: 6/8 or 5/7?",
    confidence_threshold: 0.6,
  },
  {
    id: "mis-003",
    subject: "mathematics",
    topic: "decimals",
    concept: "Decimal place value",
    incorrect_pattern: "0.5 > 0.25",
    likely_reasoning:
      "Student thinks longer decimal means larger number, treating decimal digits like whole numbers.",
    correct_explanation:
      "Compare decimals by place value. 0.5 = 0.50, and 0.50 > 0.25 because 5 tenths > 2 tenths.",
    remedial_activity:
      "Use a decimal place value chart and money analogy ($0.50 vs $0.25).",
    follow_up_question: "Which is larger: 0.3 or 0.25?",
    confidence_threshold: 0.6,
  },
  {
    id: "mis-004",
    subject: "mathematics",
    topic: "percentages",
    concept: "Percentage to fraction conversion",
    incorrect_pattern: "25% = 1/25",
    likely_reasoning:
      "Student puts the percentage number over 100 but doesn't simplify, or thinks % means divide by the number itself.",
    correct_explanation:
      "25% = 25/100 = 1/4. Percent means per 100, so always start with /100 then simplify.",
    remedial_activity:
      "Practice converting common percentages: 50% = 1/2, 25% = 1/4, 75% = 3/4.",
    follow_up_question: "What is 50% as a fraction?",
    confidence_threshold: 0.6,
  },
  {
    id: "mis-005",
    subject: "mathematics",
    topic: "basic-algebra",
    concept: "Solving simple linear equations",
    incorrect_pattern: "x + 5 = 12, x = 17",
    likely_reasoning:
      "Student adds instead of subtracting to isolate x, not understanding inverse operations.",
    correct_explanation:
      "To solve x + 5 = 12, subtract 5 from both sides: x = 12 - 5 = 7. Use the inverse operation.",
    remedial_activity:
      "Use a balance scale model - whatever you do to one side, do to the other.",
    follow_up_question: "Solve: x + 3 = 10",
    confidence_threshold: 0.6,
  },
] as const;

export function detectMisconception(
  answer: string,
  topic: string,
  previousEvents: Array<{ misconceptionId: string; confidence: number }> = []
) {
  const rule = MISCONCEPTION_RULES.find(
    (r) => r.topic === topic && r.incorrect_pattern === answer.trim()
  );

  if (!rule) return null;

  // Calculate confidence based on repeated evidence
  const repeatedCount = previousEvents.filter(
    (e) => e.misconceptionId === rule.id
  ).length;
  const baseConfidence = 0.5;
  const evidenceBoost = Math.min(repeatedCount * 0.2, 0.4);
  const confidence = Math.min(baseConfidence + evidenceBoost, 0.95);

  return {
    misconception: rule,
    confidence,
    confidenceLevel:
      confidence < 0.6 ? "low" : confidence < 0.8 ? "medium" : "high",
    repeatedEvidence: repeatedCount,
  };
}

export const SUBJECTS = [
  { id: "math", code: "MATH", name: "Mathematics", description: "Numbers, shapes, and patterns" },
  { id: "science", code: "SCI", name: "Science", description: "The world around us" },
];

export const TOPICS = [
  { id: "fractions-addition", subjectId: "math", name: "Addition of Fractions", order: 1 },
  { id: "equivalent-fractions", subjectId: "math", name: "Equivalent Fractions", order: 2 },
  { id: "decimals", subjectId: "math", name: "Decimals", order: 3 },
  { id: "percentages", subjectId: "math", name: "Percentages", order: 4 },
  { id: "basic-algebra", subjectId: "math", name: "Basic Algebra", order: 5 },
];

export const LESSONS = [
  {
    id: "les-001",
    topicId: "fractions-addition",
    title: "Adding Fractions",
    description: "Learn how to add fractions with like and unlike denominators",
    content: {
      explanation:
        "To add fractions, the denominators must be the same. If they are different, find a common denominator first.",
      workedExamples: [
        {
          id: "ex-1",
          problem: "1/4 + 1/4",
          solution: "2/4 = 1/2",
          steps: ["Denominators are the same (4)", "Add numerators: 1 + 1 = 2", "Result: 2/4 = 1/2"],
        },
        {
          id: "ex-2",
          problem: "1/2 + 1/3",
          solution: "5/6",
          steps: ["Common denominator: 6", "Convert: 1/2 = 3/6, 1/3 = 2/6", "Add: 3/6 + 2/6 = 5/6"],
        },
      ],
      diagrams: [
        { id: "dia-1", type: "svg", src: "", alt: "Fraction addition visual", caption: "1/2 + 1/3 = 5/6" },
      ],
      misconceptions: MISCONCEPTION_RULES.filter((m) => m.topic === "fractions-addition"),
      remedialActivity:
        "Use fraction strips to visually combine pieces before adding numerically.",
    },
    version: 1,
    isPublished: true,
    dataSizeKb: 45,
  },
  {
    id: "les-002",
    topicId: "equivalent-fractions",
    title: "Equivalent Fractions",
    description: "Understand fractions that represent the same value",
    content: {
      explanation:
        "Equivalent fractions are different fractions that name the same number. Multiply or divide numerator and denominator by the same number.",
      workedExamples: [
        {
          id: "ex-1",
          problem: "Find equivalent fraction for 1/2",
          solution: "2/4, 3/6, 4/8",
          steps: ["Multiply 1/2 × 2/2 = 2/4", "Multiply 1/2 × 3/3 = 3/6"],
        },
      ],
      diagrams: [],
      misconceptions: MISCONCEPTION_RULES.filter((m) => m.topic === "equivalent-fractions"),
      remedialActivity:
        "Use fraction circles to show different ways to color the same amount.",
    },
    version: 1,
    isPublished: true,
    dataSizeKb: 38,
  },
];

export const QUESTIONS = [
  {
    id: "q-001",
    lessonId: "les-001",
    topicId: "fractions-addition",
    type: "multiple_choice",
    questionText: "1/2 + 1/3 = ?",
    options: [
      { id: "o1", text: "2/5", isCorrect: false },
      { id: "o2", text: "5/6", isCorrect: true },
      { id: "o3", text: "1/5", isCorrect: false },
      { id: "o4", text: "3/5", isCorrect: false },
    ],
    correctAnswer: "5/6",
    explanation: "Common denominator is 6: 1/2 = 3/6, 1/3 = 2/6. So 3/6 + 2/6 = 5/6.",
    difficulty: 2,
    misconceptionId: "mis-001",
  },
  {
    id: "q-002",
    lessonId: "les-001",
    topicId: "fractions-addition",
    type: "multiple_choice",
    questionText: "1/4 + 1/4 = ?",
    options: [
      { id: "o1", text: "2/4", isCorrect: false },
      { id: "o2", text: "1/2", isCorrect: true },
      { id: "o3", text: "1/8", isCorrect: false },
      { id: "o4", text: "2/8", isCorrect: false },
    ],
    correctAnswer: "1/2",
    explanation: "Same denominator: 1 + 1 = 2. So 2/4 = 1/2.",
    difficulty: 1,
  },
  {
    id: "q-003",
    lessonId: "les-002",
    topicId: "equivalent-fractions",
    type: "multiple_choice",
    questionText: "Which fraction is equivalent to 3/4?",
    options: [
      { id: "o1", text: "6/8", isCorrect: true },
      { id: "o2", text: "5/7", isCorrect: false },
      { id: "o3", text: "3/5", isCorrect: false },
      { id: "o4", text: "4/6", isCorrect: false },
    ],
    correctAnswer: "6/8",
    explanation: "3/4 × 2/2 = 6/8. Both numerator and denominator multiplied by 2.",
    difficulty: 2,
    misconceptionId: "mis-002",
  },
];

export function getQuestionForTopic(topicId: string, difficulty: number = 1) {
  return QUESTIONS.filter(
    (q) => q.topicId === topicId && q.difficulty <= difficulty
  );
}

export function calculateMastery(
  attempts: Array<{ isCorrect: boolean; createdAt: string }>,
  topicId: string
) {
  if (attempts.length === 0) return 0;

  const recent = attempts.slice(-5);
  const recentAccuracy =
    recent.filter((a) => a.isCorrect).length / recent.length;

  // Retention: weight more recent attempts higher
  const now = Date.now();
  const weightedSum = attempts.reduce((sum, a, idx) => {
    const ageDays = (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const decay = Math.exp(-ageDays / 7); // 7-day half-life
    return sum + (a.isCorrect ? decay : 0);
  }, 0);
  const retentionScore = attempts.length > 0 ? weightedSum / attempts.length : 0;

  // Transparent formula: 0.7 × recent accuracy + 0.3 × retention
  const mastery = 0.7 * recentAccuracy + 0.3 * retentionScore;
  return Math.round(mastery * 100) / 100;
}

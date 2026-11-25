export type AIModel = "nemotron" | "mock";

export interface AIConfig {
  model: AIModel;
  apiKey?: string;
  baseUrl?: string;
  enabled: boolean;
}

export interface ExplainRequest {
  lessonId: string;
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean;
  locale: string;
  misconception?: any;
}

export interface ExplainResponse {
  explanation: string;
  visualDescription: string;
  confidence: number;
  model: string;
}

export interface InterventionRequest {
  classId: string;
  topicId: string;
  studentIds: string[];
  commonMisconception: string;
  locale: string;
}

export interface InterventionResponse {
  title: string;
  description: string;
  recommendedActivity: string;
  followUpAssessment: string;
  model: string;
}

class NemotronAIService {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  async explainConcept(request: ExplainRequest): Promise<ExplainResponse> {
    if (!this.config.enabled || !this.config.apiKey) {
      return this.mockExplain(request);
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model === "nemotron" ? "nvidia/nemotron-lightning" : "mock",
          messages: [
            {
              role: "system",
              content: `You are an educational assistant for Class 6-8 students. Explain concepts clearly in ${request.locale}. Use simple language. Never claim certainty about student thinking from one answer. Use "possible misconception" language.`,
            },
            {
              role: "user",
              content: `Explain this math concept: Lesson ${request.lessonId}, Question ${request.questionId}. Student answered: ${request.studentAnswer}. Correct: ${request.isCorrect}. ${request.misconception ? "Detected misconception: " + request.misconception.likely_reasoning : ""}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      return {
        explanation: data.choices?.[0]?.message?.content || "Explanation unavailable",
        visualDescription: "Use visual fraction bars to illustrate the concept",
        confidence: 0.8,
        model: "nemotron",
      };
    } catch (error) {
      console.error("Nemotron AI error:", error);
      return this.mockExplain(request);
    }
  }

  async generateIntervention(request: InterventionRequest): Promise<InterventionResponse> {
    if (!this.config.enabled || !this.config.apiKey) {
      return this.mockIntervention(request);
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-lightning",
          messages: [
            {
              role: "system",
              content: "You are a teacher's assistant. Generate practical intervention suggestions.",
            },
            {
              role: "user",
              content: `Create an intervention for ${request.studentIds.length} students struggling with ${request.topicId}. Common misconception: ${request.commonMisconception}. Language: ${request.locale}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      return {
        title: `Intervention for ${request.topicId}`,
        description: data.choices?.[0]?.message?.content || "Intervention unavailable",
        recommendedActivity: "Group activity with visual models",
        followUpAssessment: "5-question follow-up quiz",
        model: "nemotron",
      };
    } catch (error) {
      console.error("Nemotron AI error:", error);
      return this.mockIntervention(request);
    }
  }

  private mockExplain(request: ExplainRequest): ExplainResponse {
    const explanations: Record<string, string> = {
      "mis-001": "To add fractions with different denominators, first find a common denominator. 1/2 = 3/6 and 1/3 = 2/6. Then 3/6 + 2/6 = 5/6.",
      "mis-002": "Equivalent fractions are found by multiplying or dividing both numerator and denominator by the same number. 1/2 × 2/2 = 2/4.",
      "mis-003": "Compare decimals by place value. 0.5 = 0.50, and 0.50 > 0.25 because 5 tenths > 2 tenths.",
      "mis-004": "25% = 25/100 = 1/4. Percent means per 100, so always start with /100 then simplify.",
      "mis-005": "To solve x + 5 = 12, subtract 5 from both sides: x = 12 - 5 = 7. Use the inverse operation.",
    };

    const misconceptionId = request.misconception?.id || "mis-001";
    const explanation = explanations[misconceptionId] || "Review the concept and try again.";

    return {
      explanation,
      visualDescription: "Use visual fraction bars to illustrate the concept",
      confidence: 0.85,
      model: "mock",
    };
  }

  private mockIntervention(request: InterventionRequest): InterventionResponse {
    return {
      title: `Intervention: ${request.topicId}`,
      description: `${request.studentIds.length} students need support with ${request.topicId}. Common misconception: ${request.commonMisconception}. Recommended: Review with visual models and provide targeted practice.`,
      recommendedActivity: "Group activity: visual fraction matching game",
      followUpAssessment: "5-question follow-up quiz",
      model: "mock",
    };
  }
}

export const aiService = new NemotronAIService({
  model: "mock",
  apiKey: process.env.NEMOTRON_API_KEY,
  baseUrl: process.env.NEMOTRON_BASE_URL,
  enabled: !!process.env.NEMOTRON_API_KEY,
});

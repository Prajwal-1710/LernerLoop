import { describe, it, expect } from "vitest";
import {
  detectMisconception,
  MISCONCEPTION_RULES,
  calculateMastery,
  QUESTIONS,
} from "../src/lib/learning-engine";

describe("Misconception Detection", () => {
  it("detects fraction addition misconception (2/5)", () => {
    const result = detectMisconception("2/5", "fractions-addition");
    expect(result).not.toBeNull();
    expect(result!.misconception.id).toBe("mis-001");
    expect(result!.confidence).toBeGreaterThan(0);
  });

  it("returns null for correct answer", () => {
    const result = detectMisconception("5/6", "fractions-addition");
    expect(result).toBeNull();
  });

  it("increases confidence with repeated evidence", () => {
    const first = detectMisconception("2/5", "fractions-addition", []);
    const second = detectMisconception("2/5", "fractions-addition", [
      { misconceptionId: "mis-001", confidence: 0.5 },
    ]);
    expect(second!.confidence).toBeGreaterThan(first!.confidence);
  });

  it("classifies confidence levels correctly", () => {
    const low = detectMisconception("2/5", "fractions-addition", []);
    expect(low!.confidenceLevel).toBe("low");

    const medium = detectMisconception("2/5", "fractions-addition", [
      { misconceptionId: "mis-001", confidence: 0.5 },
    ]);
    expect(medium!.confidenceLevel).toBe("medium");

    const high = detectMisconception("2/5", "fractions-addition", [
      { misconceptionId: "mis-001", confidence: 0.5 },
      { misconceptionId: "mis-001", confidence: 0.5 },
    ]);
    expect(high!.confidenceLevel).toBe("high");
  });
});

describe("Mastery Calculation", () => {
  it("returns 0 for no attempts", () => {
    const mastery = calculateMastery([], "fractions-addition");
    expect(mastery).toBe(0);
  });

  it("calculates mastery from attempts", () => {
    const attempts = [
      { isCorrect: true, createdAt: new Date().toISOString() },
      { isCorrect: true, createdAt: new Date().toISOString() },
      { isCorrect: false, createdAt: new Date().toISOString() },
    ];
    const mastery = calculateMastery(attempts, "fractions-addition");
    expect(mastery).toBeGreaterThan(0);
    expect(mastery).toBeLessThanOrEqual(1);
  });
});

describe("Misconception Rules", () => {
  it("has required fields for each rule", () => {
    MISCONCEPTION_RULES.forEach((rule) => {
      expect(rule.id).toBeDefined();
      expect(rule.concept).toBeDefined();
      expect(rule.incorrect_pattern).toBeDefined();
      expect(rule.correct_explanation).toBeDefined();
      expect(rule.confidence_threshold).toBeGreaterThan(0);
    });
  });
});

describe("Question Selection", () => {
  it("returns questions for a topic", () => {
    const questions = QUESTIONS.filter((q) => q.topicId === "fractions-addition");
    expect(questions.length).toBeGreaterThan(0);
  });
});

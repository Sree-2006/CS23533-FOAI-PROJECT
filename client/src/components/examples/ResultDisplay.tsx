import ResultDisplay from "../result-display";

export default function ResultDisplayExample() {
  const mockResult = {
    prediction: "FAKE" as const,
    confidence: 87,
    keywords: ["shocking", "unbelievable", "doctors hate this"],
    sourceCredibility: {
      score: 23,
      factors: ["Unknown domain", "No author credentials", "Lacks citations"],
    },
    explanation: [
      "Contains sensationalist language patterns",
      "Source has low credibility rating",
      "Multiple factual inconsistencies detected",
    ],
    trendData: [
      { date: "Mon", count: 12 },
      { date: "Tue", count: 45 },
      { date: "Wed", count: 89 },
    ],
    propagationScore: 76,
    emotionMismatch: {
      score: 68,
      headline: "Angry/Outraged",
      content: "Neutral/Informative",
    },
  };

  return <ResultDisplay result={mockResult} />;
}

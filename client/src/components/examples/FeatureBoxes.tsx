import FeatureBoxes from "../feature-boxes";

export default function FeatureBoxesExample() {
  const mockResult = {
    prediction: "FAKE" as const,
    confidence: 87,
    keywords: ["shocking", "miracle cure", "doctors hate this", "unbelievable"],
    sourceCredibility: {
      score: 23,
      factors: [
        "Unknown domain registration",
        "No author credentials found",
        "Lacks proper citations",
        "Recent domain creation",
      ],
    },
    explanation: [
      "Contains sensationalist language patterns commonly found in misinformation",
      "Source domain has low credibility rating across fact-checking databases",
      "Multiple factual inconsistencies detected when cross-referenced",
      "Emotional manipulation tactics identified in content structure",
    ],
    trendData: [
      { date: "Mon", count: 12 },
      { date: "Tue", count: 45 },
      { date: "Wed", count: 89 },
      { date: "Thu", count: 134 },
      { date: "Fri", count: 98 },
      { date: "Sat", count: 67 },
      { date: "Sun", count: 43 },
    ],
    propagationScore: 76,
    emotionMismatch: {
      score: 68,
      headline: "Angry/Outraged",
      content: "Neutral/Informative",
    },
  };

  return (
    <div className="p-8 bg-background">
      <FeatureBoxes result={mockResult} />
    </div>
  );
}

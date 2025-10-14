import { z } from "zod";

export const predictionResultSchema = z.object({
  prediction: z.enum(["FAKE", "REAL"]),
  confidence: z.number().min(0).max(100),
  keywords: z.array(z.string()),
  sourceCredibility: z.object({
    score: z.number().min(0).max(100),
    factors: z.array(z.string()),
  }),
  explanation: z.array(z.string()),
  trendData: z.array(z.object({
    date: z.string(),
    count: z.number(),
  })),
  propagationScore: z.number().min(0).max(100),
  emotionMismatch: z.object({
    score: z.number().min(0).max(100),
    headline: z.string(),
    content: z.string(),
  }),
});

export type PredictionResult = z.infer<typeof predictionResultSchema>;

export const analyzeRequestSchema = z.object({
  text: z.string().min(10, "News content must be at least 10 characters"),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { PredictionResult } from "@shared/schema";
import ResultDisplay from "@/components/result-display";
import FeatureBoxes from "@/components/feature-boxes";

export default function Detect() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      return response.json() as Promise<PredictionResult>;
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleAnalyze = () => {
    if (newsText.trim().length < 10) {
      return;
    }
    analyzeMutation.mutate(newsText);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">News Detection Analysis</h1>
          <p className="text-muted-foreground">
            Paste news content below to analyze its authenticity
          </p>
        </div>

        <Card className="p-6 mb-8">
          <Textarea
            placeholder="Paste news article or content here to check if it's fake or real..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            className="min-h-[200px] text-base mb-4"
            data-testid="input-news-text"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {newsText.length} characters
            </span>
            <Button
              onClick={handleAnalyze}
              disabled={newsText.trim().length < 10 || analyzeMutation.isPending}
              data-testid="button-analyze"
            >
              {analyzeMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Analyze News
            </Button>
          </div>
        </Card>

        {result && <ResultDisplay result={result} />}

        {result && <FeatureBoxes result={result} />}
      </div>
    </div>
  );
}

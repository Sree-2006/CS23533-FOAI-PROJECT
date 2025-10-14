import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import type { PredictionResult } from "@shared/schema";
import ResultDisplay from "@/components/result-display";
import FeatureBoxes from "@/components/feature-boxes";
import { useToast } from "@/hooks/use-toast";

export default function Detect() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Analysis failed" }));
        throw new Error(errorData.error || "Analysis failed");
      }
      return response.json() as Promise<PredictionResult>;
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error.message || "Could not connect to prediction service. Please try again.",
      });
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

        {analyzeMutation.isError && (
          <Card className="p-6 mb-8 bg-destructive/10 border-destructive">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-medium">Analysis Error</h3>
                <p className="text-sm text-muted-foreground">
                  Unable to analyze the news content. Please ensure the backend is running and try again.
                </p>
              </div>
            </div>
          </Card>
        )}

        {result && <ResultDisplay result={result} />}

        {result && <FeatureBoxes result={result} />}
      </div>
    </div>
  );
}

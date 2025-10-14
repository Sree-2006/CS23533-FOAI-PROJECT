import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import type { PredictionResult } from "@shared/schema";

interface ResultDisplayProps {
  result: PredictionResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const isFake = result.prediction === "FAKE";

  return (
    <Card
      className={`p-8 mb-8 border-2 ${
        isFake
          ? "bg-destructive/10 border-destructive"
          : "bg-chart-2/10 border-chart-2"
      }`}
      data-testid="card-result"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {isFake ? (
            <AlertTriangle className="w-12 h-12 text-destructive" />
          ) : (
            <CheckCircle className="w-12 h-12 text-chart-2" />
          )}
          <div>
            <h2 className="text-3xl font-bold" data-testid="text-prediction">
              {result.prediction}
            </h2>
            <p className="text-muted-foreground">Prediction Result</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-bold" data-testid="text-confidence">
            {result.confidence}%
          </div>
          <p className="text-sm text-muted-foreground">Confidence Score</p>
        </div>
      </div>
    </Card>
  );
}

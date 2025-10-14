import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Target,
  FileText,
  TrendingUp,
  Radio,
  Frown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { PredictionResult } from "@shared/schema";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FeatureBoxesProps {
  result: PredictionResult;
}

export default function FeatureBoxes({ result }: FeatureBoxesProps) {
  const [expandedBox, setExpandedBox] = useState<number | null>(null);

  const toggleBox = (index: number) => {
    setExpandedBox(expandedBox === index ? null : index);
  };

  const features = [
    {
      icon: Shield,
      title: "News Source Credibility Checker",
      color: "text-primary",
      content: (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Credibility Score</span>
              <span className="text-2xl font-mono font-bold">{result.sourceCredibility.score}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${result.sourceCredibility.score}%` }}
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Credibility Factors:</h4>
            <ul className="space-y-1">
              {result.sourceCredibility.factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">• {factor}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      icon: Target,
      title: "Keyword Highlighting",
      color: "text-chart-2",
      content: (
        <div>
          <h4 className="font-medium mb-3">Suspicious Keywords Detected:</h4>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((keyword, idx) => (
              <Badge key={idx} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: FileText,
      title: "Prediction Explanation Panel",
      color: "text-chart-4",
      content: (
        <div>
          <h4 className="font-medium mb-3">Why this content was flagged:</h4>
          <ul className="space-y-2">
            {result.explanation.map((reason, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-chart-4 mt-1">▸</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      title: "Time-Based Fake News Trend Analysis",
      color: "text-chart-5",
      content: (
        <div>
          <h4 className="font-medium mb-3">Fake News Trend Over Time:</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={result.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.375rem",
                }}
              />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-5))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      icon: Radio,
      title: "Propagation Burst Visualizer",
      color: "text-destructive",
      content: (
        <div>
          <h4 className="font-medium mb-3">Sharing Intensity Score:</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-secondary rounded-full h-4">
                <div
                  className="bg-destructive h-4 rounded-full transition-all"
                  style={{ width: `${result.propagationScore}%` }}
                />
              </div>
            </div>
            <span className="text-3xl font-mono font-bold">{result.propagationScore}%</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            This indicates how rapidly this news is being shared across platforms
          </p>
        </div>
      ),
    },
    {
      icon: Frown,
      title: "Emotion–Headline Mismatch Highlighter",
      color: "text-chart-3",
      content: (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Mismatch Score</span>
              <span className="text-2xl font-mono font-bold">{result.emotionMismatch.score}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-chart-3 h-2 rounded-full transition-all"
                style={{ width: `${result.emotionMismatch.score}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground mb-1">Headline Emotion:</p>
              <p className="text-sm">{result.emotionMismatch.headline}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground mb-1">Content Emotion:</p>
              <p className="text-sm">{result.emotionMismatch.content}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isExpanded = expandedBox === index;

        return (
          <Card
            key={index}
            className={`transition-all duration-300 hover-elevate ${
              isExpanded ? "md:col-span-2 lg:col-span-3" : ""
            }`}
            data-testid={`card-feature-${index}`}
          >
            <Button
              variant="ghost"
              className="w-full p-6 h-auto flex items-start justify-between text-left hover:bg-transparent no-default-hover-elevate"
              onClick={() => toggleBox(index)}
              data-testid={`button-feature-${index}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${feature.color}`} />
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 flex-shrink-0" />
              )}
            </Button>
            {isExpanded && (
              <div className="px-6 pb-6" data-testid={`content-feature-${index}`}>
                {feature.content}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Target, Zap, BarChart3 } from "lucide-react";
import heroImage from "@assets/stock_images/digital_technology_b_032913f5.jpg";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Digital network visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Fake News Detection System
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            AI-powered analysis to verify news authenticity and combat misinformation
          </p>
          <Button 
            size="lg"
            className="px-12 py-6 text-lg bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            variant="outline"
            onClick={() => setLocation("/detect")}
            data-testid="button-explore"
          >
            EXPLORE
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">About This System</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our machine learning-powered system analyzes news content to identify fake news and misinformation. 
            Using advanced NLP techniques and pattern recognition, we provide comprehensive analysis to help you 
            determine the credibility of news sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover-elevate">
            <ShieldCheck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Source Verification</h3>
            <p className="text-muted-foreground text-sm">
              Evaluate news source credibility and trustworthiness
            </p>
          </Card>

          <Card className="p-6 hover-elevate">
            <Target className="w-12 h-12 text-chart-2 mb-4" />
            <h3 className="text-xl font-medium mb-2">Keyword Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Identify suspicious words and patterns in content
            </p>
          </Card>

          <Card className="p-6 hover-elevate">
            <Zap className="w-12 h-12 text-chart-4 mb-4" />
            <h3 className="text-xl font-medium mb-2">Real-time Detection</h3>
            <p className="text-muted-foreground text-sm">
              Instant analysis with ML-powered predictions
            </p>
          </Card>

          <Card className="p-6 hover-elevate">
            <BarChart3 className="w-12 h-12 text-chart-5 mb-4" />
            <h3 className="text-xl font-medium mb-2">Trend Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Track fake news propagation and spread patterns
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

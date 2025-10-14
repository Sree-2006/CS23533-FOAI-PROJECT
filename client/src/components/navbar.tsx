import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">NewsCheck AI</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                data-testid="link-home"
              >
                Home
              </Button>
            </Link>
            <Link href="/detect">
              <Button
                variant={location === "/detect" ? "secondary" : "ghost"}
                data-testid="link-detect"
              >
                Detect
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

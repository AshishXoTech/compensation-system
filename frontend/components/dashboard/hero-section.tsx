import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, GitCompareArrows, ShieldCheck, Building, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-muted/30 border border-border/50 px-6 py-12 md:py-16 text-center">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background/5 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs sm:text-sm font-medium text-primary mb-2">
          <span>🚀 The standard for structured compensation</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
          Compensation Intelligence for <span className="text-primary">Modern Engineers</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Make data-driven career decisions with structured, level-based compensation insights. Explore accurate salary distributions across top tech companies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/salaries" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto h-12 px-8")}>
            Explore Salaries
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/compare" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto h-12 px-8 bg-background")}>
            <GitCompareArrows className="mr-2 h-4 w-4" />
            Compare Compensation
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span>Verified Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            <span>Top Companies</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            <span>L3–L7 Structured</span>
          </div>
        </div>
      </div>
    </div>
  );
}

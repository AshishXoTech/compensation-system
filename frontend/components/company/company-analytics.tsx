import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency, formatCurrency, formatNumber } from "@/lib/utils";
import type { CompanyAnalytics } from "@/types";

interface CompanyAnalyticsCardsProps {
  data: CompanyAnalytics;
}

export function CompanyAnalyticsCards({ data }: CompanyAnalyticsCardsProps) {
  // If no data or min=max, the range is 0. Handle gracefully.
  const range = data.maxComp - data.minComp;
  
  const getPosition = (val: number) => {
    if (range <= 0) return "50%";
    const percent = ((val - data.minComp) / range) * 100;
    return `${Math.max(0, Math.min(100, percent))}%`;
  };

  const topMultiplier = data.p50 > 0 ? (data.p90 / data.p50).toFixed(1) : "0";

  return (
    <div className="grid gap-6">
      {/* Visual Range Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Compensation Distribution Range
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            From entry-level minimum to top 10% highest earners
          </p>
        </CardHeader>
        <CardContent>
          <div className="pt-8 pb-4">
            <div className="relative w-full h-3 bg-muted rounded-full overflow-visible">
              {/* The Range Bar */}
              <div 
                className="absolute top-0 bottom-0 bg-primary/20 rounded-full"
                style={{ left: getPosition(data.p50), right: `calc(100% - ${getPosition(data.p90)})` }}
              />

              {/* Markers */}
              {range > 0 && (
                <>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-primary/40 rounded-full z-10" 
                    style={{ left: getPosition(data.p50) }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap text-foreground">
                      P50 (Median)
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {formatCompactCurrency(data.p50)}
                    </div>
                  </div>

                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-primary/70 rounded-full z-10" 
                    style={{ left: getPosition(data.p75) }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap text-foreground">
                      P75
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {formatCompactCurrency(data.p75)}
                    </div>
                  </div>

                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-full z-10" 
                    style={{ left: getPosition(data.p90) }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap text-foreground">
                      P90 (Top)
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {formatCompactCurrency(data.p90)}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Min / Max Labels */}
            <div className="flex justify-between items-center mt-10 text-xs text-muted-foreground">
              <div className="flex flex-col">
                <span className="font-medium text-foreground">Minimum</span>
                <span>{formatCompactCurrency(data.minComp)}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium text-foreground">Maximum</span>
                <span>{formatCompactCurrency(data.maxComp)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-5 flex flex-col justify-center h-full">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Top vs Median
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-primary">
                {topMultiplier}x
              </p>
              <p className="text-sm text-muted-foreground">multiplier</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Top 10% earn {topMultiplier}x more than the median employee.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Average Compensation
            </p>
            <p className="text-2xl font-bold tracking-tight tabular-nums">
              {formatCurrency(data.averageComp)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Median (P50)
            </p>
            <p className="text-2xl font-bold tracking-tight tabular-nums">
              {formatCurrency(data.p50)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Data Points
            </p>
            <p className="text-2xl font-bold tracking-tight tabular-nums">
              {formatNumber(data.entries)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Verified salary entries
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelBadge } from "@/components/ui/level-badge";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckCircle2, Minus } from "lucide-react";
import type { CompareByIdResponse, Level, Salary } from "@/types";

interface ComparisonResultsProps {
  data: CompareByIdResponse;
  entry1?: Salary;
  entry2?: Salary;
}

interface ComparisonRowProps {
  label: string;
  value1: number;
  value2: number;
  isCurrency?: boolean;
  highlightTotal?: boolean;
}

function ComparisonRow({
  label,
  value1,
  value2,
  isCurrency = true,
  highlightTotal = false,
}: ComparisonRowProps) {
  const diff = value1 - value2;
  const isBetter1 = diff > 0;
  const isBetter2 = diff < 0;
  const isEqual = diff === 0;

  const maxVal = Math.max(value1, value2);
  // To avoid 0 division if both are 0
  const pct1 = maxVal > 0 ? (value1 / maxVal) * 100 : 0;
  const pct2 = maxVal > 0 ? (value2 / maxVal) * 100 : 0;

  const formatFn = isCurrency ? formatCurrency : (v: number) => String(v);
  const formatCompactFn = isCurrency ? formatCompactCurrency : (v: number) => String(v);

  return (
    <div className={cn("flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-stretch sm:items-center py-4 px-4 sm:px-6 rounded-xl transition-colors", highlightTotal && "bg-muted/30 border border-border/50")}>
      
      {/* Metric Label (Top on mobile, Center on desktop) */}
      <div className="order-first sm:order-none w-full sm:w-28 text-left sm:text-center flex flex-col sm:items-center justify-center shrink-0 border-b border-border/40 pb-2 sm:border-0 sm:pb-0">
        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        {isEqual && (
          <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <Minus className="h-3 w-3" /> Match
          </span>
        )}
      </div>

      {/* Salary 1 */}
      <div className="flex flex-col items-start sm:items-end text-left sm:text-right space-y-2 w-full">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {isBetter1 && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-xs font-semibold mb-1 sm:mb-0">
              <CheckCircle2 className="h-3 w-3" />
              +{formatCompactFn(Math.abs(diff))}
            </div>
          )}
          <span className={cn("font-bold tracking-tight tabular-nums", highlightTotal ? "text-xl sm:text-2xl text-foreground" : "text-base sm:text-lg text-muted-foreground", isBetter1 && highlightTotal && "text-emerald-600")}>
            {formatFn(value1)}
          </span>
        </div>
        {/* Visual Bar */}
        <div className="w-full flex justify-start sm:justify-end h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", isBetter1 ? "bg-emerald-500" : "bg-primary/40")} 
            style={{ width: `${pct1}%` }} 
          />
        </div>
      </div>

      {/* Salary 2 */}
      <div className="flex flex-col items-start text-left space-y-2 w-full">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className={cn("font-bold tracking-tight tabular-nums", highlightTotal ? "text-xl sm:text-2xl text-foreground" : "text-base sm:text-lg text-muted-foreground", isBetter2 && highlightTotal && "text-emerald-600")}>
            {formatFn(value2)}
          </span>
          {isBetter2 && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-xs font-semibold mb-1 sm:mb-0">
              <CheckCircle2 className="h-3 w-3" />
              +{formatCompactFn(Math.abs(diff))}
            </div>
          )}
        </div>
        {/* Visual Bar */}
        <div className="w-full flex justify-start h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", isBetter2 ? "bg-emerald-500" : "bg-primary/40")} 
            style={{ width: `${pct2}%` }} 
          />
        </div>
      </div>

    </div>
  );
}

export function ComparisonResults({ data, entry1, entry2 }: ComparisonResultsProps) {
  const { salary1, salary2 } = data;

  return (
    <Card className="border-2 shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/20 border-b border-border/50 pb-6 pt-6">
        <CardTitle className="text-lg font-bold text-center tracking-tight">
          Side-by-Side Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Comparison Header */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-end py-6 px-4 sm:px-8 border-b border-border/50 bg-background">
          <div className="text-right flex flex-col items-end gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Entry A</span>
            <div className="flex flex-col items-end">
              <span className="text-base sm:text-lg font-bold capitalize text-foreground">{entry1 ? entry1.company.name : "Salary 1"}</span>
              <span className="text-sm text-muted-foreground">{entry1 ? entry1.role : "Unknown Role"}</span>
              <div className="mt-2 flex gap-2">
                <LevelBadge level={salary1.level as Level} />
              </div>
            </div>
          </div>
          
          <div className="w-12 sm:w-20 text-center flex justify-center pb-2">
            <div className="h-8 w-px bg-border/80" />
          </div>
          
          <div className="text-left flex flex-col items-start gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Entry B</span>
            <div className="flex flex-col items-start">
              <span className="text-base sm:text-lg font-bold capitalize text-foreground">{entry2 ? entry2.company.name : "Salary 2"}</span>
              <span className="text-sm text-muted-foreground">{entry2 ? entry2.role : "Unknown Role"}</span>
              <div className="mt-2 flex gap-2">
                <LevelBadge level={salary2.level as Level} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-2 sm:p-4 space-y-2">
          <ComparisonRow
            label="Total Comp"
            value1={salary1.totalCompensation}
            value2={salary2.totalCompensation}
            highlightTotal
          />
          
          <div className="px-4 py-2">
            <div className="h-px w-full bg-border/40" />
          </div>

          <ComparisonRow
            label="Base Salary"
            value1={salary1.baseSalary}
            value2={salary2.baseSalary}
          />
          <ComparisonRow
            label="Bonus"
            value1={salary1.bonus || 0}
            value2={salary2.bonus || 0}
          />
          <ComparisonRow
            label="Stock"
            value1={salary1.stock || 0}
            value2={salary2.stock || 0}
          />
          
          <div className="px-4 py-2">
            <div className="h-px w-full bg-border/40" />
          </div>

          <ComparisonRow
            label="Exp. Years"
            value1={entry1?.experienceYears || 0}
            value2={entry2?.experienceYears || 0}
            isCurrency={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

import { capitalize, formatCurrency, formatNumber } from "@/lib/utils";
import type { CompanyInsights } from "@/types";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface CompanyHeaderProps {
  data: CompanyInsights;
}

export function CompanyHeader({ data }: CompanyHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/salaries"
          className="hover:text-foreground transition-colors"
        >
          Salaries
        </Link>
        <span>/</span>
        <span className="text-foreground">{capitalize(data.company)}</span>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
          <Building2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {capitalize(data.company)}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="text-sm text-muted-foreground">
              {formatNumber(data.totalEntries)} salary{" "}
              {data.totalEntries === 1 ? "entry" : "entries"}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              Avg Total Comp:{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(data.averageTotalCompensation)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

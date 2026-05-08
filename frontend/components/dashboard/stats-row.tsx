"use client";

import { useDashboardOverview } from "@/hooks/use-queries";
import { StatCard, StatCardSkeleton } from "@/components/ui/stat-card";
import { ErrorState } from "@/components/ui/error-state";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Database,
  TrendingUp,
  Trophy,
  Building2,
} from "lucide-react";

export function StatsRow() {
  const { data, isLoading, isError, refetch } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Salaries"
        value={formatNumber(data.totalSalaries)}
        icon={Database}
        description="Salary entries tracked"
      />
      <StatCard
        title="Average Compensation"
        value={formatCurrency(data.averageCompensation)}
        icon={TrendingUp}
        description="Across all entries"
      />
      <StatCard
        title="Highest Compensation"
        value={formatCurrency(data.highestCompensation)}
        icon={Trophy}
        description="Peak total comp"
      />
      <StatCard
        title="Total Companies"
        value={formatNumber(data.totalCompanies)}
        icon={Building2}
        description="Companies represented"
      />
    </div>
  );
}

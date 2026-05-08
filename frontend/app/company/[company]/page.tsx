"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import { useCompanyInsights, useCompanyAnalytics } from "@/hooks/use-queries";
import { CompanyHeader } from "@/components/company/company-header";
import { CompanyInsightsCards } from "@/components/company/company-insights";
import { CompanyAnalyticsCards } from "@/components/company/company-analytics";
import { ErrorState } from "@/components/ui/error-state";
import { CardsSkeleton, ChartSkeleton } from "@/components/ui/loading-skeleton";

const CompanyLevelChart = dynamic(
  () => import("@/components/company/company-level-chart").then((mod) => mod.CompanyLevelChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export default function CompanyPage(
  props: PageProps<"/company/[company]">
) {
  const { company } = use(props.params);
  const companyName = decodeURIComponent(company);

  const insights = useCompanyInsights(companyName);
  const analytics = useCompanyAnalytics(companyName);

  if (insights.isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight capitalize">
            {companyName}
          </h1>
        </div>
        <ErrorState
          title="Company not found"
          message={`Could not find compensation data for "${companyName}".`}
          onRetry={() => {
            insights.refetch();
            analytics.refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Header */}
      {insights.isLoading ? (
        <CardsSkeleton count={1} />
      ) : (
        insights.data && <CompanyHeader data={insights.data} />
      )}

      {/* Analytics Cards (Range & Percentiles) */}
      {analytics.isLoading ? (
        <CardsSkeleton count={4} />
      ) : analytics.isError ? (
        <ErrorState
          message="Could not load analytics data."
          onRetry={() => analytics.refetch()}
        />
      ) : (
        analytics.data && <CompanyAnalyticsCards data={analytics.data} />
      )}

      {/* Insights Cards (Averages Breakdown) */}
      {insights.isLoading ? (
        <CardsSkeleton count={4} />
      ) : (
        insights.data && <CompanyInsightsCards data={insights.data} />
      )}

      {/* Level Distribution & Progression Chart */}
      {insights.isLoading ? (
        <ChartSkeleton />
      ) : (
        insights.data && <CompanyLevelChart levels={insights.data.levels} />
      )}
    </div>
  );
}

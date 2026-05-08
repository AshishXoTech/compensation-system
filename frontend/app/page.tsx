"use client";

import dynamic from "next/dynamic";
import { StatsRow } from "@/components/dashboard/stats-row";
import { RecentEntriesTable } from "@/components/dashboard/recent-entries-table";
import { HeroSection } from "@/components/dashboard/hero-section";
import { ChartSkeleton } from "@/components/ui/loading-skeleton";

const TopCompaniesChart = dynamic(
  () => import("@/components/dashboard/top-companies-chart").then(mod => mod.TopCompaniesChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const LevelDistributionChart = dynamic(
  () => import("@/components/dashboard/level-distribution-chart").then(mod => mod.LevelDistributionChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const LocationInsightsChart = dynamic(
  () => import("@/components/dashboard/location-insights-chart").then(mod => mod.LocationInsightsChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Cards */}
      <StatsRow />

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopCompaniesChart />
        <LevelDistributionChart />
      </div>

      {/* Location Insights */}
      <LocationInsightsChart />

      {/* Recent Entries */}
      <RecentEntriesTable />
    </div>
  );
}

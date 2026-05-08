"use client";

import { useLevelDistribution } from "@/hooks/use-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { CHART_COLORS } from "@/lib/constants";
import type { Level } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function LevelDistributionChart() {
  const { data, isLoading, isError, refetch } = useLevelDistribution();

  if (isLoading) return <ChartSkeleton />;
  if (isError) {
    return (
      <Card>
        <CardContent>
          <ErrorState onRetry={() => refetch()} />
        </CardContent>
      </Card>
    );
  }
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Level Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState description="No level data available yet." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Level Distribution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Number of salary entries per engineering level
        </p>
      </CardHeader>
      <CardContent className="w-full min-w-0 overflow-hidden">
        <div className="w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                dataKey="count"
                nameKey="level"
                paddingAngle={3}
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.level}
                    fill={CHART_COLORS[entry.level as Level] || "#94a3b8"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} entries`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e4e4e7",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  fontSize: "13px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground ml-1">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

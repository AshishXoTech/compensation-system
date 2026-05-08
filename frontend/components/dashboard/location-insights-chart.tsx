"use client";

import { useLocationInsights } from "@/hooks/use-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCompactCurrency, capitalize } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function LocationInsightsChart() {
  const { data, isLoading, isError, refetch } = useLocationInsights();

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
            Location Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState description="No location data available yet." />
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    location: capitalize(item.location),
    shortLocation:
      capitalize(item.location).length > 14
        ? capitalize(item.location).slice(0, 14) + "…"
        : capitalize(item.location),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Location Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Average compensation by location
        </p>
      </CardHeader>
      <CardContent className="w-full min-w-0 overflow-hidden">
        <div className="w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e4e4e7"
              />
              <XAxis
                dataKey="shortLocation"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickFormatter={(v) => formatCompactCurrency(v)}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value) => [
                  formatCompactCurrency(Number(value)),
                  "Avg Compensation",
                ]}
                labelFormatter={(label) => label}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e4e4e7",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  fontSize: "13px",
                }}
              />
              <Bar
                dataKey="averageCompensation"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

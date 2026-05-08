"use client";

import { useTopCompanies } from "@/hooks/use-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCompactCurrency, capitalize } from "@/lib/utils";
import { CHART_PALETTE } from "@/lib/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function TopCompaniesChart() {
  const { data, isLoading, isError, refetch } = useTopCompanies();

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
            Top Paying Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState description="No company data available yet." />
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    company: capitalize(item.company),
    shortName:
      capitalize(item.company).length > 12
        ? capitalize(item.company).slice(0, 12) + "…"
        : capitalize(item.company),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Top Paying Companies
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Average total compensation by company
        </p>
      </CardHeader>
      <CardContent className="min-w-0 overflow-hidden">
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#e4e4e7"
              />
              <XAxis
                type="number"
                tickFormatter={(v) => formatCompactCurrency(v)}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="shortName"
                width={100}
                fontSize={12}
                tickLine={false}
                axisLine={false}
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
              <Bar dataKey="averageCompensation" radius={[0, 4, 4, 0]} barSize={24}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_PALETTE[index % CHART_PALETTE.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

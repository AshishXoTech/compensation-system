"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/constants";
import type { CompanyLevelData } from "@/types";
import type { Level } from "@/types";
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
import { ArrowUpRight } from "lucide-react";

interface CompanyLevelChartProps {
  levels: CompanyLevelData[];
}

export function CompanyLevelChart({ levels }: CompanyLevelChartProps) {
  if (!levels || levels.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Compensation by Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState description="No level data available." />
        </CardContent>
      </Card>
    );
  }

  const sorted = [...levels].sort((a, b) => {
    const order = ["L3", "L4", "L5", "L6", "L7"];
    return order.indexOf(a.level) - order.indexOf(b.level);
  });

  // Calculate progression jumps
  const progressions = sorted.map((level, i) => {
    if (i === 0) return { ...level, jumpPercent: null, jumpValue: null };
    const prev = sorted[i - 1];
    const diff = level.averageTotalCompensation - prev.averageTotalCompensation;
    const percent = (diff / prev.averageTotalCompensation) * 100;
    return {
      ...level,
      jumpPercent: percent,
      jumpValue: diff,
      prevLevel: prev.level,
    };
  }).filter(l => l.jumpPercent !== null); // Remove first element

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Level Progression
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Average total compensation per engineering level and progression jumps
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Chart */}
          <div className="lg:col-span-2 w-full min-w-0 overflow-hidden">
            <div className="h-[350px] w-full min-w-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sorted}
                  margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e4e4e7"
                  />
                  <XAxis
                    dataKey="level"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
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
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e4e4e7",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      fontSize: "13px",
                    }}
                  />
                  <Bar
                    dataKey="averageTotalCompensation"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  >
                    {sorted.map((entry) => (
                      <Cell
                        key={entry.level}
                        fill={CHART_COLORS[entry.level as Level] || "#94a3b8"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progression Stats */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b pb-2">
              Step-up Multipliers
            </h4>
            {progressions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {progressions.map((prog) => (
                  <div key={prog.level} className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {prog.prevLevel} <span className="text-muted-foreground mx-1">→</span> {prog.level}
                      </span>
                      <div className="flex items-center text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-md">
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        {prog.jumpPercent?.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>Avg Jump</span>
                      <span className="font-medium text-foreground">+{formatCompactCurrency(prog.jumpValue || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground pt-4 text-center">
                Not enough level data to calculate progression.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

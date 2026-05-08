"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LevelBadge } from "@/components/ui/level-badge";
import { capitalize, formatCompactCurrency } from "@/lib/utils";
import type { Salary, Level } from "@/types";

interface SalarySelectorProps {
  label: string;
  salaries: Salary[];
  selectedId: string;
  onSelect: (id: string) => void;
  excludeId?: string;
}

export function SalarySelector({
  label,
  salaries,
  selectedId,
  onSelect,
  excludeId,
}: SalarySelectorProps) {
  const filteredSalaries = excludeId
    ? salaries.filter((s) => s.id !== excludeId)
    : salaries;

  const selectedSalary = salaries.find((s) => s.id === selectedId);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Select value={selectedId || "placeholder"} onValueChange={(v) => { if (v) onSelect(v); }}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select a salary entry" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {filteredSalaries.length === 0 ? (
              <SelectItem value="none" disabled>
                No entries available
              </SelectItem>
            ) : (
              filteredSalaries.map((salary) => (
                <SelectItem key={salary.id} value={salary.id}>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {capitalize(salary.company.name)}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{salary.role}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{salary.level}</span>
                  </span>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {/* Selected salary preview */}
        {selectedSalary && (
          <div className="rounded-lg border border-border/60 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                {capitalize(selectedSalary.company.name)}
              </span>
              <LevelBadge level={selectedSalary.level as Level} />
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedSalary.role} ·{" "}
              {capitalize(selectedSalary.location)} ·{" "}
              {selectedSalary.experienceYears}y exp
            </p>
            <p className="text-lg font-bold tabular-nums">
              {formatCompactCurrency(selectedSalary.totalCompensation)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

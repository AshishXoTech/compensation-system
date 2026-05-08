"use client";

import { memo } from "react";
import Link from "next/link";
import { useRecentSalaries } from "@/hooks/use-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { LevelBadge } from "@/components/ui/level-badge";
import { formatCurrency, capitalize } from "@/lib/utils";
import type { Level } from "@/types";

export const RecentEntriesTable = memo(function RecentEntriesTable() {
  const { data, isLoading, isError, refetch } = useRecentSalaries();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={5} />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <ErrorState onRetry={() => refetch()} />
        </CardContent>
      </Card>
    );
  }

  const salaries = data?.data || [];

  if (salaries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState description="No salary entries have been added yet." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Entries
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest salary submissions
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto w-full min-w-0">
          <Table className="w-full min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Company</TableHead>
                <TableHead className="text-xs">Role</TableHead>
                <TableHead className="text-xs">Level</TableHead>
                <TableHead className="text-xs">Location</TableHead>
                <TableHead className="text-xs text-right">
                  Total Comp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaries.map((salary) => (
                <TableRow key={salary.id} className="group">
                  <TableCell className="font-medium">
                    <Link
                      href={`/company/${encodeURIComponent(salary.company.name)}`}
                      className="text-sm text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {capitalize(salary.company.name)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {salary.role}
                  </TableCell>
                  <TableCell>
                    <LevelBadge level={salary.level as Level} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {capitalize(salary.location)}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-right tabular-nums">
                    {formatCurrency(salary.totalCompensation)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
});

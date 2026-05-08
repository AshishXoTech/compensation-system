"use client";

import { memo } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LevelBadge } from "@/components/ui/level-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency, capitalize, cn } from "@/lib/utils";
import type { Salary, Level } from "@/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SalaryTableProps {
  salaries: Salary[];
  isLoading: boolean;
  currentSortBy?: string;
  currentOrder?: "asc" | "desc";
  onSort?: (sortBy: string, order: "asc" | "desc") => void;
  onResetFilters?: () => void;
}

export const SalaryTable = memo(function SalaryTable({
  salaries,
  isLoading,
  currentSortBy = "createdAt",
  currentOrder = "desc",
  onSort,
  onResetFilters,
}: SalaryTableProps) {

  const handleSort = (column: string) => {
    if (!onSort) return;

    // Toggle order if clicking same column, else default to descending for numbers, ascending for text
    if (currentSortBy === column) {
      onSort(column, currentOrder === "asc" ? "desc" : "asc");
    } else {
      // Numbers usually default to desc (highest first), names to asc (A-Z)
      const defaultDesc = ["baseSalary", "bonus", "stock", "totalCompensation", "experienceYears", "createdAt"].includes(column);
      onSort(column, defaultDesc ? "desc" : "asc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (currentSortBy !== column) {
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-20 group-hover:opacity-50 transition-opacity" />;
    }
    return currentOrder === "desc" ? (
      <ArrowDown className="ml-1 h-3 w-3 text-primary" />
    ) : (
      <ArrowUp className="ml-1 h-3 w-3 text-primary" />
    );
  };

  const SortableHeader = ({
    label,
    column,
    align = "left",
    className
  }: {
    label: string,
    column: string,
    align?: "left" | "right",
    className?: string
  }) => (
    <TableHead
      className={cn(
        "text-xs font-semibold sticky top-0 bg-background z-10 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors group select-none whitespace-nowrap h-9",
        align === "right" && "text-right",
        className
      )}
      onClick={() => handleSort(column)}
    >
      <div className={cn("flex items-center", align === "right" && "justify-end")}>
        {label}
        <SortIcon column={column} />
      </div>
    </TableHead>
  );

  if (isLoading) {
    return (
      <div className="rounded-md border bg-card overflow-x-auto relative">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              {['Company', 'Role', 'Level', 'Location', 'YoE', 'Base', 'Bonus', 'Stock', 'Total Comp'].map((h, i) => (
                <TableHead key={i} className="text-xs font-semibold h-9 sticky top-0 bg-background z-10 shadow-sm whitespace-nowrap">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="py-2.5"><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="py-2.5"><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell className="py-2.5"><Skeleton className="h-5 w-10" /></TableCell>
                <TableCell className="py-2.5"><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="py-2.5"><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell className="py-2.5 text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                <TableCell className="py-2.5 text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                <TableCell className="py-2.5 text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                <TableCell className="py-2.5 text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!salaries || salaries.length === 0) {
    return (
      <EmptyState
        title="No compensation data found"
        description="We couldn't find any salaries matching your current filter combination. Try adjusting your search criteria."
      >
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="outline" className="min-w-[140px]">
            Clear all filters
          </Button>
        )}
      </EmptyState>
    );
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto relative shadow-sm w-full min-w-0">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="text-xs font-semibold sticky top-0 bg-background z-10 shadow-sm whitespace-nowrap h-9">Company</TableHead>
            <TableHead className="text-xs font-semibold sticky top-0 bg-background z-10 shadow-sm whitespace-nowrap h-9">Role</TableHead>
            <TableHead className="text-xs font-semibold sticky top-0 bg-background z-10 shadow-sm whitespace-nowrap h-9">Level</TableHead>
            <TableHead className="text-xs font-semibold sticky top-0 bg-background z-10 shadow-sm whitespace-nowrap h-9">Location</TableHead>
            <SortableHeader label="YoE" column="experienceYears" />
            <SortableHeader label="Base" column="baseSalary" align="right" />
            <SortableHeader label="Bonus" column="bonus" align="right" />
            <SortableHeader label="Stock" column="stock" align="right" />
            <SortableHeader label="Total Comp" column="totalCompensation" align="right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaries.map((salary) => (
            <TableRow
              key={salary.id}
              className="group hover:bg-muted/50 transition-colors"
            >
              <TableCell className="py-2.5 font-medium whitespace-nowrap">
                <Link
                  href={`/company/${encodeURIComponent(salary.company.name)}`}
                  className="text-sm text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                >
                  {capitalize(salary.company.name)}
                </Link>
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground whitespace-nowrap max-w-[200px] truncate">
                {salary.role}
              </TableCell>
              <TableCell className="py-2.5 whitespace-nowrap">
                <LevelBadge level={salary.level as Level} />
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground whitespace-nowrap">
                {capitalize(salary.location)}
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                {salary.experienceYears}y
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground text-right tabular-nums whitespace-nowrap">
                {formatCurrency(salary.baseSalary)}
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground text-right tabular-nums whitespace-nowrap">
                {salary.bonus ? formatCurrency(salary.bonus) : "—"}
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground text-right tabular-nums whitespace-nowrap">
                {salary.stock ? formatCurrency(salary.stock) : "—"}
              </TableCell>
              <TableCell className="py-2.5 text-sm font-semibold text-right tabular-nums whitespace-nowrap">
                {formatCurrency(salary.totalCompensation)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

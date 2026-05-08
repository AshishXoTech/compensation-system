"use client";

import { Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSalaries } from "@/hooks/use-queries";
import { SalaryFilters as SalaryFiltersBar } from "@/components/salaries/salary-filters";
import { SalaryTable } from "@/components/salaries/salary-table";
import { Pagination } from "@/components/ui/pagination-control";
import { ErrorState } from "@/components/ui/error-state";
import type { SalaryFilters } from "@/types";

function SalariesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: SalaryFilters = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "20",
    sortBy: searchParams.get("sortBy") || "createdAt",
    order: (searchParams.get("order") as "asc" | "desc") || "desc",
    company: searchParams.get("company") || undefined,
    role: searchParams.get("role") || undefined,
    level: searchParams.get("level") || undefined,
    location: searchParams.get("location") || undefined,
  };

  const { data, isLoading, isError, refetch } = useSalaries(filters);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      const qs = createQueryString({
        [key]: value || null,
        // Reset to page 1 when filters change
        page: key !== "page" ? "1" : null,
      });
      router.push(`${pathname}?${qs}`, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  const handleSortChange = useCallback(
    (sortBy: string, order: "asc" | "desc") => {
      const qs = createQueryString({ sortBy, order, page: "1" });
      router.push(`${pathname}?${qs}`, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const qs = createQueryString({ page: String(page) });
      router.push(`${pathname}?${qs}`, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  const handleClearFilters = useCallback(() => {
    // Clear all search params to reset to defaults
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Salaries</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and filter compensation data across companies, roles, and levels
        </p>
      </div>

      {/* Filters (Sticky via component classes) */}
      <SalaryFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {/* Error State */}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {/* Table */}
      {!isError && (
        <>
          <SalaryTable
            salaries={data?.data || []}
            isLoading={isLoading}
            currentSortBy={filters.sortBy}
            currentOrder={filters.order as "asc" | "desc"}
            onSort={handleSortChange}
            onResetFilters={handleClearFilters}
          />

          {/* Pagination */}
          {data?.pagination && (
            <Pagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              totalResults={data.pagination.totalResults}
              perPage={data.pagination.perPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function SalariesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading salary data...</div>}>
      <SalariesContent />
    </Suspense>
  );
}

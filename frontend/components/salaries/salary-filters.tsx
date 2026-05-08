"use client";

import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { LEVELS } from "@/lib/constants";
import type { SalaryFilters as SalaryFilterValues } from "@/types";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SalaryFiltersProps {
  filters: SalaryFilterValues;
  onFilterChange: (key: string, value: string) => void;
  onSortChange?: (sortBy: string, order: "asc" | "desc") => void; // Kept for interface compatibility
  onClearFilters: () => void;
  className?: string;
}

export function SalaryFilters({
  filters,
  onFilterChange,
  onClearFilters,
  className,
}: SalaryFiltersProps) {
  const hasActiveFilters =
    !!filters.company ||
    !!filters.role ||
    !!filters.level ||
    !!filters.location;

  const activeCount = [
    filters.company,
    filters.role,
    filters.level,
    filters.location,
  ].filter(Boolean).length;

  const FilterInputs = (
    <>
      {/* Search by company */}
      <SearchInput
        placeholder="Company..."
        value={filters.company || ""}
        onChange={(value) => onFilterChange("company", value)}
        className="w-full sm:w-56 h-9"
      />

      {/* Role filter */}
      <SearchInput
        placeholder="Role..."
        value={filters.role || ""}
        onChange={(value) => onFilterChange("role", value)}
        className="w-full sm:w-48 h-9"
      />

      {/* Level filter */}
      <Select
        value={filters.level || "all"}
        onValueChange={(value) =>
          onFilterChange("level", value === "all" || !value ? "" : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[140px] h-9">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {LEVELS.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location filter */}
      <SearchInput
        placeholder="Location..."
        value={filters.location || ""}
        onChange={(value) => onFilterChange("location", value)}
        className="w-full sm:w-48 h-9"
      />
    </>
  );

  return (
    <div
      className={cn(
        "sticky top-14 z-20 bg-background/95 backdrop-blur-md py-3 border-b mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-b-0 sm:bg-transparent sm:backdrop-blur-none sm:static",
        className
      )}
    >
      {/* Mobile Drawer */}
      <div className="flex sm:hidden items-center justify-between gap-3 w-full">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" className="w-full justify-between" />
            }
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </span>
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                {activeCount}
              </span>
            )}
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-xl sm:hidden p-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left">Filter Salaries</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-5">
              {FilterInputs}
            </div>
            {hasActiveFilters && (
              <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={onClearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={onClearFilters} className="shrink-0 h-9 w-9">
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Desktop Inline */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        {FilterInputs}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-9 px-3 text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

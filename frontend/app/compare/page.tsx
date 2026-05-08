"use client";

import { useState } from "react";
import { useCompareSalaries, useSalaries } from "@/hooks/use-queries";
import { SalarySelector } from "@/components/compare/salary-selector";
import { ComparisonResults } from "@/components/compare/comparison-results";
import { Button } from "@/components/ui/button";
import { GitCompareArrows } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { CardsSkeleton } from "@/components/ui/loading-skeleton";

export default function ComparePage() {
  const [salaryId1, setSalaryId1] = useState("");
  const [salaryId2, setSalaryId2] = useState("");
  const [triggeredIds, setTriggeredIds] = useState<{
    id1: string;
    id2: string;
  } | null>(null);

  // Fetch salary list for selection
  const { data: salariesData } = useSalaries({
    limit: "100",
    sortBy: "createdAt",
    order: "desc",
  });

  const salaries = salariesData?.data || [];

  // Fetch comparison only when triggered
  const {
    data: comparison,
    isLoading: isComparing,
    isError: isCompareError,
    refetch: retryCompare,
  } = useCompareSalaries(
    triggeredIds?.id1 || "",
    triggeredIds?.id2 || ""
  );

  const handleCompare = () => {
    if (salaryId1 && salaryId2 && salaryId1 !== salaryId2) {
      setTriggeredIds({ id1: salaryId1, id2: salaryId2 });
    }
  };

  const canCompare =
    salaryId1 && salaryId2 && salaryId1 !== salaryId2;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compare</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select two salary entries to compare compensation side by side
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Selectors */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <SalarySelector
              label="Entry A"
              salaries={salaries}
              selectedId={salaryId1}
              onSelect={setSalaryId1}
              excludeId={salaryId2}
            />
            <SalarySelector
              label="Entry B"
              salaries={salaries}
              selectedId={salaryId2}
              onSelect={setSalaryId2}
              excludeId={salaryId1}
            />
          </div>

          {/* Compare Button */}
          <div className="flex justify-start">
            <Button
              size="lg"
              onClick={handleCompare}
              disabled={!canCompare || isComparing}
              className="w-full"
            >
              <GitCompareArrows className="mr-2 h-4 w-4" />
              {isComparing ? "Comparing..." : "Compare Salaries"}
            </Button>
          </div>

          {/* Same salary warning */}
          {salaryId1 && salaryId2 && salaryId1 === salaryId2 && (
            <div>
              <p className="text-sm text-destructive font-medium">
                Please select two different salary entries to compare.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Results */}
        <div className="lg:col-span-7 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] overflow-y-auto custom-scrollbar pr-2 pb-8">
          {isCompareError && triggeredIds && (
            <ErrorState
              title="Comparison Failed"
              message="Could not compare the selected salaries."
              onRetry={retryCompare}
            />
          )}

          {!isCompareError && !comparison && !isComparing && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-border/60 rounded-xl flex items-center justify-center bg-muted/10">
              <EmptyState
                title="Select Entries"
                description="Choose two salary entries from the left and click compare to see detailed insights."
              />
            </div>
          )}

          {isComparing && (
            <CardsSkeleton count={1} />
          )}

          {comparison && !isComparing && !isCompareError && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ComparisonResults 
                data={comparison} 
                entry1={salaries.find(s => s.id === triggeredIds?.id1)}
                entry2={salaries.find(s => s.id === triggeredIds?.id2)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

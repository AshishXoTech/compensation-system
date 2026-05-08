import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  fetchDashboardOverview,
  fetchTopCompanies,
  fetchLevelDistribution,
  fetchLocationInsights,
  fetchSalaries,
  fetchCompanyInsights,
  fetchCompanyAnalytics,
  compareSalariesById,
} from "@/lib/api";
import type { SalaryFilters } from "@/types";

// ============================================
// Dashboard Hooks
// ============================================

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: fetchDashboardOverview,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTopCompanies() {
  return useQuery({
    queryKey: ["dashboard", "top-companies"],
    queryFn: fetchTopCompanies,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLevelDistribution() {
  return useQuery({
    queryKey: ["dashboard", "level-distribution"],
    queryFn: fetchLevelDistribution,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLocationInsights() {
  return useQuery({
    queryKey: ["dashboard", "location-insights"],
    queryFn: fetchLocationInsights,
    staleTime: 1000 * 60 * 5,
  });
}

// ============================================
// Salaries Hooks
// ============================================

export function useSalaries(filters: SalaryFilters = {}) {
  return useQuery({
    queryKey: ["salaries", filters],
    queryFn: () => fetchSalaries(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}

export function useRecentSalaries() {
  return useQuery({
    queryKey: ["salaries", "recent"],
    queryFn: () =>
      fetchSalaries({ sortBy: "createdAt", order: "desc", limit: "5" }),
    staleTime: 1000 * 30,
  });
}

// ============================================
// Company Hooks
// ============================================

export function useCompanyInsights(companyName: string) {
  return useQuery({
    queryKey: ["company", companyName, "insights"],
    queryFn: () => fetchCompanyInsights(companyName),
    enabled: !!companyName,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCompanyAnalytics(companyName: string) {
  return useQuery({
    queryKey: ["company", companyName, "analytics"],
    queryFn: () => fetchCompanyAnalytics(companyName),
    enabled: !!companyName,
    staleTime: 1000 * 60 * 2,
  });
}

// ============================================
// Compare Hooks
// ============================================

export function useCompareSalaries(
  salaryId1: string,
  salaryId2: string
) {
  return useQuery({
    queryKey: ["compare", salaryId1, salaryId2],
    queryFn: () => compareSalariesById(salaryId1, salaryId2),
    enabled: !!salaryId1 && !!salaryId2,
    staleTime: 1000 * 60,
  });
}

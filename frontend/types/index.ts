// ============================================
// Core Data Types
// ============================================

export type Level = "L3" | "L4" | "L5" | "L6" | "L7";

export interface Company {
  id: string;
  name: string;
  createdAt: string;
}

export interface Salary {
  id: string;
  companyId: string;
  company: Company;
  role: string;
  level: Level;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  confidenceScore: number | null;
  createdAt: string;
}

// ============================================
// API Response Wrappers
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationMeta {
  totalResults: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  pagination: PaginationMeta;
  data: T[];
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardOverview {
  totalSalaries: number;
  totalCompanies: number;
  averageCompensation: number;
  highestCompensation: number;
}

export interface TopCompany {
  company: string;
  averageCompensation: number;
  totalEntries: number;
}

export interface LevelDistribution {
  level: Level;
  count: number;
}

export interface LocationInsight {
  location: string;
  averageCompensation: number;
  entries: number;
}

// ============================================
// Company Types
// ============================================

export interface CompanyLevelData {
  level: string;
  count: number;
  averageTotalCompensation: number;
}

export interface CompanyInsights {
  company: string;
  totalEntries: number;
  averageBaseSalary: number;
  averageBonus: number;
  averageStock: number;
  averageTotalCompensation: number;
  levels: CompanyLevelData[];
}

export interface CompanyAnalytics {
  company: string;
  entries: number;
  p50: number;
  p75: number;
  p90: number;
  minComp: number;
  maxComp: number;
  averageComp: number;
}

// ============================================
// Compare Types
// ============================================

export interface CompareSalaryEntry {
  id: string;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  level: Level;
}

export interface CompareByIdResponse {
  salary1: CompareSalaryEntry;
  salary2: CompareSalaryEntry;
  differences: {
    baseSalaryDifference: number;
    bonusDifference: number;
    stockDifference: number;
    totalCompensationDifference: number;
    levelDifference: string;
  };
}

// ============================================
// Query Parameter Types
// ============================================

export interface SalaryFilters {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  minComp?: string;
  maxComp?: string;
  minExperience?: string;
  maxExperience?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
}

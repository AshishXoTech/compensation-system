import apiClient from "./axios";
import { API_ROUTES } from "./constants";
import type {
  ApiResponse,
  DashboardOverview,
  TopCompany,
  LevelDistribution,
  LocationInsight,
  PaginatedData,
  Salary,
  SalaryFilters,
  CompanyInsights,
  CompanyAnalytics,
  CompareByIdResponse,
} from "@/types";

// ============================================
// Dashboard API
// ============================================

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const { data } = await apiClient.get<ApiResponse<DashboardOverview>>(
    API_ROUTES.DASHBOARD_OVERVIEW
  );
  return data.data;
}

export async function fetchTopCompanies(): Promise<TopCompany[]> {
  const { data } = await apiClient.get<ApiResponse<TopCompany[]>>(
    API_ROUTES.DASHBOARD_TOP_COMPANIES
  );
  return data.data;
}

export async function fetchLevelDistribution(): Promise<LevelDistribution[]> {
  const { data } = await apiClient.get<ApiResponse<LevelDistribution[]>>(
    API_ROUTES.DASHBOARD_LEVEL_DISTRIBUTION
  );
  return data.data;
}

export async function fetchLocationInsights(): Promise<LocationInsight[]> {
  const { data } = await apiClient.get<ApiResponse<LocationInsight[]>>(
    API_ROUTES.DASHBOARD_LOCATION_INSIGHTS
  );
  return data.data;
}

// ============================================
// Salaries API
// ============================================

export async function fetchSalaries(
  filters: SalaryFilters = {}
): Promise<PaginatedData<Salary>> {
  // Remove empty/undefined params
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== undefined && v !== "" && v !== null
    )
  );

  const { data } = await apiClient.get<ApiResponse<PaginatedData<Salary>>>(
    API_ROUTES.SALARIES,
    { params }
  );
  return data.data;
}

// ============================================
// Company API
// ============================================

export async function fetchCompanyInsights(
  companyName: string
): Promise<CompanyInsights> {
  const { data } = await apiClient.get<ApiResponse<CompanyInsights>>(
    API_ROUTES.COMPANY(companyName)
  );
  return data.data;
}

export async function fetchCompanyAnalytics(
  companyName: string
): Promise<CompanyAnalytics> {
  const { data } = await apiClient.get<ApiResponse<CompanyAnalytics>>(
    API_ROUTES.COMPANY_ANALYTICS(companyName)
  );
  return data.data;
}

// ============================================
// Compare API
// ============================================

export async function compareSalariesById(
  salaryId1: string,
  salaryId2: string
): Promise<CompareByIdResponse> {
  const { data } = await apiClient.get<ApiResponse<CompareByIdResponse>>(
    API_ROUTES.COMPARE_BY_ID,
    { params: { salaryId1, salaryId2 } }
  );
  return data.data;
}

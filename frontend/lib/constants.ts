import type { Level } from "@/types";

// ============================================
// API Routes
// ============================================

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const API_ROUTES = {
  // Dashboard
  DASHBOARD_OVERVIEW: "/dashboard/overview",
  DASHBOARD_TOP_COMPANIES: "/dashboard/top-companies",
  DASHBOARD_LEVEL_DISTRIBUTION: "/dashboard/level-distribution",
  DASHBOARD_LOCATION_INSIGHTS: "/dashboard/location-insights",

  // Salaries
  SALARIES: "/salaries",

  // Company
  COMPANY: (name: string) => `/companies/${encodeURIComponent(name)}`,
  COMPANY_ANALYTICS: (name: string) =>
    `/companies/${encodeURIComponent(name)}/analytics`,

  // Compare
  COMPARE: "/compare",
  COMPARE_BY_ID: "/compare/by-id",
} as const;

// ============================================
// Level Configuration
// ============================================

export const LEVELS: Level[] = ["L3", "L4", "L5", "L6", "L7"];

export const LEVEL_CONFIG: Record<
  Level,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  L3: {
    label: "L3 · Entry",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  L4: {
    label: "L4 · Mid",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  L5: {
    label: "L5 · Senior",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  L6: {
    label: "L6 · Staff",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  L7: {
    label: "L7 · Principal",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
};

// Chart color palette — muted and professional
export const CHART_COLORS = {
  L3: "#3b82f6", // blue-500
  L4: "#8b5cf6", // violet-500
  L5: "#f59e0b", // amber-500
  L6: "#10b981", // emerald-500
  L7: "#f43f5e", // rose-500
};

export const CHART_PALETTE = [
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#f43f5e",
  "#6366f1",
  "#14b8a6",
  "#f97316",
  "#ec4899",
  "#06b6d4",
];

// ============================================
// Sort Options
// ============================================

export const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt", order: "desc" as const },
  { label: "Oldest First", value: "createdAt", order: "asc" as const },
  {
    label: "Highest Compensation",
    value: "totalCompensation",
    order: "desc" as const,
  },
  {
    label: "Lowest Compensation",
    value: "totalCompensation",
    order: "asc" as const,
  },
  {
    label: "Most Experience",
    value: "experienceYears",
    order: "desc" as const,
  },
  {
    label: "Least Experience",
    value: "experienceYears",
    order: "asc" as const,
  },
];

// ============================================
// Pagination
// ============================================

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50];

// ============================================
// Navigation
// ============================================

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Salaries", href: "/salaries", icon: "TableProperties" },
  { label: "Compare", href: "/compare", icon: "GitCompareArrows" },
] as const;

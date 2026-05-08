import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as INR currency.
 * e.g., 1500000 → ₹15,00,000
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compact INR format.
 * e.g., 1500000 → ₹15L, 10000000 → ₹1Cr
 */
export function formatCompactCurrency(
  amount: number | null | undefined
): string {
  if (amount == null) return "—";

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")}Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `₹${amount}`;
}

/**
 * Capitalize first letter of each word.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncate string to a maximum length.
 */
export function truncate(str: string, maxLength: number = 30): string {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}

/**
 * Format a number with commas.
 */
export function formatNumber(num: number | null | undefined): string {
  if (num == null) return "—";
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Calculate percentage difference between two values.
 */
export function percentageDiff(a: number, b: number): string {
  if (b === 0) return "—";
  const diff = ((a - b) / b) * 100;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff.toFixed(1)}%`;
}

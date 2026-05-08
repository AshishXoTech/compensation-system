import { z } from "zod";

export const createSalarySchema = z.object({
  company: z
    .string()
    .min(1, "Company is required"),

  role: z
    .string()
    .min(1, "Role is required"),

  level: z.enum(["L3", "L4", "L5", "L6", "L7"]),

  location: z
    .string()
    .min(1, "Location is required"),

  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems invalid"),

  baseSalary: z
    .number()
    .min(0, "Base salary cannot be negative"),

  bonus: z
    .number()
    .min(0, "Bonus cannot be negative")
    .optional(),

  stock: z
    .number()
    .min(0, "Stock cannot be negative")
    .optional(),
});

export type CreateSalaryInput =
  z.infer<typeof createSalarySchema>;
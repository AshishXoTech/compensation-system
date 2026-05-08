import { Request, Response } from "express";

import { createSalarySchema } from "../validators/salary.validator";

import {
  createSalary,
  getSalaries,
} from "../services/salary.service";

export async function createSalaryController(
  req: Request,
  res: Response
) {
  const validatedData =
    createSalarySchema.parse(req.body);

  const salary =
    await createSalary(validatedData);

  return res.status(201).json({
    success: true,
    data: salary,
  });
}

export async function getSalariesController(
  req: Request,
  res: Response
) {
  const data =
    await getSalaries(req.query);

  return res.status(200).json({
    success: true,
    data,
  });
}
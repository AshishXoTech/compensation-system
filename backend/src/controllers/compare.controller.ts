import { Request, Response } from "express";

import {
  compareCompanies,
  compareSalaryByIds,
} from "../services/compare.service";

export async function compareCompaniesController(
  req: Request,
  res: Response
) {
  try {
    const data =
      await compareCompanies(req.query);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
}

export async function compareSalaryByIdsController(
  req: Request,
  res: Response
) {
  try {
    const {
      salaryId1,
      salaryId2,
    } = req.query;

    const data =
      await compareSalaryByIds(
        String(salaryId1),
        String(salaryId2)
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
}

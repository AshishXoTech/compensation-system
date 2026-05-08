import { Request, Response } from "express";

import {
  getCompanyInsights,
  getCompanyAnalytics,
} from "../services/company.service";

export async function getCompanyInsightsController(
  req: Request,
  res: Response
) {
  const companyName =
    req.params.companyName as string;

  const data =
    await getCompanyInsights(companyName);

  return res.status(200).json({
    success: true,
    data,
  });
}

export async function getCompanyAnalyticsController(
  req: Request,
  res: Response
) {
  const companyName =
    req.params.companyName as string;

  const data =
    await getCompanyAnalytics(companyName);

  return res.status(200).json({
    success: true,
    data,
  });
}
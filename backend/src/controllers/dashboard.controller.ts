import {
  Request,
  Response,
} from "express";

import {
  getDashboardOverview,
  getTopCompanies,
  getLevelDistribution,
  getLocationInsights,
} from "../services/dashboard.service";

import { asyncHandler }
from "../utils/asyncHandler";

export const dashboardOverviewController =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {

      const data =
        await getDashboardOverview();

      return res.status(200).json({
        success: true,
        data,
      });
    }
  );

export const topCompaniesController =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {

      const data =
        await getTopCompanies();

      return res.status(200).json({
        success: true,
        data,
      });
    }
  );

export const levelDistributionController =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {

      const data =
        await getLevelDistribution();

      return res.status(200).json({
        success: true,
        data,
      });
    }
  );

export const locationInsightsController =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {

      const data =
        await getLocationInsights();

      return res.status(200).json({
        success: true,
        data,
      });
    }
  );
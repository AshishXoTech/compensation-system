import { Router } from "express";

import {

  dashboardOverviewController,

  topCompaniesController,

  levelDistributionController,

  locationInsightsController,

} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/overview",
  dashboardOverviewController
);

router.get(
  "/top-companies",
  topCompaniesController
);

router.get(
  "/level-distribution",
  levelDistributionController
);

router.get(
  "/location-insights",
  locationInsightsController
);

export default router;
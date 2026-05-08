import { Router } from "express";

import {
  getCompanyInsightsController,
  getCompanyAnalyticsController,
} from "../controllers/company.controller";
import { asyncHandler } from "../middleware/error.middleware";

const router = Router();

router.get(
  "/:companyName/analytics",
  asyncHandler(getCompanyAnalyticsController)
);

router.get(
  "/:companyName",
  asyncHandler(getCompanyInsightsController)
);

export default router;
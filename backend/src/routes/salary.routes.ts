import { Router } from "express";

import {
  createSalaryController,
  getSalariesController,
} from "../controllers/salary.controller";
import { asyncHandler } from "../middleware/error.middleware";

const router = Router();

router.post(
  "/",
  asyncHandler(createSalaryController)
);

router.post(
  "/ingest-salary",
  asyncHandler(createSalaryController)
);

router.get(
  "/",
  asyncHandler(getSalariesController)
);

export default router;
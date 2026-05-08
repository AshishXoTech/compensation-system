import { Router } from "express";

import {
  compareCompaniesController,
  compareSalaryByIdsController,
} from "../controllers/compare.controller";

const router = Router();

router.get(
  "/",
  compareCompaniesController
);

router.get(
  "/by-id",
  compareSalaryByIdsController
);

export default router;
import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  getDriversWithoutMedExams,
  getLicensesAboutToExpire,
  getLicensesByType,
  getNoPaidInfractions,
  getPassedPracticalExams,
  getTotalClients,
  getTotalDrivers,
  getTotalExams,
  getTotalLicenses,
} from "../controllers/dashboardControllers.js";

const router = Router();
router.use(verifyToken);

router.get("/dashboard/licenses/by_type", getLicensesByType);

router.get("/dashboard/clients", getTotalClients);

router.get("/dashboard/drivers", getTotalDrivers);

router.get("/dashboard/licenses", getTotalLicenses);

router.get("/dashboard/exams", getTotalExams);

router.get("/dashboard/exams/passed_practical", getPassedPracticalExams);

router.get("/dashboard/licenses/about_to_expire", getLicensesAboutToExpire);

router.get("/dashboard/exams/medical", getDriversWithoutMedExams);

router.get("/dashboard/infractions/no_paid", getNoPaidInfractions);

export default router;

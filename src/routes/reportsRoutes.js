import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  getDriverReport,
  getExamsReport,
  getExpiredLicensesReport,
  getInfractionsByType,
  getInfractionsByYear,
  getInfractionsReport,
  getLicensesReport,
  sendDriverReport,
  sendExamReport,
  sendExpiredLicensesReport,
  sendInfractionsByTypeAndYearReport,
  sendInfractionsReport,
  sendLicensesReport,
} from "../controllers/reportsControllers.js";

const router = Router();
router.use(verifyToken);

router.get("/driver_report/:driverId", getDriverReport);

router.post("/driver_report_pdf", verifyToken, sendDriverReport);

router.get("/licenses_report", getLicensesReport);

router.post("/licenses_report_pdf", verifyToken, sendLicensesReport);

router.get("/exams_report", getExamsReport);

router.post("/exams_report_pdf", verifyToken, sendExamReport);

router.get("/infractions_report", getInfractionsReport);

router.post("/infractions_report_pdf", verifyToken, sendInfractionsReport);

router.get("/expired_licenses_report", getExpiredLicensesReport);

router.post(
  "/expired_licenses_report_pdf",
  verifyToken,
  sendExpiredLicensesReport
);

router.get("/infractions_report/by_type/:year", getInfractionsByType);

router.get("/infractions_report/by_year/:year", getInfractionsByYear);

router.post(
  "/infractions_report/by_type_and_year_pdf",
  verifyToken,
  sendInfractionsByTypeAndYearReport
);

export default router;

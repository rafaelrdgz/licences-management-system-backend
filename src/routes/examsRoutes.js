import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  chechExams,
  createExam,
  deleteExam,
  getExam,
  getExams,
  updateExam,
} from "../controllers/examsControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/exams", createExam);

router.get("/exams", getExams);

router.get("/exams/:id", getExam);

router.put("/exams/:id", updateExam);

router.delete("/exams/:id", deleteExam);

router.get("/exams/check/:id/", chechExams);

export default router;

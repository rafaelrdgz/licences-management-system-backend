import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  createWorker,
  deleteWorker,
  existsWorker,
  getWorker,
  getWorkers,
  updateWorker,
} from "../controllers/workersControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/workers", createWorker);

router.get("/workers", getWorkers);

router.get("/workers/:id", getWorker);

router.put("/workers/:id", updateWorker);

router.delete("/workers/:id", deleteWorker);

router.get("/workers/exists/:id/", existsWorker);

export default router;

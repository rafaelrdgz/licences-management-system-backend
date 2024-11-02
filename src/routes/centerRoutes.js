import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  getCenter,
  updateCenter,
  centerReport,
} from "../controllers/centerControllers.js";

const router = Router();
router.use(verifyToken);

router.get("/center", getCenter);

router.put("/center", updateCenter);

router.post("/center/pdf", centerReport);

export default router;

import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  createInfraction,
  getInfractions,
  getInfraction,
  updateInfraction,
  deleteInfraction,
} from "../controllers/infractionsControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/infractions", createInfraction);

router.get("/infractions", getInfractions);

router.get("/infractions/:id", getInfraction);

router.put("/infractions/:id", updateInfraction);

router.delete("/infractions/:id", deleteInfraction);

export default router;

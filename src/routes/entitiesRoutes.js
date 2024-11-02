import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  createEntity,
  deleteEntity,
  existsEntity,
  getEntities,
  getEntity,
  sendEntityReport,
  updateEntity,
} from "../controllers/entitiesControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/entities", createEntity);

router.get("/entities", getEntities);

router.get("/entities/exists/:id/", existsEntity);

router.get("/entities/:id", getEntity);

router.put("/entities/:id", updateEntity);

router.delete("/entities/:id", deleteEntity);

router.post("/entities/pdf", verifyToken, sendEntityReport);

export default router;

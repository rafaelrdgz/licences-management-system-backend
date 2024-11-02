import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  deleteDriver,
  existsDriver,
  getDriver,
  getDrivers,
  updateDriver,
} from "../controllers/driversControllers.js";

const router = Router();
router.use(verifyToken);

router.get("/drivers", getDrivers);

router.get("/drivers/exists/:id/", existsDriver);

router.get("/drivers/:id", getDriver);

router.put("/drivers/:id", updateDriver);

router.delete("/drivers/:id", deleteDriver);

export default router;

import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  addLicenseCategory,
  createLicense,
  deleteLicense,
  existsLicense,
  getLicense,
  getLicenses,
  getMissingCategories,
  updateLicense,
} from "../controllers/licensesControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/licenses", createLicense);

router.get("/licenses/exists/:id/", existsLicense);

router.get("/licenses", getLicenses);

router.get("/licenses/:id", getLicense);

router.get("/licenses/:id/categories", getMissingCategories);

router.put("/licenses/:id", updateLicense);

router.put("/licenses/:id/add_category", addLicenseCategory);

router.delete("/licenses/:id", deleteLicense);

export default router;

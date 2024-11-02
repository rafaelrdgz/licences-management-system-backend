import { Router } from "express";
import { verifyToken } from "../middlewares/jwt-middleware.js";
import {
  createClient,
  deleteClient,
  existClient,
  getClientById,
  getClients,
  updateClient,
} from "../controllers/clientsControllers.js";

const router = Router();
router.use(verifyToken);

router.post("/clients", createClient);

router.get("/clients", getClients);

router.get("/clients/exists/:id/", existClient);

router.get("/clients/:id", getClientById);

router.put("/clients/:id", updateClient);

router.delete("/clients/:id", deleteClient);

export default router;

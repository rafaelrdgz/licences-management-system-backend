import { Router } from "express";
import { login } from "../controllers/authControllers.js";

const router = Router();

router.get("/login", login);

export default router;

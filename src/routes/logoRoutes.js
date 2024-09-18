import { Router } from "express";
import multer from "multer";
import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../DB_config.js";
import {v4} from "uuid";

const router = Router();

const upload = multer({dest:"./uploads", filename: v4()})

router.post("/upload-logo", upload.single("logo"), async (req, res) => {
  res.json(req.file)
  }
);

export default router;

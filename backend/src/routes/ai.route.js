import express from "express";
import { handleStreamWebhook } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/stream-webhook", handleStreamWebhook);

export default router;
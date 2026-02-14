import express from "express";
import { createLinguaBot } from "../controllers/setup.controller.js";

const router = express.Router();

router.get("/create-bot", createLinguaBot);

export default router;
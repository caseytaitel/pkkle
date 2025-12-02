import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller";

const router = Router();

router.get("/today", sessionsController.getToday);
router.post("/", sessionsController.create);

export default router;
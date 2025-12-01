import { Router } from "express";
import { handleCreatePreSession, handleGetPreSessions } from "../controllers/preSessions.controller";

const router = Router();

router.post("/", handleCreatePreSession);
router.get("/", handleGetPreSessions);

export default router;
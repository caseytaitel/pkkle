import { Request, Response } from "express";
import { createPreSessionSchema } from "../validators/preSessions.validator";
import { createPreSession, getPreSessions } from "../services/preSessions.service";

export async function handleCreatePreSession(req: Request, res: Response) {
  try {
    const parseResult = createPreSessionSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten(),
      });
    }

    const session = await createPreSession(parseResult.data);

    return res.status(201).json(session);
  } catch (err) {
    console.error("Error creating pre-session:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleGetPreSessions(req: Request, res: Response) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const order = req.query.order === "asc" ? "asc" : "desc";

    const sessions = await getPreSessions(limit, order);
    return res.status(200).json(sessions);
  } catch (err) {
    console.error("Error fetching pre-sessions:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
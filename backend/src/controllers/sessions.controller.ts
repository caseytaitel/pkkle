import { Request, Response, NextFunction } from "express";
import { createSessionSchema } from "../validators/sessions.validator";
import { sessionsService } from "../services/sessions.service";

export const sessionsController = {
  getToday: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessions = await sessionsService.findToday();
      res.json(sessions);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.query.type as "pre" | "post" | undefined;
      const sessions = await sessionsService.findAll(type);
      res.json(sessions);
    } catch (err) {
      next(err);
    }
  },  

  create: async (req: Request, res: Response, next: NextFunction) => {
    const parseResult = createSessionSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten(),
      });
    }

    try {
      const session = await sessionsService.create(parseResult.data);
      return res.status(201).json(session);
    } catch (err) {
      next(err);
    }
  },
};
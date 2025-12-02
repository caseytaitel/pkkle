"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsController = void 0;
const sessions_validator_1 = require("../validators/sessions.validator");
const sessions_service_1 = require("../services/sessions.service");
exports.sessionsController = {
    getToday: async (req, res, next) => {
        try {
            const sessions = await sessions_service_1.sessionsService.findToday();
            res.json(sessions);
        }
        catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const parseResult = sessions_validator_1.createSessionSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parseResult.error.flatten(),
            });
        }
        try {
            const session = await sessions_service_1.sessionsService.create(parseResult.data);
            return res.status(201).json(session);
        }
        catch (err) {
            next(err);
        }
    }
};

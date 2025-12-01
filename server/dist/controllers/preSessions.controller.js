"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreatePreSession = handleCreatePreSession;
exports.handleGetPreSessions = handleGetPreSessions;
const preSessions_validator_1 = require("../validators/preSessions.validator");
const preSessions_service_1 = require("../services/preSessions.service");
async function handleCreatePreSession(req, res) {
    try {
        const parseResult = preSessions_validator_1.createPreSessionSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parseResult.error.flatten(),
            });
        }
        const session = await (0, preSessions_service_1.createPreSession)(parseResult.data);
        return res.status(201).json(session);
    }
    catch (err) {
        console.error("Error creating pre-session:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function handleGetPreSessions(req, res) {
    try {
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const order = req.query.order === "asc" ? "asc" : "desc";
        const sessions = await (0, preSessions_service_1.getPreSessions)(limit, order);
        return res.status(200).json(sessions);
    }
    catch (err) {
        console.error("Error fetching pre-sessions:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preSessions_controller_1 = require("../controllers/preSessions.controller");
const router = (0, express_1.Router)();
router.post("/", preSessions_controller_1.handleCreatePreSession);
router.get("/", preSessions_controller_1.handleGetPreSessions);
exports.default = router;

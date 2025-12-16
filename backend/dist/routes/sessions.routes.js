"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../controllers/sessions.controller");
const router = (0, express_1.Router)();
router.get("/today", sessions_controller_1.sessionsController.getToday);
router.get("/", sessions_controller_1.sessionsController.getAll);
router.post("/", sessions_controller_1.sessionsController.create);
exports.default = router;

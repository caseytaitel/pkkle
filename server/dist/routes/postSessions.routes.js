"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Temporary placeholder route
router.get("/", (req, res) => {
    res.send("PostSessions route working");
});
exports.default = router;

import express from "express";
import cors from "cors";
import "./config/env"; 
import preSessionsRouter from "./routes/preSessions.routes";
import postSessionsRouter from "./routes/postSessions.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pre-sessions", preSessionsRouter);
app.use("/api/post-sessions", postSessionsRouter);

export default app;
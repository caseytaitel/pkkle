import express from "express";
import cors from "cors";
import "./config/env"; 
import sessionsRouter from "./routes/sessions.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/sessions", sessionsRouter);

export default app;
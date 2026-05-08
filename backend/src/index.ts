import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import salaryRoutes from "./routes/salary.routes";
import companyRoutes from "./routes/company.routes";
import compareRoutes from "./routes/compare.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Health Check Route
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Compensation API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running 🚀",
  });
});

// Salary Routes
app.use("/api/salaries", salaryRoutes);
app.use("/api", salaryRoutes);

app.use(
  "/api/companies",
  companyRoutes
);

app.use(
  "/api/compare",
  compareRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

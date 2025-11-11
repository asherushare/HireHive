// import './config/instrument.js'
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/db.js'
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks } from './controllers/webhooks.js'
// import companyRoutes from './routes/companyRoutes.js'
// import connectCloudinary from './config/cloudinary.js'
// import jobRoutes from './routes/jobRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import { clerkMiddleware } from '@clerk/express'
// import { v2 as cloudinary } from "cloudinary";

// // Initialize Express
// const app = express()

// // Connect to database
// connectDB()
// await connectCloudinary()

// // Middlewares
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())

// // Routes
// app.get('/', (req, res) => res.send("API Working"))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
// app.post('/webhooks', clerkWebhooks)
// app.use('/api/company', companyRoutes)
// app.use('/api/jobs', jobRoutes)
// app.use('/api/users', userRoutes)

// // Port
// const PORT = process.env.PORT || 5000

// Sentry.setupExpressErrorHandler(app);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// })

import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

//initialize Express
const app = express();

// Connect to database and services
console.log("🚀 Starting server...");
console.log("📦 Environment:", process.env.NODE_ENV || "development");

// Initialize connections (will be reused in serverless)
let dbConnected = false;
let cloudinaryConnected = false;

const initializeConnections = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  if (!cloudinaryConnected) {
    await connectCloudinary();
    cloudinaryConnected = true;
  }
};

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow requests from frontend
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // Increase limit for file uploads
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Initialize connections on first request (serverless-friendly)
// This must be before routes so connections are ready when routes execute
app.use(async (req, res, next) => {
  try {
    await initializeConnections();
    next();
  } catch (error) {
    console.error("Connection initialization error:", error);
    res
      .status(500)
      .json({ success: false, message: "Service initialization failed" });
  }
});

// Public routes (no authentication required)
app.get("/", (req, res) => res.send("API is running..."));
app.get("debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Diagnostic endpoint to check configuration
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      mongodb: process.env.MONGODB_URI ? "configured" : "missing",
      cloudinary:
        (process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME) &&
        process.env.CLOUDINARY_API_KEY &&
        (process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_API_SECRET)
          ? "configured"
          : "missing",
      clerk: process.env.CLERK_SECRET_KEY ? "configured" : "missing",
      webhook: process.env.CLERK_WEBHOOK_SECRET ? "configured" : "missing",
    },
    environment: process.env.NODE_ENV || "development",
  });
});

// Webhook route - MUST be before clerkMiddleware
// Webhooks have their own authentication via CLERK_WEBHOOK_SECRET
app.post("/webhooks", clerkWebhooks);

// Public API routes (no authentication required)
// Jobs should be publicly accessible
app.use("/api/jobs", jobRoutes);
// Company registration and login are public
app.use("/api/company", companyRoutes);

// Clerk middleware - requires CLERK_SECRET_KEY environment variable
// This validates JWT tokens from Clerk for all routes below
// Only apply if CLERK_SECRET_KEY is set to avoid crashes
if (process.env.CLERK_SECRET_KEY) {
  console.log("✅ Clerk middleware configured");
  app.use(
    clerkMiddleware({
      secretKey: process.env.CLERK_SECRET_KEY,
    })
  );
} else {
  console.warn(
    "⚠️  WARNING: CLERK_SECRET_KEY is not set. User authentication will fail!"
  );
}

// Protected API routes (require Clerk authentication)
// User routes require authentication
app.use("/api/users", userRoutes);
// Some company routes are protected (already handled by protectCompany middleware in routes)

// Error handling - only setup if Sentry is properly initialized
try {
  if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
    console.log("✅ Sentry error handler configured");
  }
} catch (error) {
  console.warn("⚠️  Sentry error handler setup failed:", error.message);
}

// Export app for Vercel serverless (required - must be at top level)
export default app;

// For local development: start the server if not in Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    try {
      await initializeConnections();
      app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("❌ Server Startup Error:", error.message);
      process.exit(1);
    }
  };

  startServer();
}

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

// DO NOT IMPORT instrument.js — that was the crash
// import "./config/instrument.js";

// Initialize Express
const app = express();

// ✅ Correct CORS setup
app.use(
  cors({
    origin: [
      "https://hire-hive-client.vercel.app", // deployed frontend
      "http://localhost:5173", // Vite local dev
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Correct way to start server in Vercel (NO top-level await)
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Startup Error:", error.message);
  }
};

startServer();

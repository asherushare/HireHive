import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import clerkWebhooks from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


//initialize Express
const app = express();

// Connect to database and services
console.log('🚀 Starting server...');
console.log('📦 Environment:', process.env.NODE_ENV || 'development');

await connectDB();
await connectCloudinary();

console.log('✅ All services connected');



//Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow requests from frontend
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Increase limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Public routes (no authentication required)
app.get('/', (req, res) => res.send('API is running...'));
app.get("debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Diagnostic endpoint to check configuration
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
            mongodb: process.env.MONGODB_URI ? 'configured' : 'missing',
            cloudinary: (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY) ? 'configured' : 'missing',
            clerk: process.env.CLERK_SECRET_KEY ? 'configured' : 'missing',
            webhook: process.env.CLERK_WEBHOOK_SECRET ? 'configured' : 'missing'
        },
        environment: process.env.NODE_ENV || 'development'
    });
});

// Webhook route - MUST be before clerkMiddleware
// Webhooks have their own authentication via CLERK_WEBHOOK_SECRET
app.post('/webhooks', clerkWebhooks);

// Public API routes (no authentication required)
// Jobs should be publicly accessible
app.use('/api/jobs', jobRoutes)
// Company registration and login are public
app.use('/api/company', companyRoutes)

// Clerk middleware - requires CLERK_SECRET_KEY environment variable
// This validates JWT tokens from Clerk for all routes below
if (!process.env.CLERK_SECRET_KEY) {
  console.warn('⚠️  WARNING: CLERK_SECRET_KEY is not set. User authentication will fail!');
} else {
  console.log('✅ Clerk middleware configured');
}
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY
}));

// Protected API routes (require Clerk authentication)
// User routes require authentication
app.use('/api/users', userRoutes)
// Some company routes are protected (already handled by protectCompany middleware in routes)



//Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})




// Final commited has been done by patra
// config/instrument.js
import * as Sentry from "@sentry/node";

// Safe, minimal Sentry init for Vercel serverless (no profiling)
Sentry.init({
  dsn: process.env.SENTRY_DSN || "", // leave empty if you don't use Sentry DSN
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
  integrations: [
    Sentry.mongooseIntegration(), // works fine on serverless
  ],
  // Lower sample rate in prod to avoid noise/cost
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
});

// export so server.js can import this file early
export default Sentry;

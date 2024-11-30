import cors from "cors";
import express from "express";
// import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import logger from "./utils/logger/winston.logger";
import morganMiddleware from "./utils/logger/morgan.logger";
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
// app.set("io", io);

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  })
);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   keyGenerator: (req, res) => {
//     return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
//   },
//   handler: (_, __, ___, options) => {
//     throw new ApiError(
//       options.statusCode || 500,
//       `There are too many requests. You are only allowed ${
//         options.max
//       } requests per ${options.windowMs / 60000} minutes`
//     );
//   },
// });

// // Apply the rate limiting middleware to all requests
// app.use(limiter);
app.use(morganMiddleware);

// Routes imports
import { errorHandler } from "./middlewares/error.middleware";

import defaultRoute from "./routes/default.route.js";
import authRoute from "./routes/auth.route.js";

// ROUTES

app.use("/default", defaultRoute);
app.use("/api/v1/auth", authRoute);

const startServer = () => {
  app.listen(process.env.PORT || 8090, () => {
    logger.info("⚙️  Server is running on port: " + process.env.PORT);
  });
};

app.use(errorHandler as any);
startServer();

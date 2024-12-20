import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
// import { rateLimit } from "express-rate-limit";
// import requestIp from "request-ip";

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

// // pnpm add requestIp
// app.use(requestIp.mw());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
//   standardHeaders: true,
//   legacyHeaders: false,
//   keyGenerator: (req, res) => {
//     return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
//   },
//   handler: (_, __, ___, options) => {
//     throw new ApiError(
//       options.statusCode || 500,
//       `There are too many requests. You are only allowed ${
//         options.limit
//       } requests per ${options.windowMs / 60000} minutes`
//     );
//   },
// });

// app.use(limiter);
app.use(morganMiddleware);

// Routes imports
import { errorHandler } from "./middlewares/error.middleware";

import defaultRoute from "./routes/default.route.js";
import authRoute from "./routes/auth.route.js";
import transactionRoute from "./routes/transaction.route.js";
import goalRoute from "./routes/goal.route.js";
import investmentRoute from "./routes/investment.route.js";

// ROUTES

app.use("/default", defaultRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/goals", goalRoute);
app.use("/api/v1/investments", investmentRoute);

const startServer = () => {
  app.listen(process.env.PORT || 8090, () => {
    logger.info("⚙️  Server is running on port: " + process.env.PORT);
  });
};

app.use(errorHandler as any);
startServer();

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger/winston.logger.js";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {

    const statusCode =
      error.statusCode || 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  logger.error(`${error.message}`);

  // Send error response
  return res.status(error.statusCode).json(response);
};

export { errorHandler };

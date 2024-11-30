import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateSessionToken } from "../utils/authSession.js";

export const verifyCookie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.authSession as string

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      const validateToken = await validateSessionToken(token);

      if (!validateToken.session || !validateToken.user) {
        throw new ApiError(401, "Invalid access token");
      }

      req.user = validateToken.user;
      next();
    } catch (error) {
      throw new ApiError(401, "This is not a valid access token");
    }
  }
);


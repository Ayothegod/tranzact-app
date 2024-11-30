import { Request, Router, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../utils/client.js";
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  setSessionTokenCookie,
} from "../utils/authSession.js";
import { comparePassword, hashPassword } from "../utils/services.js";
import { ErrorEventEnum } from "../utils/constants.js";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const registerController = asyncHandler(async (req: Request, res: Response) => {
  const { email: userEmail, password, fullname: fullName } = req.body;

  // Validate body data
  // console.log(email, username, password, fullname);

  const existingUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.ALREADY_EXISTS,
          "User with this email already exists"
        )
      );
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: userEmail,
      password: hashedPassword,
      fullname: fullName,
    },
  });

  // Send mail

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  const { id, email, fullname } = user;

  // console.log(token, session);
  setSessionTokenCookie(res, token);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id, email, fullname },
        "User registered successfully"
      )
    );
});

const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email: userEmail, password } = req.body;

  // Validate body data
  // console.log(password, userName);

  // chcek for user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {},
  });

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.USER_NOT_FOUND,
          "User not found, please signup instead."
        )
      );
  }

  // Check password
  const passwordCheck = await comparePassword(
    password,
    user.password as string
  );
  if (!passwordCheck) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.INVALID_CREDENTIALS,
          "Invalid credentials!"
        )
      );
  }

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  const { id, email, fullname } = user;

  // console.log(token, session);
  setSessionTokenCookie(res, token);

  return res
    .status(200)
    .json(new ApiResponse(200, { id, email, fullname }, "Login successful!"));
});

const logoutController = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.authSession as string;
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const deletedSession = await prisma.session.delete({
    where: { id: sessionId },
  });

  if (!deletedSession) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.INVALID_TOKEN,
          "Unable to delete user session."
        )
      );
  }

  deleteSessionTokenCookie(res);

  return res.status(200).json(new ApiResponse(200, null, "Logout successful."));
});

const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {},
  });

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.USER_NOT_FOUND,
          "User not found, please check again."
        )
      );
  }

  const { id, email, fullname } = user;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id, email, fullname },
        "User profile returned successfully!"
      )
    );
});

export { registerController, loginController, userProfile, logoutController };

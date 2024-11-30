import type { User, Session } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      clientIp?: any
    }
  }
}
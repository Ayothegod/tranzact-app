import { log } from "console";

export const authMiddleware = async (c: any, next: any) => {
  try {
    const session = c.get("session");
    const authCookie = session.get("auth-cookie");
    // log(authCookie);
    if (!authCookie) {
      return c.json(
        { error: "Access Denied!", type: "NO-CCOKIE" },
        { status: 400 }
      );
    }
    await next();
  } catch (error) {
    log(error);
    return null;
  }
};

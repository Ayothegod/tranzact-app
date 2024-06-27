import { log } from "console";

export const authMiddleware = async (c: any, next: any) => {
  try {
    const session = c.get("session");
    const authCookie = session.get("auth-cookie");
    if (!authCookie) {
      return c.json({ msg: "Access Denied!" });
    }
    await next();
  } catch (error) {
    log(error);
    return null;
  }
};

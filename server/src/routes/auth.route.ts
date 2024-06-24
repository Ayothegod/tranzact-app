import { Hono } from "hono";
import { sessionMiddleware, CookieStore, Session } from "hono-sessions";
import { z } from "zod";
import { prisma } from "../lib/client";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

const authRoute = app
  .post("/login", async (c) => {
    // gotten user account from DB
    // const user = await prisma.user.findMany()
    const userId = "jhjhs7632ha7";

    // Create cookie for that session
    const session = c.get("session");
    session.set("auth-cookie", userId);

    return c.json({ msg: "User loggedin" }, { status: 200 });
  })
  .get("profile", async (c) => {
    const session = c.get("session");
    const authCookie = session.get("auth-cookie");
    console.log("cookie" + JSON.stringify(c.get("session")));
    const trial = "cookie" + JSON.stringify(c.get("session"))

    if (!authCookie) {
      return c.json({ msg: "Access Denied!" });
    }

    return c.json({ user: { name: "Ayomide", id: authCookie }, trial });
  })
  .delete("logout", async (c) => {
    const session = c.get("session");
    session.deleteSession();

    return c.json({ msg: "User logout successfully" });
  });

export default authRoute;

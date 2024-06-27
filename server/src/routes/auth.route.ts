import { Hono } from "hono";
import { sessionMiddleware, CookieStore, Session } from "hono-sessions";
import { z } from "zod";
import { prisma } from "../lib/client";
import { log } from "console";
import { loginUserSchema, userSchema } from "../lib/schema";
import { authMiddleware } from "../lib/middleware";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

const authRoute = app
  .post("/login", async (c) => {
    try {
      const data = await c.req.json();
      const parsedData = loginUserSchema.parse(data);

      // check if user exists using email
      const user = await prisma.user.findUnique({
        where: { email: parsedData.email },
      });
      if (!user) {
        return c.json({ error: "Wrong user credentials" });
      }

      // compare password password
      // NOTE: if true, next(), else wrong user credentials

      // Create cookie for that session
      const session = c.get("session");
      session.set("auth-cookie", user.id);
      // log(session);
      // log(session?.cache?._data);

      return c.json(
        {
          msg: "User loggedin successfully",
          id: user.id,
          username: user.username,
        },
        { status: 201 }
      );
    } catch (error) {
      log(error);

      if (error instanceof z.ZodError) {
        error.errors.map((error) => {
          log(error.message);
          //   TODO: how to catch errors from catch from the frontend
          //   throw new Error(error.message);
        });
        return c.json({ error: "invalid credentials" });
      }
      return c.json({ error: "try again later" });
    }
  })
  .post("/register", async (c) => {
    try {
      const data = await c.req.json();
      const parsedData = userSchema.parse(data);

      // check if email already exists
      const checkEmail = await prisma.user.findUnique({
        where: { email: parsedData.email },
      });
      if (checkEmail) {
        return c.json({ error: "Email already exists" });
      }

      // Hash password

      const newUser = await prisma.user.create({
        data: {
          email: parsedData.email,
          username: parsedData.username,
          name: parsedData.name,
          password: parsedData.password,
        },
      });

      return c.json(
        { msg: "User created successfully", id: newUser.id },
        { status: 201 }
      );
    } catch (error) {
      log(error);

      if (error instanceof z.ZodError) {
        error.errors.map((error) => {
          log(error.message);
          //   TODO: how to catch errors from catch from the frontend
          //   throw new Error(error.message);
        });
        return c.json({ error: "invalid credentials" });
      }
      return c.json({ error: "try again later" });
    }
  })
  .get("/get-user", authMiddleware, async (c) => {
    const session = c.get("session");
    const authCookie: any = session.get("auth-cookie");
    const trial = "cookie" + JSON.stringify(c.get("session"));
    // log(trial);
    // log(authCookie);

    // GET USER DETAILS
    const user = await prisma.user.findUnique({
      where: { id: authCookie },
    });
    return c.json({ user: user });
    // return c.json({});
  })
  .delete("logout", async (c) => {
    const session = c.get("session");
    session.deleteSession();

    return c.json({ msg: "User logout successfully" });
  });

export default authRoute;

// try {
//   // { name, email, username, password }
//   // const parsedData = userSchema.parse(data);
//   // log(parsedData)

//   // gotten user account from DB
//   // const user = await prisma.user.findMany()
//   const userId = "jhjhs7632ha7";

//   // Create cookie for that session
//   // const session = c.get("session");
//   // session.set("auth-cookie", userId);

//   return c.json({ msg: "User created successfully" }, { status: 200 });
// } catch (error) {
//   // log(error);

//   // if (error instanceof z.ZodError) {
//   //   error.errors.map((error) => {
//   //     log(error.message);
//   //     //   TODO: how to catch errors from catch from the frontend
//   //     //   throw new Error(error.message);
//   //     //   return c.json({ error: error });
//   //   });
//   // }
//   return c.json({ error: "try again later" });
// }

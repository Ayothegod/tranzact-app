import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/client";
import testRoute from "./routes/test.route";
import authRoute from "./routes/auth.route";
import { cors } from "hono/cors";
import { sessionMiddleware, CookieStore, Session } from "hono-sessions";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();
const store = new CookieStore();

app.use("*", cors());
app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: "password_at_least_32_characters_long", // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: "Lax", // Recommended for basic CSRF protection in modern browsers
      path: "/", // Required for this library to work properly
      httpOnly: true, // Recommended to avoid XSS attacks
    },
  })
);

app.get("/", (c) => {
  // const session = c.get("session");
  // if (session.get("counter")) {
  //   session.set("counter", (session.get("counter") as number) + 1);
  // } else {
  //   session.set("counter", 1);
  // }
  // return c.html(
  //   `<h1>You have visited this page ${session.get("counter")} times</h1>`
  // );
  
  return c.text("Hello Hono!");
});

app.route("/api", testRoute);
app.route("/api", authRoute);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

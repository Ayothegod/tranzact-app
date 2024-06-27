import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/client";
import testRoute from "./routes/test.route";
import authRoute from "./routes/auth.route";
import mainRoute from "./routes/main.route";
import { cors } from "hono/cors";
import { sessionMiddleware, CookieStore, Session } from "hono-sessions";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();
const store = new CookieStore();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: "password_at_least_32_characters_long", // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: "None",
      path: "/",
      httpOnly: false,
      // secure: true,
    },
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", testRoute);
app.route("/api/auth", authRoute);
app.route("/api", mainRoute);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

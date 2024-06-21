import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/client";
import testRoute from "./routes/test.route";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  console.log(users);
  return c.json(users);
});

app.route("/api", testRoute)

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

// git rm -r --cached node_modules
// git rm --cached .env

// USE VERCEL FROM THE COMMAND LINE
// npm install -g vercel
// vercel

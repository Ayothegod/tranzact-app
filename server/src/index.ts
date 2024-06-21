import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/client";
import testRoute from "./routes/test.route";
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', cors())

app.route("/api", testRoute)
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  console.log(users);
  return c.json(users);
});


const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

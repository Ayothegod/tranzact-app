// functions/api/[[route]].ts
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

const schema = z.object({
  id: z.string(),
  title: z.string(),
});

type Todo = z.infer<typeof schema>;

const todos: Todo[] = [{ id: "a32554afs6", title: "Hello doers" }];

const testRoute = app
  .get((c) => {
    return c.json({
      todos,
    });
  })
  .post("/todo", zValidator("form", schema), (c) => {
    const todo = c.req.valid("form");
    todos.push(todo);
    return c.json({
      message: "created!",
    });
  });

export default testRoute;
export type AppType = typeof testRoute;

// export const onRequest = handle(app, '/api')

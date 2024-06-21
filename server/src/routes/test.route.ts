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

const todos: Todo[] = [];

const testRoute = app
  .post("/todo", zValidator("json", schema), (c) => {
    const requestBody = c.req.json();
    console.log(requestBody);
    
    const todo = c.req.valid("json");
    todos.push(todo);
    return c.json({
      message: "created!",
    });
  })
  .get((c) => {
    return c.json({
      todos,
    });
  });

//   .get((c) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(c.json({ todos }));
//       }, 3000); // 2 seconds delay
//     });
//   });

export default testRoute;

// export type AppType = typeof testRoute;
// export const onRequest = handle(app, '/api')

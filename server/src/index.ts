import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// async function main() {
//   const users = await prisma.user.findMany()
//   console.log(users)
// }

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

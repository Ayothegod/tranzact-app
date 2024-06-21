import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Root() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <main className="flex items-center justify-center my-20 flex-col gap-4">
        <h1 className="text-4xl font-bold">Welcome to React.js and Hono.dev Starter!</h1>
        <p className="">
          Get started by editing <code className="">pages/index.js</code>
        </p>
        <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
      </main>
    </div>
  );
}
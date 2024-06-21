import { useState } from "react";

export default function Root() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <main className="">
        <h1 className="">Welcome to Next.js Starter!</h1>
        <p className="">
          Get started by editing <code className="">pages/index.js</code>
        </p>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      </main>
    </div>
  );
}
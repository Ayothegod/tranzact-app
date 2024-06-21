import { Button } from "@/components/ui/button";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LearnSwr() {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/todo",
    fetcher
  );

  const createTodo = async () => {
    const response = await axios.post("http://localhost:3000/api/todo", {
      id: "sdhhs6788",
      title: "Fetch Works",
    });
    console.log(response);

    mutate("http://localhost:3000/api/todo");
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      hello People
      <div>{JSON.stringify(data, null, 2)}</div>
      <div className="text-3xl font-bold">Create TODO</div>
      <Button onClick={createTodo}>Create User</Button>
    </div>
  );
}

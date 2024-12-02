/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { createTransaction, fetcher } from "@/lib/fetch";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";


export default function Test() {
  const [dataLoading, setDataLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/transaction`,
    fetcher,
    { errorRetryCount: 1 }
  );

  const createTodo = async () => {
    setDataLoading(!dataLoading);
    await createTransaction({
      type: "expense",
      amount: 2000,
      description: "type 3",
      categoryName: "null",
    });

    mutate(`${import.meta.env.VITE_SERVER_BASEURI}/transactions/transaction`);
    setDataLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <p>Click on the button below 👇</p>
      <div className="text-3xl font-bold">Create TODO</div>
      <Button disabled={dataLoading} onClick={createTodo}>
        Create User
      </Button>

      <div className="debug p-10">
        <p>Transactions data here</p>
        {error ? (
          "An error occured"
        ) : (
          <div>
            <p>{data?.data.length}</p>
            {/* <div>{JSON.stringify(data.data, null, 2)}</div> */}
            <ul>
              {data?.data.map((data: any) => (
                <li key={data.id}>
                  {data.description}:{" "}
                  <span className="text-red-600 font-medium"> {data.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

import { BASEURL, fetcher } from "@/lib/fetch";
import useSWR from "swr";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export default function RecentTransactions() {
  const {
    data: allTransactions,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = useSWR(`${BASEURL}/all-transactions?n=5`, fetcher);

  
  console.log(allTransactions);

  return (
    <div>
      <h1 className="font-medium text-xl">Recent Transactions</h1>
    </div>
  );
}

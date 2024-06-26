import { BASEURL, fetcher } from "@/lib/fetch";
import useSWR from "swr";
import { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  id: string;
  amount: string;
  transactionType: "INCOME" | "EXPENSE";
  createdAt: string;
  description: string | null;
  category: string;
  userId: string;
  updatedAt: string | null;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const Transactions: Transaction[] = [
  {
    id: "clxvusz3q0001e41p6vbjseyi",
    transactionType: "EXPENSE",
    description: null,
    amount: "400",
    category: "food",
    createdAt: "2024-06-26T13:10:54.902Z",
    updatedAt: "2024-06-26T13:10:54.902Z",
    userId: "clxvt6am30000g559ej2pc7ph",
  },
  {
    id: "clxvut2wd0003e41paf2nhqo1",
    transactionType: "EXPENSE",
    description: null,
    amount: "400",
    category: "food",
    createdAt: "2024-06-26T13:10:59.822Z",
    updatedAt: "2024-06-26T13:10:59.822Z",
    userId: "clxvt6am30000g559ej2pc7ph",
  },
  {
    id: "clxvut5e30005e41phu0x0bsk",
    transactionType: "EXPENSE",
    description: null,
    amount: "400",
    category: "food",
    createdAt: "2024-06-26T13:11:03.052Z",
    updatedAt: "2024-06-26T13:11:03.052Z",
    userId: "clxvt6am30000g559ej2pc7ph",
  },
  {
    id: "clxvuyett0001idpjg1leqjcc",
    transactionType: "INCOME",
    description: null,
    amount: "400",
    category: "food",
    createdAt: "2024-06-26T13:15:08.561Z",
    updatedAt: "2024-06-26T13:15:08.561Z",
    userId: "clxvt6am30000g559ej2pc7ph",
  },
  {
    id: "clxvuyfte0003idpj5lixvrbg",
    transactionType: "INCOME",
    description: null,
    amount: "400",
    category: "food",
    createdAt: "2024-06-26T13:15:09.842Z",
    updatedAt: "2024-06-26T13:15:09.842Z",
    userId: "clxvt6am30000g559ej2pc7ph",
  },
];

export default function RecentTransactions() {
  const {
    data: allTransactions,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = useSWR(`${BASEURL}/all-transactions?n=5`, fetcher);

  //   console.log(allTransactions);
  //   allTransactions.allTransactions.map((data) => {
  //     console.log(data.transactionType);
  // });
  return (
    <div>
      <h1 className="font-medium text-xl">Recent Transactions</h1>
    </div>
  );
}

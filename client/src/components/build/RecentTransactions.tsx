import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BASEURL, fetcher } from "@/lib/fetch";
import useSWR from "swr";
import { Transaction, Transactions } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const columns: ColumnDef<Transaction>[] = [
  {
    header: "S/N",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    id: "id",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }) => {
      const value: any = cell.getValue();
      return format(new Date(value), "dd MMM , yyyy");
    },
  },
];

export default function RecentTransactions() {
  // const {
  //   data: allTransactions,
  //   error: transactionsError,
  //   isLoading: transactionsLoading,
  // } = useSWR(`${BASEURL}/all-transactions?n=5`, fetcher);
  // console.log(allTransactions);

  // if (transactionsLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (transactionsError) {
  //   return <div>Error loading transactions</div>;
  // }

  // const data = allTransactions || [];

  return (
    <div>
      <h1 className="font-medium text-xl">Recent Transactions</h1>
      <div className="py-4">
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
              No transactions yet, click on add income to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetcher } from "@/lib/fetch";
import useSWR from "swr";
import { Transaction } from "@/lib/types/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import clsx from "clsx";
import { MoveRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div
          className={clsx(
            "text-center p-1 rounded-full font-semibold ",
            data.type === "income" && "bg-green-200 text-green-600",
            data.type === "expense" && "bg-red-200 text-red-600"
          )}
        >
          {data.type}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return <div className="w-32 truncate">{description}</div>;
    },
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
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/transaction?take=4`,
    fetcher,
    { errorRetryCount: 1 }
  );

  if (error) {
    return <div>Error loading transactions</div>;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl">Recent Transactions</h1>
        <div className="flex items-center gap-1 w-max cursor-pointer group text-neutral-500 hover:text-black">
          <p className="text-sm">See More</p>{" "}
          <MoveRight className="duration-200 group-hover:translate-x-2" />
        </div>
      </div>

      <div className="py-3">
        {isLoading ? (
          <Skeleton className="w-full h-64 rounded-md" />
        ) : (
          <DataTable columns={columns} data={data?.data || []} />
        )}
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

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BASEURL, axiosInstance, fetcher } from "@/lib/fetch";
import useSWR, { useSWRConfig } from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "../ui/use-toast";
import { Transaction } from "@/lib/types/api";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";

const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "S/N",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    id: "sn",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ cell, row }) => {
      const value: any = cell.getValue();
      const data = row.original;

      return (
        <Link to={`/transactions/${data.id}`}>
          <div className="w-28 truncate">{value}</div>
        </Link>
      );
    },
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
            "text-center p-2 rounded-full font-semibold ",
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const value: any = cell.getValue();
      return format(new Date(value), "dd MMM , yyyy");
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const { mutate } = useSWRConfig();
      const transaction = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to={`/transactions/${transaction.id}`}>
                  View Transaction details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const deleteResponse = await axiosInstance
                      .delete(`${BASEURL}/delete-transaction/${transaction.id}`)
                      .then((res) => res.data);

                    if (deleteResponse.error) {
                      toast({
                        variant: "destructive",
                        description: `Transaction already deleted or does not exist!`,
                      });
                      return null;
                    }
                    toast({
                      description: `transaction deleted successfully`,
                    });
                    return null;
                  } catch (error) {
                    console.log(error);
                    toast({
                      variant: "destructive",
                      description: `Try again later!`,
                    });
                    return null;
                  } finally {
                    mutate(`${BASEURL}/all-transactions?n=20`);
                  }
                }}
              >
                Delete Transaction
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

export default function DataTable() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/transaction`,
    fetcher,
    { errorRetryCount: 1 }
  );

  if (error) {
    return <div>Error loading transactions</div>;
  }

  return (
    <div className="">
      {isLoading ? (
        <div className="w-full border rounded-md h-96">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      ) : (
        <TableResult columns={columns} data={data?.data || []} />
      )}
    </div>
  );
}

function TableResult<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4">
        <Input
          placeholder="Search for descriptions..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: any) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
                You don't have transactions yet, add a transaction to get
                started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-row-reverse items-center p-4">
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}

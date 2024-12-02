/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import AddTransaction from "@/components/build/AddTransaction";
// import Logout from "@/components/build/Logout";
import RecentTransactions from "@/components/build/RecentTransactions";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher, formatAmount } from "@/lib/fetch";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Library,
  MoreVertical,
} from "lucide-react";
import { Suspense, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import useSWR from "swr";

export async function Loader() {
  return json(null);
}

export default function Dashboard() {
  // const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const {
    data,
    // error: balanceError,
    isLoading: balanceLoading,
  } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/balance`,
    fetcher,
    { errorRetryCount: 1 }
  );

  return (
    <div className="body py-2 flex gap-x-4 h-hero ">
      <div className="max-w-[30%] flex-grow flex-shrink-0 flex flex-col gap-1">
        {/* DONE: first row */}
        <div className="h-[30%] bg-white rounded-md p-3 shadow flex flex-col gap-y-2">
          <h3 className="font-bold">Highest tranzactions</h3>
          <div className="grid grid-cols-2 flex-grow gap-2">
            <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                income
              </span>
              <aside className="p-2 text-white bg-green-500 w-max rounded-full">
                <ArrowUpNarrowWide className="w-5 h-5" />
              </aside>
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <p className="font-bold text-xl">$5,200.00</p>
              </div>
            </div>

            <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                expense
              </span>
              <aside className="p-2 text-white bg-red-500 w-max rounded-full">
                <ArrowDownNarrowWide className="w-5 h-5" />
              </aside>
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <p className="font-bold text-xl">$5,200.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* DONE: second row */}
        <div className="h-[40%] bg-white rounded-md p-3 shadow flex flex-col gap-y-2">
          <h3 className="font-bold">Savings</h3>
          <div className="grid grid-cols-2 flex-grow gap-2">
            <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                income
              </span>
              <aside className="p-2 text-white bg-green-500 w-max rounded-full">
                <ArrowUpNarrowWide className="w-5 h-5" />
              </aside>
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <p className="font-bold text-xl">$5,200.00</p>
              </div>
            </div>

            {/* <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                expense
              </span>
              <aside className="p-2 text-white bg-red-500 w-max rounded-full">
                <ArrowDownNarrowWide className="w-5 h-5" />
              </aside>
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <p className="font-bold text-xl">$5,200.00</p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="h-[30%] bg-white shadow">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="w-full flex flex-col gap-2 mt-4"></div>
        </div>
      </div>

      {/* NOTE: second section */}
      <div className="flex-grow flex-shrink-0 ">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-purple-200 rounded-lg text-purple-600">
                  <Library />
                </div>
                <p className="font-medium">Total Balance</p>
              </div>
            </div>
            {balanceLoading ? (
              <Skeleton className="w-20 h-8 rounded-md" />
            ) : (
              <p className="text-2xl font-bold">
                ${formatAmount(data?.data.balance)}
              </p>
            )}
            <div className="flex justify-between items-center text-xs">
              <p className="text-neutral-500">from last month</p>
              <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                +50%
              </div>
            </div>
          </div>

          {/* TODO: change all their icons */}
          <div className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-200 rounded-lg text-green-600">
                  <Library />
                </div>
                <p className="font-medium">Total Income</p>
              </div>
            </div>
            <p className="text-2xl font-bold">
              {balanceLoading ? (
                <Skeleton className="w-20 h-8 rounded-md" />
              ) : (
                <p className="text-2xl font-bold">
                  ${formatAmount(data?.data.income)}
                </p>
              )}
            </p>
            <div className="flex justify-between items-center text-xs">
              <p className="text-neutral-500">from last month</p>
              <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                +50%
              </div>
            </div>
          </div>

          {/* TODO: change all their icons */}
          <div className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-200 rounded-lg text-red-600">
                  <Library />
                </div>
                <p className="font-medium">Total Expense</p>
              </div>
            </div>
            <p className="text-2xl font-bold">
              {balanceLoading ? (
                <Skeleton className="w-20 h-8 rounded-md" />
              ) : (
                <p className="text-2xl font-bold">
                  ${formatAmount(data?.data.expense)}
                </p>
              )}
            </p>
            <div className="flex justify-between items-center text-xs">
              <p className="text-neutral-500">from last month</p>
              <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                +50%
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 col-span-3">
            <RecentTransactions />
          </div>
        </div>
      </div>

      {/* {openModal && (
          <div>
            <AddTransaction setOpenModal={setOpenModal} openModal={openModal} />
          </div>
        )} */}
    </div>
  );
}

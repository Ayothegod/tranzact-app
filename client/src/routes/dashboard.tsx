/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import AddTransaction from "@/components/build/AddTransaction";
// import Logout from "@/components/build/Logout";
import RecentTransactions from "@/components/build/RecentTransactions";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import RenderPieChart from "@/components/utils/RenderPieChart";
import RenderProgress from "@/components/utils/RenderProgress";
import { fetcher, formatAmount, formatPercent } from "@/lib/fetch";
import { Goal } from "@/lib/types/api";
import { format } from "date-fns";
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

  const { data, isLoading: balanceLoading } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/balance`,
    fetcher,
    { errorRetryCount: 1 }
  );

  const { data: goalData, isLoading: goalsLoading } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/goals?take=3`,
    fetcher,
    { errorRetryCount: 1 }
  );
  // console.log(goalData?.data);

  return (
    <div className="body py-2 flex gap-x-4 min-h-hero">
     
      {/* NOTE: first section */}
      <div className="max-w-[30%] flex-grow flex-shrink-0 flex flex-col gap-2">
        {/* DONE: first row */}
        <div className="max-h-[60%] bg-white rounded-md p-3 shadow flex flex-col gap-y-2">
          <h3 className="font-bold">Highest transactions</h3>
          <div className="grid grid-cols-2 flex-grow gap-2 ">
            <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative flex flex-col gap-2">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                income
              </span>
              <aside className="p-2 text-white bg-green-500 w-max rounded-full">
                <ArrowUpNarrowWide className="w-5 h-5" />
              </aside>

              <div className="mt-auto">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <div>
                  {balanceLoading ? (
                    <Skeleton className="w-full h-6 rounded-md bg-white" />
                  ) : (
                    <p className="font-bold text-xl">
                      ${formatAmount(data?.data.incomeMax)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative flex flex-col gap-2">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                expense
              </span>
              <aside className="p-2 text-white bg-red-500 w-max rounded-full">
                <ArrowDownNarrowWide className="w-5 h-5" />
              </aside>

              <div className="mt-auto">
                <label className="text-xs font-medium text-neutral-500">
                  From 3 days ago
                </label>
                <div>
                  {balanceLoading ? (
                    <Skeleton className="w-full h-6 rounded-md bg-white" />
                  ) : (
                    <p className="font-bold text-xl">
                      ${formatAmount(data?.data.expenseMax)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DONE: second row */}
        <div className="flex-grow bg-white rounded-md p-3 shadow flex flex-col gap-y-2">
          <h3 className="font-bold">Savings</h3>

          {goalsLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 border rounded-md flex flex-col justify-between p-3"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-32 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 flex-grow">
              {goalData?.data.map((goal: Goal) => (
                <div
                  key={goal.id}
                  className="bg-light-bg rounded-md border border-neutral-100 p-2 relative flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <aside className="p-2 text-white bg-green-500 w-max rounded-full">
                      <ArrowUpNarrowWide className="w-4 h-4" />
                    </aside>
                    <div className="relative">
                      <p className="font-bold text-sm leading-3">
                        ${formatAmount(goal.currentAmount)}
                      </p>
                      <label className="text-xs font-medium text-neutral-500 ">
                        {goal.name}
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <aside className="flex items-center justify-between text-xs font-medium">
                      <p className="text-neutral-500">
                        Target: ${goal.targetAmount}
                      </p>
                      <span className="text-black">
                        {formatPercent(goal.currentAmount, goal.targetAmount)}%
                      </span>
                    </aside>
                    <RenderProgress
                      className="h-2.5 bg-special/20"
                      currentProgress={goal.currentAmount}
                      max={goal.targetAmount}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="h-[40%] bg-white rounded-md p-3 shadow flex flex-col flex-grow">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="w-full flex-grow ">
            <RenderPieChart
              expense={data?.data.expense}
              income={data?.data.income}
              categories={data?.data.categories}
            />
          </div>
        </div> */}
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
            <div className="text-2xl font-bold">
              {balanceLoading ? (
                <Skeleton className="w-20 h-8 rounded-md" />
              ) : (
                <p className="text-2xl font-bold">
                  ${formatAmount(data?.data.income)}
                </p>
              )}
            </div>
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
            <div className="text-2xl font-bold">
              {balanceLoading ? (
                <Skeleton className="w-20 h-8 rounded-md" />
              ) : (
                <p className="text-2xl font-bold">
                  ${formatAmount(data?.data.expense)}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center text-xs">
              <p className="text-neutral-500">from last month</p>
              <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                +50%
              </div>
            </div>
          </div>

          <div className="bg-white shadow h-full rounded-lg p-4 col-span-3">
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

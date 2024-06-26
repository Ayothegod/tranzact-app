import RecentTransactions from "@/components/build/RecentTransactions";
import { BASEURL, fetcher } from "@/lib/fetch";
import { Library, MoreVertical } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";

export default function Dashboard() {
  const { mutate } = useSWRConfig();
  const {
    data: totalIncome,
    error: incomeError,
    isLoading: incomeLoading,
  } = useSWR(`${BASEURL}/total-income`, fetcher);

  const {
    data: totalExpense,
    error: expenseError,
    isLoading: expenseLoading,
  } = useSWR(`${BASEURL}/total-expense`, fetcher);

  // console.log(totalIncome, totalExpense);

  return (
    <div className="">
      {/* <p>Dashboard</p> */}
      <div className="flex gap-4">
        <div className="w-[80%]">
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-200 rounded-lg text-purple-600">
                    <Library />
                  </div>
                  <p className="font-medium">Total Balance</p>
                </div>
                <MoreVertical className="cursor-pointer h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">
                ${totalIncome?.total.amount - totalExpense?.total.amount}
              </p>
              <div className="flex justify-between items-center text-xs">
                <p className="text-neutral-500">from last month</p>
                <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                  +50%
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-200 rounded-lg text-green-600">
                    {/* TODO: change all their icons */}
                    <Library />
                  </div>
                  <p className="font-medium">Total Income</p>
                </div>
                <MoreVertical className="cursor-pointer h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">
                {incomeError && (
                  <p className="text-sm">Error, cannot fetch data</p>
                )}
                {incomeLoading ? "Loading" : totalIncome?.total.amount}
              </p>
              <div className="flex justify-between items-center text-xs">
                <p className="text-neutral-500">from last month</p>
                <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                  +50%
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-200 rounded-lg text-red-600">
                    {/* TODO: change all their icons */}
                    <Library />
                  </div>
                  <p className="font-medium">Total Expense</p>
                </div>
                <MoreVertical className="cursor-pointer h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">
                ${totalExpense?.total.amount}
              </p>
              <div className="flex justify-between items-center text-xs">
                <p className="text-neutral-500">from last month</p>
                <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                  +50%
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 col-span-2">
              {/* <RecentTransactions/> */}
            </div>

            <div className="bg-white shadow rounded-lg p-4">Item 2</div>
          </div>
        </div>
        {/* <div className=" flex-grow debug"></div> */}
      </div>
    </div>
  );
}

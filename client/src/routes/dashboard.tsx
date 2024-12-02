/* eslint-disable @typescript-eslint/no-unused-vars */
// import AddTransaction from "@/components/build/AddTransaction";
// import Logout from "@/components/build/Logout";
import RecentTransactions from "@/components/build/RecentTransactions";
import { Button } from "@/components/ui/button";
import { Library, MoreVertical } from "lucide-react";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
// import useSWR, { useSWRConfig } from "swr";

export async function Loader() {
  // const session = Cookies.get("session");
  // if (!session) {
  //   return redirect("/login");
  // }
  return json(null);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  // const { mutate } = useSWRConfig();
  // const {
  //   data: totalIncome,
  //   error: incomeError,
  //   isLoading: incomeLoading,
  // } = useSWR(`${BASEURL}/total-income`, fetcher);

  // const {
  //   data: totalExpense,
  //   error: expenseError,
  //   isLoading: expenseLoading,
  // } = useSWR(`${BASEURL}/total-expense`, fetcher);

  // useEffect(() => {
  //   if (expenseError) {
  //     Cookies.remove("session");
  //     console.log("ExpenseError");

  //     // navigate("/login");
  //   }
  // }, [expenseError, navigate]);

  return (
    <div className="body py-2 flex gap-x-4 h-hero ">
      <div className="max-w-[30%] flex-grow flex-shrink-0 flex flex-col gap-1">
        <div className="h-[25%] bg-white flex-grow rounded p-2">
          <h3 className="font-bold">Highest tranzactions</h3>
          <div className="grid grid-cols-2">
<div className="bg-neutral-100">
  Hello
</div>
          </div>
        </div>

        <div className="h-[25%] bg-white flex-grow">
          <h3 className="font-bold">Quick Acxtions</h3>
          <div className="w-full flex flex-col gap-2 mt-4"></div>
        </div>

        <div className="h-[50%] bg-white flex-grow flex-shrink-0">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="w-full flex flex-col gap-2 mt-4"></div>
        </div>
      </div>

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
              <MoreVertical className="cursor-pointer h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">
              {/* ${totalIncome?.total.amount - totalExpense?.total.amount} */}
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
                <div className="p-1 bg-green-200 rounded-lg text-green-600">
                  <Library />
                </div>
                <p className="font-medium">Total Income</p>
              </div>
              <MoreVertical className="cursor-pointer h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">
              {/* {incomeError && (
                  <p className="text-sm">Error, cannot fetch data</p>
                )} */}
              {/* {incomeLoading ? "Loading" : totalIncome?.total.amount} */}
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
              <MoreVertical className="cursor-pointer h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">
              {/* ${totalExpense?.total.amount} */}
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

          {/* <div className"bg-white shadow rounded-lg p-4">Item 2</div> */}
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

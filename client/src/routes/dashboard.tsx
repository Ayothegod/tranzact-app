import AddTransaction from "@/components/build/AddTransaction";
import Logout from "@/components/build/Logout";
import RecentTransactions from "@/components/build/RecentTransactions";
import { Button } from "@/components/ui/button";
import { BASEURL, fetcher } from "@/lib/fetch";
import { useAuthStore } from "@/lib/store/userStore";
import Cookies from "js-cookie";
import { Library, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { json, redirect, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

export async function Loader() {
  // const session = Cookies.get("session");
  // if (!session) {
  //   return redirect("/login");
  // }
  return json(null);
}

export default function Dashboard() {
  const { userData, setUserData, setIsUser }: any = useAuthStore();
  console.log("DASHBOARD");

  const trial = () => {
    console.log("USER");
    setIsUser()
  }

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
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (expenseError) {
      Cookies.remove("session");
      console.log("ExpenseError");
      
      // navigate("/login");
    }
  }, [expenseError, navigate]);

  return (
    <div className="">
      <div className="flex gap-4 px-4 pb-10">
        <div className="w-[80%] flex-shrink-0 ">
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
                ${totalExpense?.total.amount}
              </p>
              <div className="flex justify-between items-center text-xs">
                <p className="text-neutral-500">from last month</p>
                <div className="bg-green-200 p-1 rounded-lg text-[10px] text-green-600">
                  +50%
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 col-span-3">
              <RecentTransactions/>
            </div>

            {/* <div className"bg-white shadow rounded-lg p-4">Item 2</div> */}
          </div>
        </div>

        <div className=" flex-grow">
          <div className="box p-2 ">
            <h3 className="font-bold text-center">Quick Actions</h3>
            <div className="w-full flex flex-col gap-2 mt-4">
              <Button
                variant="green"
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                Add Income
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpenModal(!openModal)}
              >
                Add Expense
              </Button>
              <Button
                onClick={trial}
              >
                trial
              </Button>

              {/* <Logout/> */}
            </div>
          </div>
        </div>

        {openModal && (
          <div>
            <AddTransaction setOpenModal={setOpenModal} openModal={openModal} />
          </div>
        )}

      </div>
    </div>
  );
}

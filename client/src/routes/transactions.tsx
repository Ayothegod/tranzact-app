import DataTable from "@/components/build/DataTable";
import CategoryPieChart from "@/components/pages/transaction/CategoryPieChart";
import { CategoryPieChart2 } from "@/components/pages/transaction/CategoryPieChart2";
import TypePieChart from "@/components/pages/transaction/TypePieChart";
import { json } from "react-router-dom";

export async function Loader() {
  return json(null);
}

export default function Transactions() {
  return (
    <div className="body py-2 flex flex-col md:flex-row gap-x-4 min-h-hero gap-y-4">
      <div className="md:max-w-[30%] w-full flex-grow flex-shrink-0 flex flex-col gap-2">
        <div className="min-h-[20%] bg-white rounded-md p-3 shadow">
          <TypePieChart />
        </div>

        <div className="min-h-[20%] bg-white rounded-md p-3 shadow">
          {/* <CategoryPieChart /> */}
          <CategoryPieChart2/>
        </div>
      </div>

      <div className="flex-grow w-full md:w-[70%] flex-shrink-0 overflow-hidden">
        <div className="bg-white p-4 rounded-md shadow w-full">
          <h1 className="text-xl font-bold mb-2">My Transactions</h1>
          <DataTable />
        </div>
      </div>
    </div>
  );
}

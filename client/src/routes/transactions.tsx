import DataTable from "@/components/build/DataTable";
import { json } from "react-router-dom";

export async function Loader() {
  return json(null);
}

export default function Transactions() {
  return (
    <div className="mx-auto mt-4 pb-16 min-h-screen px-4">
      <h1 className="text-xl font-bold">My Transactions</h1>
      <div className="bg-white p-4 rounded-lg mt-2">
        <DataTable/>
      </div>
    </div>
  );
}

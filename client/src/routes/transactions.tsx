import DataTable from "@/components/build/DataTable";
import Cookies from "js-cookie";
import { json, redirect } from "react-router-dom";

export async function Loader() {
  const session = Cookies.get("session");
  if (!session) {
    return redirect("/login");
  }
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

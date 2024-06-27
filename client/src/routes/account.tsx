import { accountSidebar } from "@/lib/data";
import { BASEURL, fetcher } from "@/lib/fetch";
import Cookies from "js-cookie";
import { Link, json, redirect, useLocation } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

export async function Loader() {
  const session = Cookies.get("session");
  if (!session) {
    return redirect("/login");
  }
  return json(null);
}

export default function Account() {
  const loaction = useLocation();
  const path = location.pathname;

  const { mutate } = useSWRConfig();
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`${BASEURL}/auth/get-user`, fetcher);
  console.log(userData);

  return (
    <div className="max-w-5xl mx-auto mt-4 min-h-screen">
      <h1 className="text-xl font-bold">My Account</h1>

      <div className="bg-white p-4 rounded-lg mt-2">
        <h3 className="ml-56">Account</h3>
        <div className=" flex gap-2">
          {/* SIDEBAR */}
          <div className="w-52 flex-shrink-0">
            <ul>
              {accountSidebar.map((data) => (
                <Link to={data.url} key={data.id}>
                  <li
                    className={`py-2 px-2 rounded-lg hover:bg-neutral-100 ${path === data.url && "bg-neutral-200 hover:bg-neutral-200"}`}
                  >
                    {data.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* MAIN */}
          <div className="flex-grow">
            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-neutral-300 rounded-full"></div>
                <div>
                  <h4></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { accountSidebar } from "@/lib/data";
import Cookies from "js-cookie";
import { Link, json, redirect, useLocation } from "react-router-dom";

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
  // console.log(path);

  return (
    <div className="max-w-5xl mx-auto mt-4 min-h-screen">
      <h1 className="text-xl font-bold">My Account</h1>

      <div className="bg-white p-4 rounded-lg mt-2">
        <h3 className="ml-56">Account</h3>
        <div className=" flex gap-2">
          {/* SIDEBAR */}
          <div className="w-52">
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
          <div>
            <p>Hello</p>
          </div>
        </div>
      </div>
    </div>
  );
}

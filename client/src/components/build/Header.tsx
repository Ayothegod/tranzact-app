import { useAuthStore } from "@/lib/store/userStore";
import logo from "@/assets/tranzact.svg";
import { userNav } from "@/lib/data";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Bell } from "lucide-react";

export function Header() {
  const { isUser } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex items-center justify-between gap-8 px-4 py-2">
      <div className="bg-white flex items-center gap-1 py-2 px-4 rounded-full">
        <img src={logo} alt="logo" className="h-5 w-5" />
        <h1 className="font-bold ">Tranzact</h1>
      </div>

      <div>
        {!isUser ? (
          <ul className="bg-white py-2 px-8 rounded-full flex gap-8">
            {userNav.map((data) => {
              return (
                <Link
                  key={data.id}
                  to={data.url}
                  className={`text-neutral-500 hover:border-b ${path === data.url && "text-neutral-900 font-medium"}`}
                >
                  <li>{data.title}</li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <p>Login</p>
        )}
      </div>

      <div className="bg-white py-2 px-4 rounded-full flex items-center gap-2">
        <div>
          <Input className="h-8 rounded-full" placeholder="Search here" />
        </div>
        <div className="border rounded-full p-1">
          <Bell className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

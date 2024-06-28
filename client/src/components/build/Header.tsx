import { useAuthStore } from "@/lib/store/userStore";
import logo from "@/assets/tranzact.svg";
import { userNav } from "@/lib/data";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  const { isUser } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className=" sticky top-0 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-8 py-2 max-w-7xl mx-auto px-4">
        <div className="bg-white h-12 flex items-center gap-1 py-2 px-4 rounded-full">
          <img src={logo} alt="logo" className="h-5 w-5" />
          <h1 className="font-bold ">Tranzact</h1>
        </div>

        <div>
          {!isUser ? (
            <ul className="bg-white px-2 rounded-full flex h-12 gap-1 items-center">
              {userNav.map((data) => {
                return (
                  <Link
                    key={data.id}
                    to={data.url}
                    className={`text-neutral-500 border px-8 py-1 rounded-full hover:bg-blue-200 ${path === data.url && "font-medium bg-blue-500 text-white hover:bg-blue-500"}`}
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

        <div className="bg-white py-2 px-4 rounded-full flex items-center gap-2 h-12">
          <div>
            <Input className="h-8 rounded-full" placeholder="Search here" />
          </div>
          <div className="border rounded-full p-1">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={logo} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

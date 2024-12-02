import logo from "@/assets/tranzact.svg";
import { userNav } from "@/lib/data";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/lib/store/userStore";
import Logo from "../pages/root/Logo";

export function Header() {
  const { user } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className=" sticky top-0 backdrop-blur-3xl bg-[rgba(0,0,0,.1)] z-50">
      <div className="flex items-center justify-between gap-8 body h-14 ">
        <div className="bg-white h-10 w-10 debug flex items-center justify-center gap-1 rounded-full">
          <Logo size="base" />
        </div>

        <div>
          {user ? (
            <ul className="bg-white p-1 rounded-full flex h-10 gap-2 items-center shadow">
              {userNav.map((data) => {
                return (
                  <Link
                    key={data.title}
                    to={data.url}
                    className={`text-neutral-500 border px-4 h-full rounded-full hover:bg-special/20 text-sm flex items-center justify-center gap-2
                      ${path === data.url && "font-medium bg-special text-white hover:bg-special"}`}
                  >
                    <data.icon className="h-4 w-4" />
                    <li>{data.title}</li>
                  </Link>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="rounded-full flex items-center gap-1 h-10">
          <div className="border rounded-full bg-white p-2 cursor-pointer">
            <Search className="h-5 w-5" />
          </div>

          <div className="border rounded-full bg-white p-2 cursor-pointer">
            <Bell className="h-5 w-5" />
          </div>

          <Avatar className="h-8 w-8 debug cursor-pointer bg-white">
            <AvatarImage src={logo} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

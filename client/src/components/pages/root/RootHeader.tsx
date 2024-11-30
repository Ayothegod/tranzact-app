import { rootHeaderNav } from "@/lib/data";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function RootHeader() {
  return (
    <div className="bg-red-40">
      <div className="body h-16 flex items-center justify-between">
        <Logo />

        <ul className="h-full flex gap-8 items-center">
          {rootHeaderNav.map((link) => (
            <Link
              to={link.url}
              key={link.title}
              className={`h-full flex items-center text-white hover:border-b`}
            >
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>

        <Button size={"sm"} className="px-8 text-black bg-teal-700">
          DOWNLOAD
        </Button>
      </div>
    </div>
  );
}

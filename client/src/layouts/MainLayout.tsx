// import TopBar from "@/components/layout/TopBar";
import { Header } from "@/components/build/Header";
import { Button } from "@/components/ui/button";
// import { sidebarData } from "@/lib/data";
// import * as Icons from "lucide-react";
// import { LinkIcon } from "lucide-react";
import { Link, Outlet, useLocation, useRouteError } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bg-neutral-200 min-h-screen">
      {/* old layout */}
      <div>
        {/* <section className="mx-auto flex debug">
        <div className="hidden md:flex md:w-[280px] flex-shrink-0">
        <div className="w-full h-screen py-4 space-y-4 sticky top-0">
        <div className="flex items-center gap-4 text-2xl font-bold">
        <LinkIcon className="w-6 h-6" />
        <span>Project Name + Logo</span>
        </div>

            <ul className="flex flex-col gap-1">
              {sidebarData.map((data) => {
                const IconComponent: any =
                  Icons[data.iconType as keyof typeof Icons];
                return (
                  <Link
                  to={data.url}
                  key={data.id}
                  className={`flex items-center gap-4 p-2 rounded-md text-neutral-500 hover:bg-neutral-100 ${
                    data.url === path && "bg-neutral-100 text-black"
                    }`}
                    >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <li>{data.title}</li>
                    </Link>
                    );
                    })}
                    </ul>
                    </div>
                    </div>
                    
                    <div className="w-full flex-grow sticky top-0">
                    <TopBar/>
                    <header className="bg-gray-900 text-white p-4 sticky top-0 z-10">
                    <h1>Header</h1>
                    </header>
                    <Outlet />
                    </div>
                    
                    <div className="hidden md:">Sidebar</div>
                    </section> */}
      </div>
      <Header />
      <div className=" max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export function MainLayoutError() {
  let error = useRouteError();
  console.error(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find this page.</p>

        <Link to="/">
          <Button className="mt-6">Return to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

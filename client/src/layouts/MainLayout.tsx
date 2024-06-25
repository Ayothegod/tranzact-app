// import TopBar from "@/components/layout/TopBar";
import { Header } from "@/components/build/Header";
// import { sidebarData } from "@/lib/data";
// import * as Icons from "lucide-react";
// import { LinkIcon } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className=" max-w-7xl mx-auto">
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
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

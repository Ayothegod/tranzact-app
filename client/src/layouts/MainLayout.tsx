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
      <Header />
      <div className=" max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

// export function MainLayoutError() {
//   let error = useRouteError();
//   console.error(error);
//   return (
//     <div className="grid h-screen place-content-center bg-white px-4">
//       <div className="text-center">
//         <h1 className="text-9xl font-black text-gray-200">404</h1>

//         <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Uh-oh!
//         </p>

//         <p className="mt-4 text-gray-500">We can't find this page.</p>

//         <Link to="/">
//           <Button className="mt-6">Return to dashboard</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

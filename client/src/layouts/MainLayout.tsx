import { Header } from "@/components/build/Header";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {

  return (
    <div className="bg-light-bg min-h-screen">
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

// #f2f2f2
// #ebebeb
// #e4e4e4
// #dcdcdc
// #d5d5d5
// #cecece
// #c7c7c7
// #c0c0c0
// #b9b9b9
// #b2b2b2

export function MainLayoutError() {
  // const error = useRouteError();
  // console.error(error);

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

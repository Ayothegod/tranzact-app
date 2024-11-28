/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuthStore } from "@/lib/store/userStore";

export default function Root() {

  return (
    <>
      <Helmet>
        <title>Tranzact - Homepage</title>
        <meta name="description" content="This is the home page description" />
      </Helmet>

      <div>
whatsapp
      </div>
    </>
  );
}

export async function Loader() {
  return null;
}

export function RootError() {
  const { isUser }: any = useAuthStore();
  const error = useRouteError();
  console.error(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find this page.</p>

        <Link to={isUser ? "/dashboard" : "/"}>
          <Button className="mt-6">{isUser ? "Return to dashboard" : "Go Back Home"}</Button>
        </Link>
      </div>
    </div>
  );
}

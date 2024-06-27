import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { accountSidebar } from "@/lib/data";
import { BASEURL, fetcher } from "@/lib/fetch";
import axios from "axios";
import Cookies from "js-cookie";
import { Pen } from "lucide-react";
import { Link, json, redirect, useLocation } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

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

  // const { mutate } = useSWRConfig();
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`${BASEURL}/auth/get-user`, fetcher);
  console.log(userData);

  return (
    <div className="mx-auto mt-4 pb-16 min-h-screen">
      <h1 className="text-xl font-bold">My Account</h1>

      <div className="bg-white p-4 rounded-lg mt-2">
        <h3 className="ml-64">Account</h3>
        <div className=" flex gap-2">
          {/* SIDEBAR */}
          <div className="w-64 flex-shrink-0">
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
          <div className="flex-grow space-y-4">
            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-neutral-300 rounded-full"></div>

                <div>
                  {userLoading ? (
                    <Skeleton className="h-6 w-[200px]" />
                  ) : userError ? (
                    <p>User Error</p>
                  ) : (
                    <h4 className="text-black font-medium">
                      {userData?.user?.name}
                    </h4>
                  )}
                  <p className="text-xs italic">short bio goes here.</p>
                </div>
              </div>
            </div>

            {/* second row */}
            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-black font-medium">Personal Information</h4>

                <div className="border group hover:border-blue-600 transition-all p-1 cursor-pointer rounded-sm text-xs flex items-center gap-1 text-blue-500">
                  <Pen className="h-4 w-4" />
                  <p>Edit</p>
                </div>
              </div>

              <div className="flex items-center gap-24">
                {/* TODO: just use a giant tenary if data, all this else, error fetching data */}

                <div className="mt-2 space-y-2">
                  <div>
                    <Label className="text-xs text-neutral-500">Username</Label>
                    <p>{userData?.user.username}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-500">
                      Full Name
                    </Label>
                    <p>{userData?.user.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-500">
                      Email Address
                    </Label>
                    <p>{userData?.user.email}</p>
                  </div>
                </div>

                <div className="mt-2 space-y-2">
                  <div>
                    <Label className="text-xs text-neutral-500">Bio</Label>
                    <p className="text-sm italic">No bio yet</p>
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-500">
                      Phone Number
                    </Label>
                    <p className="text-sm italic">No phone number yet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third row */}
            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-black font-medium">Address Information</h4>

                <div className="border group hover:border-blue-600 transition-all p-1 cursor-pointer rounded-sm text-xs flex items-center gap-1 text-blue-500">
                  <Pen className="h-4 w-4" />
                  <p className="">Edit</p>
                </div>
              </div>

              <div className="p-8 mt-2 flex flex-col items-center justify-center">
                <p className="text-sm italic">
                  No address info yet, click the button to edit
                </p>
                <Button variant="blue" className="mt-2">Add Address</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { accountSidebar } from "@/lib/data";
import { BASEURL, fetcher } from "@/lib/fetch";
import { useAuthStore } from "@/lib/store/userStore";
import axios from "axios";
import Cookies from "js-cookie";
import { Pen } from "lucide-react";
import { useEffect } from "react";
import {
  Link,
  json,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

export async function Loader() {
  const session = Cookies.get("session");
  if (!session) {
    return redirect("/login");
  }
  return json(null);
}

export default function Account() {
  const { userData, isUser }: any = useAuthStore();
  console.log("Account");

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (!isUser) {
      Cookies.remove("session");
      navigate("/login");
      toast({
        variant: "destructive",
        description: `No user data, login again!`,
      });
    }
  }, [isUser]);

  // TODO: once we update data, create a new user object and save using the updated data

  return (
    <div className="mx-auto mt-4 pb-16 min-h-screen">
      <h1 className="text-xl font-bold">My Account</h1>

      <div className="bg-white p-4 rounded-lg mt-2">
        <h3 className="ml-64 cursor-pointer">Account</h3>
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

          <div className="flex-grow space-y-4">
            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-neutral-300 rounded-full"></div>

                <div>
                  <h4 className="text-black font-medium">{userData?.name}</h4>
                  <p className="text-xs italic">short bio goes here.</p>
                </div>
              </div>
            </div>

            <div className="border py-2 px-4 w-full rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-black font-medium">Personal Information</h4>

                <div className="border group hover:border-blue-600 transition-all p-1 cursor-pointer rounded-sm text-xs flex items-center gap-1 text-blue-500">
                  <Pen className="h-4 w-4" />
                  <p>Edit</p>
                </div>
              </div>

              <div className="flex items-center gap-24">
                <p>comment removed from here</p>

                <div className="mt-2 space-y-2">
                  <div>
                    <Label className="text-xs text-neutral-500">Username</Label>
                    <p>{userData?.username}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-500">
                      Full Name
                    </Label>
                    <p>{userData?.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-500">
                      Email Address
                    </Label>
                    <p>{userData?.email}</p>
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
                <Button variant="blue" className="mt-2">
                  Add Address
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* TODO: just use a giant tenary if data, all this else, error fetching data */
}

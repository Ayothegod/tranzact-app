import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useProcessStore } from "@/lib/store/stateStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, json, redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import asset from "@/assets/asset.jpg";
import { loginUserSchema } from "@/lib/schema";
import { BASEURL, axiosInstance } from "@/lib/fetch";
import { useAuthStore } from "@/lib/store/userStore";
import logo from "@/assets/tranzact.svg";
import Logo from "@/components/build/Logo";

type LoginSchemaType = z.infer<typeof loginUserSchema>;

export async function Loader() {
  const session = Cookies.get("session");
  if (session) {
    return redirect("/dashboard");
  }
  return json(null);
}

export default function Login() {
  console.log("LOGIN");

  const { toast } = useToast();
  const navigate = useNavigate();
  const { process, setProcess } = useProcessStore();
  const { userData, setUserData, setIsUser }: any = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginUserSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    setProcess();
    try {
      const response = await axiosInstance.post(`${BASEURL}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data.error) {
        toast({
          variant: "destructive",
          description: `Wrong user credentials!`,
        });
        return null;
      }

      // TODO: replace with real profile data
      const getProfile = await axiosInstance
        .get(`${BASEURL}/auth/get-user`)
        .then((res) => res.data);
      setUserData(getProfile.user);
      setIsUser();
      toast({
        description: `Welcome back, ${response.data?.username}`,
      });
      return navigate("/dashboard");
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        toast({
          variant: "destructive",
          description: `Invalid credentials, try again!`,
        });
        return null;
      } else if (error.request) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return null;
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong, try again later!",
        });
        return null;
      }
    } finally {
      setProcess();
    }
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center">
        <div className="h-full w-full px-2 py-4 sm:w-1/2">
          <div className="mx-auto flex max-w-[448px] flex-col justify-center px-2">
            <div className="mb-16">
              <Logo logo={logo} className="" text={true} />
            </div>

            <h1 className="text-2xl font-medium">Welcome back!</h1>
            <Label className="text-neutral-500">Continue your journey</Label>

            <form
              method="post"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 flex flex-col gap-y-4"
            >
              <div>
                <Label className="text-xs">Email Address</Label>
                <Input
                  type="text"
                  {...register("email")}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <Label className="text-xs text-red-500">
                    {errors.email?.message}
                  </Label>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password..."
                />
                {errors.password && (
                  <div className="text-xs text-red-500">
                    {errors.password?.message}
                  </div>
                )}
                <p className="mt-2 text-right text-sm font-medium text-purple-600">
                  Forgot password?
                </p>
              </div>

              <Button
                type="submit"
                className="mt-4"
                name="intent"
                value="login"
              >
                {process ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>

              <p className="flex items-center gap-2 text-center text-sm font-medium text-neutral-500">
                Don't have an account?{" "}
                <Link to="/register" className="underline-offset-1">
                  <span className="text-purple-600">Sign up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

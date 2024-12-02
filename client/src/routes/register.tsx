/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { json, Link, useNavigate, useRouteError } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/fetch";
import { registerSchema } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import logo from "@/assets/tranzact.svg";
import Logo from "@/components/build/Logo";
import { useAuthStore } from "@/lib/store/userStore";
import { useState } from "react";

type RegisterSchemaType = z.infer<typeof registerSchema>;

export async function Loader() {
  return json(null);
}

export default function Register() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(!loading);

    try {
      const response = await axiosInstance.post(`/auth/register`, {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
      });
      setUser(response.data.data);

      toast({
        title: `${response.data ? response.data.message : "Success"}`,
        description: `welcome to Tranzact, ${data.fullname}`,
      });

      return navigate("/dashboard");
    } catch (error: any) {

      if (error.request) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: `${error.response.data.message}`,
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
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-full w-full px-2 py-4 sm:w-1/2">
          <div className="mx-auto flex max-w-[448px] flex-col justify-center px-2">
            <div className="mb-8">
              <Logo logo={logo} className="" text={true} />
            </div>

            <h1 className="text-2xl font-medium">Hi, Welcome to Tranzact!</h1>
            <Label className="text-neutral-500">Start your journey</Label>

            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col gap-y-4"
            >
              <div>
                <Label className="text-xs">Full Name</Label>
                <Input
                  type="text"
                  {...register("fullname")}
                  placeholder="Enter your last name"
                />
                {errors.fullname && (
                  <Label className="text-xs text-red-500">
                    {errors.fullname?.message}
                  </Label>
                )}
              </div>
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
                <Label className="text-xs">Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password..."
                />
                {errors.password && (
                  <Label className="text-xs text-red-500">
                    {errors.password?.message}
                  </Label>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4"
                name="intent"
                value="register"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>

              <p className="flex items-center gap-2 text-center text-sm font-medium text-neutral-500">
                Already have an account?{" "}
                <Link to="/login" className="underline-offset-1">
                  <span className="text-purple-600">Sign in</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">{error.status}</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">{error.data}</p>

        <div className="flex gap-8">
          <Button className="mt-6" variant="outline">
            Go Home
          </Button>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Link, json, useNavigate } from "react-router-dom";
import { NewAxiosResponse, axiosInstance } from "@/lib/fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUserSchema } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/userStore";
import logo from "@/assets/tranzact.svg";
import Logo from "@/components/build/Logo";
import { useState } from "react";

type LoginSchemaType = z.infer<typeof loginUserSchema>;

export async function Loader() {
  return json(null);
}

export default function Login() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginUserSchema) });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(!loading);

    try {
      const response: NewAxiosResponse = await axiosInstance.post(
        `/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      setUser(response.data.data);

      toast({
        title: `${response.data ? response.data.message : "Success"}`,
        description: `welcome back, ${data.email}`,
      });

      return navigate("/onboard");
    } catch (error: any) {
      console.log(error);

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
                {loading ? <Loader2 className="animate-spin" /> : "Login"}
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

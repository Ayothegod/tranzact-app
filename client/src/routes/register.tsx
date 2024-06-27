import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, json, redirect, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { registerSchema } from "@/lib/schema";
import { BASEURL } from "@/lib/fetch";
import { useToast } from "@/components/ui/use-toast";
import { useProcessStore } from "@/lib/store/stateStore";

type RegisterSchemaType = z.infer<typeof registerSchema>;

// export async function Loader() {
//   const user = Cookies.get("user_access");
//   if (user) {
//     return redirect("/dashboard");
//   }

//   return json(null);
// }

export default function Register() {
  const { process, setProcess } = useProcessStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    setProcess();
    try {
      const response = await axios.post(`${BASEURL}/accounts/register/`, {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
      });

      console.log(response.data);

      toast({
        title: `Welcome to automize, ${data.username}`,
        description: `Login to continue to Automize`,
      });
      return navigate("/login");
    } catch (error: any) {
      console.log(error);

      if (error.response.data.username) {
        toast({
          variant: "destructive",
          description: `Username already exists, try again!`,
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
    }
    // finally {
    //   setProcess();
    // }
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-full w-full px-2 py-4 sm:w-1/2">
          <div className="mx-auto flex max-w-[448px] flex-col justify-center px-2">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">LOGO</h1>
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
                  {...register("name")}
                  placeholder="Enter your last name"
                />
                {errors.name && (
                  <Label className="text-xs text-red-500">
                    {errors.name?.message}
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
                <Label className="text-xs">Username</Label>
                <Input
                  type="text"
                  {...register("username")}
                  placeholder="unique username"
                />
                {errors.username && (
                  <Label className="text-xs text-red-500">
                    {errors.username?.message}
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
                {process ? <Loader2 className="animate-spin" /> : "Login"}
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

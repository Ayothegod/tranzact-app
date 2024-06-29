import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASEURL, axiosInstance } from "@/lib/fetch";
import { categorySchema } from "@/lib/schema";
import { useProcessStore } from "@/lib/store/stateStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";

type CategorySchemaType = z.infer<typeof categorySchema>;

export default function CreateCategory() {
  const { setCreateCategory } = useProcessStore();
  console.log("AddTransaction");
  const { mutate } = useSWRConfig();

  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CategorySchemaType) {
    console.log(values);
    try {
      const response = await axiosInstance.post(`${BASEURL}/create-category`, {
        name: values.name,
      });

      console.log(response.data);
      if (response.data?.error) {
        toast({
          variant: "destructive",
          description: `${response.data?.error}`,
        });
        return null;
      }
      toast({
        description: `new category '${response.data?.category}' added successfully`,
      });
      return null;
    } catch (error: any) {
      console.log(error);

      if (error.response.data?.type === "NO-CCOKIE") {
        toast({
          variant: "destructive",
          description: `You are not logged in!`,
        });

        Cookies.remove("session");
        navigate("/login");
        return null;
      } else if (error.response) {
        toast({
          variant: "destructive",
          description: `There was an issue with your request!`,
        });
        return null;
      } else if (error.request) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Network error, try again later.",
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
      mutate(`${BASEURL}/all-category`);
      setCreateCategory();
    }
  }

  const cancelCreate = () => {
    setCreateCategory();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-50 px-4">
      <div className="w-full sm:w-[500px] md:w-[560px] bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl">Create new category</h2>
          <div
            className="hover:bg-neutral-100 p-2 rounded-lg ring-1 ring-neutral-200"
            onClick={cancelCreate}
          >
            <X />
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 grid "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-8">
              <Button variant="destructive" onClick={cancelCreate}>
                Cancel
              </Button>
              <Button type="submit" variant="green">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

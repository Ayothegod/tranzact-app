import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASEURL, axiosInstance, fetcher } from "@/lib/fetch";
import { transactionSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { CalendarIcon, CirclePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { z } from "zod";
import { useToast } from "../ui/use-toast";

type TransactionSchemaType = z.infer<typeof transactionSchema>;

export default function AddTransaction({ setOpenModal, openModal }: any) {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category: "",
      description: "",
      transactionType: "INCOME",
      date: undefined,
    },
  });

  async function onSubmit(values: TransactionSchemaType) {
    console.log(values);
    const dateString = values.date.toISOString();
    try {
      const response = await axiosInstance.post(
        `${BASEURL}/create-transaction`,
        {
          transactionType: values.transactionType,
          amount: values.amount,
          category: values.category,
          description: values.description,
          date: dateString,
        }
      );

      console.log(response.data);
      toast({
        description: `new ${response.data?.type} transaction added successfully`,
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
      mutate(`${BASEURL}/total-income`);
      mutate(`${BASEURL}/total-expense`);
      setOpenModal(!openModal);
    }
  }
  const {
    data: categoryData,
    error: categoryError,
    isLoading: loadingCategory,
  } = useSWR(`${BASEURL}/all-category`, fetcher);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-50 px-4">
      <div className="w-full sm:w-[450px] md:w-[500px] bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl">Add new transaction</h2>
          <div
            className="hover:bg-neutral-100 p-2 rounded-lg ring-1 ring-neutral-200"
            onClick={() => setOpenModal(!openModal)}
          >
            <X />
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 grid "
          >
            {/* trasnaction type */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="amount of transaction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="description of transaction"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Transaction description (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="What type of transaction is this?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INCOME">INCOME</SelectItem>
                      <SelectItem value="EXPENSE">EXPENSE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Transaction Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Transaction category?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="px-2 font-medium">
                            <button className="flex flex-row items-center gap-2 w-full bg-transparent border-none outline-none hover:bg-neutral-100 p-1 mx-0 px-2 rounded-md">
                              <CirclePlus className="w-4 h-4" />
                              <p>Create new category</p>
                            </button>
                          </SelectLabel>
                        </SelectGroup>
                        <SelectSeparator />

                        {!categoryData?.categories || categoryError ? (
                          <SelectItem value="no-data">
                            Error fetching data
                          </SelectItem>
                        ) : (
                          categoryData?.categories.map(
                            (category: any, id: any) => (
                              <SelectItem value={category?.category} key={id}>
                                {loadingCategory
                                  ? "loading.."
                                  : category?.category}
                              </SelectItem>
                            )
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-auto">
                    <FormLabel>Transaction date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      The date of the transaction
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-8">
              <Button
                variant="destructive"
                onClick={() => setOpenModal(!openModal)}
              >
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

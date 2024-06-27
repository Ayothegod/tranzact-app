import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { transactionSchema } from "@/lib/schema";
import useSWR from "swr";
import { BASEURL, fetcher } from "@/lib/fetch";

type TransactionSchemaType = z.infer<typeof transactionSchema>;

export default function AddTransaction({
  setOpenModal,
  openModal,
  isIncome,
  setIsIncome,
}: any) {
  console.log(openModal, setOpenModal, isIncome, setIsIncome);
  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category: "",
      description: "",
      transactionType: "INCOME",
      //   userId: "",
    },
  });

  function onSubmit(values: TransactionSchemaType) {
    console.log(values);
  }

  const {
    data: categoryData,
    error: categoryError,
    isLoading: loadingCategory,
  } = useSWR(`${BASEURL}/all-category`, fetcher);
  console.log(categoryData.categories);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-50 px-4">
      <div className="w-full sm:w-[450px] md:w-[500px] bg-white p-4 rounded-lg">
        <h2 className="font-bold text-2xl">Add new transaction</h2>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    {/* <FormDescription>
                      You can manage email addresses in your
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

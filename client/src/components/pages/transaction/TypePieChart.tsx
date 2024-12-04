/* eslint-disable @typescript-eslint/no-explicit-any */
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function TypePieChart({
  data,
  isLoading,
  error,
}: {
  data: any;
  isLoading?: boolean;
  error?: string;
}) {
  // console.log(data?.data);

  const chartData = [
    {
      browser: "income",
      amount: data?.data.income,
      fill: "hsl(var(--chart-2))",
    },
    {
      browser: "expense",
      amount: data?.data.expense,
      fill: "hsl(var(--chart-1))",
    },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    income: {
      label: "Income",
    },
    expense: {
      label: "Expense",
    },
  } satisfies ChartConfig;

  // if (error) {
  //   return <div>Error loading transactions type</div>;
  // }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transaction Type</CardTitle>
        {/* <p>Select timeframe</p> */}
      </CardHeader>

      {isLoading ? (
        <div className="py-8 flex items-center justify-center">
          <Skeleton className="h-48 w-48 rounded-full bg-neutral-200" />
        </div>
      ) : error ? (
        <div className="py-20">
          <p className="text-center text-xl">Error loading transactions type</p>
        </div>
      ) : (
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent isMoney nameKey="amount" hideLabel />
                }
              />
              <Pie data={chartData} dataKey="amount">
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}

      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Income up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div> */}
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Expense up by 5.2% this month{" "}
          <TrendingDown className="h-4 w-4 text-red-600" />
        </div> */}
        <div className="leading-none text-muted-foreground text-center">
          Showing transaction type for the current month
        </div>
      </CardFooter>
    </Card>
  );
}

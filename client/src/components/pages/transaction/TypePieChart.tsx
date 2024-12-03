import { TrendingDown, TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetcher } from "@/lib/fetch";
import useSWR from "swr";

export default function TypePieChart() {
  const { data, isLoading: balanceLoading } = useSWR(
    `${import.meta.env.VITE_SERVER_BASEURI}/transactions/charts`,
    fetcher,
    { errorRetryCount: 1 }
  );
  // console.log(data?.data);

  const chartData = [
    {
      browser: "income",
      amount: data?.data.income,
      fill: "var(--color-income)",
    },
    {
      browser: "expense",
      amount: data?.data.expense,
      fill: "var(--color-expense)",
    },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    income: {
      label: "Income",
      color: "#22c55e",
    },
    expense: {
      label: "Expense",
      color: "#dc2626",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-centr pb-0">
        <div className="flex justify-between">
          <h2>Transaction type</h2>
          {/* <p>Select timeframe</p> */}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
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
          Showing transaction chart for the current month
        </div>
      </CardFooter>
    </Card>
  );
}

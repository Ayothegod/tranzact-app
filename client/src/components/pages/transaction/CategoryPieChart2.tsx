/* eslint-disable @typescript-eslint/no-unused-vars */
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
const chartData = [
  { categoryName: "funds", transactions: 1, fill: "hsl(var(--chart-4))" },
  { categoryName: "beg", transactions: 1, fill: "hsl(var(--chart-5))" },
  { categoryName: "null", transactions: 4, fill: "hsl(var(--chart-3))" },
];

const chartConfig = {
  transactions: {
    label: "transactions",
  },
  beg: {
    label: "beg",
    color: "yellow",
  },
  funds: {
    label: "funds",
    color: "green",
  },
  null: {
    label: "null",
    color: "blue",
  },
} satisfies ChartConfig;

export function CategoryPieChart2({
  data,
  isLoading,
  error,
}: {
  data: any;
  isLoading?: boolean;
  error?: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transaction Category</CardTitle>
      </CardHeader>

      {isLoading ? (
        <div className="py-8 flex items-center justify-center">
          <Skeleton className="h-48 w-48 rounded-full bg-neutral-200" />
        </div>
      ): error ? (
        <div className="py-20">
          <p className="text-center text-xl">Error loading transactions Categories</p>
        </div>
      ) :(
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className=""
                    nameKey="transactions"
                    hideLabel
                  />
                }
              />
              <Pie data={chartData} dataKey="transactions">
                <LabelList
                  dataKey="categoryName"
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
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground text-center">
          Showing transaction category for the current month
        </div>
      </CardFooter>
    </Card>
  );
}

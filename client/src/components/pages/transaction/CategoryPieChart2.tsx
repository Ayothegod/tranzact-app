"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "bills", transactions: 275, fill: "var(--color-bills)" },
  { browser: "safari", transactions: 200, fill: "var(--color-safari)" },
  { browser: "firefox", transactions: 187, fill: "var(--color-firefox)" },
  { browser: "edge", transactions: 173, fill: "var(--color-edge)" },
  { browser: "other", transactions: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  transactions: {
    label: "transactions",
  },
  bills: {
    label: "Bills",
    color: "yellow",
  },
  safari: {
    label: "Safari",
    color: "green",
  },
  firefox: {
    label: "Firefox",
    color: "blue",
  },
  edge: {
    label: "Edge",
    color: "red",
  },
  other: {
    label: "Other",
    color: "purple",
  },
} satisfies ChartConfig

export function CategoryPieChart2() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent  className="" nameKey="transactions" hideLabel />}
            />
            <Pie data={chartData} dataKey="transactions">
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
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

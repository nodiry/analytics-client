import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MetricData } from "./types";

interface Props {
  metrics: MetricData[]
}


const PagesChart = ({ metrics }: Props) => {
  // Use the latest available page visit data
  const latestData = metrics.length ? metrics[metrics.length - 1].pages : []

  // Chart Config for proper labeling
  const chartConfig: ChartConfig = {
    visits: {
      label: "Page Visits",
    },
  }

  // Color scheme for bars
  const colors = ["#4A90E2", "#F5921B", "#876FD4", "#A3A3A3", "#E94E77"]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>Pages driving traffic to your website</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[300px] w-full">
          <BarChart data={latestData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="url" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="visits" radius={[4, 4, 0, 0]}>
              {latestData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PagesChart
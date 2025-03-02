import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { MetricData } from "./types"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {metrics: MetricData[]}

const AvgLoadTimeChart = ({ metrics }: Props) => {
  const chartConfig = { avgLoadTime: { label: "Average Load Time (ms)", color: "#8884d8" }}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Load Time</CardTitle>
        <CardDescription>Tracking page load speed over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
            <LineChart data={metrics} margin={{ left: 12, right: 12 }}>
               <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                tickMargin={8}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={{ stroke: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="avgLoadTime" // Fixed typo
                stroke={chartConfig.avgLoadTime.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing average load time for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default AvgLoadTimeChart
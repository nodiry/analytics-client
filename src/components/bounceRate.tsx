import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { MetricData } from "@/components/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

interface Props {
  metrics: MetricData[];
}

const BounceRateChart = ({ metrics }: Props) => {
  const chartConfig = { bounceRate: { label: "Bounce rate %", color: "#8884d8" }}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Bounce Rate</CardTitle>
        <CardDescription>Tracking page load speed over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
            <LineChart data={metrics} margin={{ left: 12, right: 12 }}>
               <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                tickMargin={8} tickLine={false} axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={{ stroke: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="bounceRate"  stroke={chartConfig.bounceRate.color}  strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="leading-none text-muted-foreground"> Showing average load time for the last 6 months </div>      
      </CardFooter>
    </Card>
  );
};

export default BounceRateChart;

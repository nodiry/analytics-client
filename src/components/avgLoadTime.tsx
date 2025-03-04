import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { MetricData } from "./types";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const AvgLoadTimeChart = ({ metrics }: Props) => {
  const chartConfig:ChartConfig = { avgLoadTime: { label: "Average Load Time (ms)" } };

  // Map the metrics to ensure correct timestamp formatting
  const formattedMetrics = metrics.map((metric) => ({
    ...metric,
    formattedTimestamp: new Date(metric.timestamp).toLocaleTimeString(), // Format timestamp
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{words.avgloadtime}</CardTitle>
        <CardDescription>{words.avgloadtimedesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedMetrics} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="formattedTimestamp" // Use the formatted timestamp
              tickMargin={8}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              label={{ value: "ms", angle: -90, position: "insideLeft" }} // Y-axis label
            />
            <ChartTooltip cursor={{ stroke: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="avgLoadTime"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AvgLoadTimeChart;

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MetricData } from "./types";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const ReferrersChart: React.FC<Props> = ({ metrics }) => {
  // Extract unique referrer names
  const referrerNames = new Set<string>();
  metrics.forEach((metric) => {
    metric.referrers.forEach((ref: any) => referrerNames.add(ref.referrer));
  });

  const uniqueReferrers = Array.from(referrerNames);

  // Assign unique colors dynamically
  const colors = ["#4A90E2", "#F5921B", "#876FD4", "#A3A3A3", "#E94E77", "#29B6F6", "#FF7043", "#66BB6A"];
  const referrerColors: Record<string, string> = {};
  uniqueReferrers.forEach((referrer, index) => {
    referrerColors[referrer] = colors[index % colors.length]; // Cycle through colors if needed
  });

  // Define chart configurations dynamically
  const chartConfig: ChartConfig = uniqueReferrers.reduce((config, referrer) => {
    config[referrer] = { label: referrer, color: referrerColors[referrer] };
    return config;
  }, {} as ChartConfig);

  // Format data for the chart
  const formattedMetrics = metrics.map((metric) => {
    const entry: any = { time: new Date(metric.timestamp).toLocaleTimeString() };

    uniqueReferrers.forEach((referrer) => {
      entry[referrer] = metric.referrers.find((r: any) => r.referrer === referrer)?.count || 0;
    });

    return entry;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{words.referrers}</CardTitle>
        <CardDescription>{words.refermes}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedMetrics} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={6} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "per visit", angle: -90, position: "insideLeft" }} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            
            {uniqueReferrers.map((referrer) => (
              <Line
                key={referrer}
                type="monotone"
                dataKey={referrer}
                stroke={referrerColors[referrer]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ReferrersChart;

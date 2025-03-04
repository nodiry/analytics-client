import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MetricData } from "./types";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const DeviceStatsChart: React.FC<Props> = ({ metrics }) => {
  const chartConfig = {
    Desktop: { label: "Desktop", color: "#29B6F6"  },
    Mobile: { label: "Mobile", color:  "#FF7043" },
    Tablet: { label: "Tablet", color: "#66BB6A" },
  } satisfies ChartConfig ;

  // Format the data properly
  const formattedMetrics = metrics.map((metric) => ({
    timestamp: new Date(metric.timestamp).toLocaleTimeString(), // Format timestamp
    Desktop: metric.deviceStats.desktop, // Desktop visitors count
    Mobile: metric.deviceStats.mobile, // Mobile visitors count
    Tablet: metric.deviceStats.tablet, // Tablet visitors count
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{words.devdistribution}</CardTitle>
        <CardDescription>{words.devdismes}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedMetrics} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickMargin={8}
              tickFormatter={(time) => time} // Display formatted timestamp
              tickLine={false}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} label={{ value: "visits", angle: -90, position: "insideLeft" }} />
            <ChartTooltip cursor={{ stroke: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
            
            {/* Desktop Line */}
            <Line type="monotone" dataKey="Desktop" stroke="#29B6F6" strokeWidth={2} dot={false} />
            {/* Mobile Line */}
            <Line type="monotone" dataKey="Mobile" stroke="#FF7043" strokeWidth={2} dot={false} />
            {/* Tablet Line */}
            <Line type="monotone" dataKey="Tablet" stroke="#66BB6A" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceStatsChart;

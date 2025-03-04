import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { MetricData } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const SessionDurationChart = ({ metrics }: Props) => {
  const chartConfig = { avgSessionDuration: { label: "Average Session duration (s)", color: "#8884d8" }}

  return (
    <Card>
    <CardHeader>
      <CardTitle>{words.avgsession}</CardTitle>
      <CardDescription>{words.avgsessionmes}</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
          <LineChart data={metrics} margin={{ left: 8, right: 8, top:4 }}>
             <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              tickMargin={8}  tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "seconds", angle: -90, position: "insideLeft" }} />
            <ChartTooltip cursor={{ stroke: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="avgSessionDuration"
              stroke={chartConfig.avgSessionDuration.color} strokeWidth={2} dot={false}
            />
          </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
  );
};

export default SessionDurationChart;

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MetricData } from "./types";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const PagesChart = ({ metrics }: Props) => {
  // Extract unique page URLs
  const pageUrls = new Set<string>();
  metrics.forEach((metric) => {
    metric.pages.forEach((page: any) => pageUrls.add(page.url));
  });

  const uniquePages = Array.from(pageUrls);

  // Assign unique colors dynamically
  const colors = ["#4A90E2", "#F5921B", "#876FD4", "#A3A3A3", "#E94E77"];
  const pageColors: Record<string, string> = {};
  uniquePages.forEach((page, index) => {
    pageColors[page] = colors[index % colors.length]; // Cycle through colors if needed
  });

  // Define chart configurations dynamically
  const chartConfig: ChartConfig = uniquePages.reduce((config, page) => {
    config[page] = { label: page, color: pageColors[page] };
    return config;
  }, {} as ChartConfig);

  // Format data for the chart
  const formattedMetrics = metrics.map((metric) => {
    const entry: any = { time: new Date(metric.timestamp).toLocaleTimeString() };

    uniquePages.forEach((page) => {
      entry[page] = metric.pages.find((p: any) => p.url === page)?.visits || 0;
    });

    return entry;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{words.pages}</CardTitle>
        <CardDescription>{words.pagesmes}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedMetrics} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "visits", angle: -90, position: "insideLeft" }}/>
            <ChartTooltip cursor={false} content={ <ChartTooltipContent  />} />
            {uniquePages.map((page) => (
              <Line
                key={page}
                type="monotone"
                dataKey={page}
                stroke={pageColors[page]}
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

export default PagesChart;
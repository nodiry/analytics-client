import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MetricData } from "./types";
import { words } from "@/textConfig";

interface Props {
  metrics: MetricData[];
}

const GeoDistro: React.FC<Props> = ({ metrics }) => {
  // Extract unique country names
  const countryNames = new Set<string>();
  metrics.forEach((metric) => {
    metric.geoDistribution.forEach((geo) => countryNames.add(geo.country));
  });

  const uniqueCountries = Array.from(countryNames);

  // Assign unique colors dynamically
  const colors = ["#4A90E2", "#F5921B", "#876FD4", "#A3A3A3", "#E94E77", "#29B6F6", "#FF7043", "#66BB6A"];
  const countryColors: Record<string, string> = {};
  uniqueCountries.forEach((country, index) => {
    countryColors[country] = colors[index % colors.length]; // Cycle colors if needed
  });

  // Define chart configurations dynamically
  const chartConfig: ChartConfig = uniqueCountries.reduce((config, country) => {
    config[country] = { label: country, color: countryColors[country] };
    return config;
  }, {} as ChartConfig);

  // Format data for the chart
  const formattedMetrics = metrics.map((metric) => {
    const entry: any = { time: new Date(metric.timestamp).toLocaleTimeString() };

    uniqueCountries.forEach((country) => {
      entry[country] = metric.geoDistribution.find((geo) => geo.country === country)?.visits || 0;
    });

    return entry;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{words.geodistro}</CardTitle>
        <CardDescription>{words.geodistromes}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedMetrics} margin={{ left: 8, right: 8, top:4 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "visits", angle: -90, position: "insideLeft" }} />
             <ChartTooltip  cursor={false} content={ <ChartTooltipContent  />} />
            {uniqueCountries.map((country) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={countryColors[country]}
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

export default GeoDistro;

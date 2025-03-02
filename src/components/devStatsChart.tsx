import { PieChart, Pie, Cell } from "recharts"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import {ChartConfig,ChartContainer,ChartLegend,ChartLegendContent,} from "@/components/ui/chart"
import { DeviceStats } from "./types"

interface Props {deviceStats: DeviceStats}

const DeviceStatsChart: React.FC<Props> = ({ deviceStats }) => {
  const data = [
    { name: "Desktop", value: deviceStats.desktop, color: "#4A90E2" },
    { name: "Mobile", value: deviceStats.mobile, color: "#E94E77" },
    { name: "Tablet", value: deviceStats.tablet, color: "#F8B500" },
  ];
  const chartConfig = {
    visitors: {label: "Visitors"},
    Desktop: {label: "Desktop", color: "hsl(var(--chart-1))"},
    Mobile: { label: "Mobile", color: "hsl(var(--chart-2))"},
    Tablet: { label: "Tablet", color: "hsl(var(--chart-3))" }
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Device Distribution</CardTitle>
        <CardDescription>Breakdown of user devices.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}          
        className="flex w-full sm:w-[350px] md:w-[450px] lg:w-[550px] h-[320px] mx-auto"
        >
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
              />
            </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DeviceStatsChart
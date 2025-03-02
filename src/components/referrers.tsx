import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid } from "recharts"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ReferrerStats } from "./types"

interface Props {
  referrers: ReferrerStats[]
}

const ReferrersChart: React.FC<Props> = ({ referrers }) => {
  // Define unique colors for referrers using CSS variables
  const colors = [
    "#4A90E2",
    "#F5921B",
    "#876FD4",
    "#A3A3A3",
    "#E94E77",
  ]

  const chartConfig: ChartConfig = {
    count: {
      label: "Referrer Count",
    },
  }

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle> Referrers</CardTitle>
        <CardDescription>Sites driving traffic to your page.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[300px] w-full">
            <BarChart data={referrers} margin={{ left: 12, right: 12 }}>
               <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="referrer" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {referrers.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ReferrersChart

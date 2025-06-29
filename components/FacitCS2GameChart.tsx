"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, ReferenceDot } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FacitCS2GameStatsResponse, Stats } from "@/types/faceit.types";

interface FaceitCS2GameChartProps {
  stats: FacitCS2GameStatsResponse | null;
  dataKey: string;
  label?: string;
  color?: string;
}

export function FacitCS2GameChart({
  stats,
  dataKey,
  label = "Değer",
  color = "var(--primary)",
}: FaceitCS2GameChartProps) {
  // dataKey prop'una göre chartData oluştur
  const chartData = (stats?.items || [])
    .map((item) => {
      const matchFinishedAt = item.stats["Match Finished At"];
      let dateStr = "";
      if (typeof matchFinishedAt === "number") {
        const ts =
          matchFinishedAt.toString().length === 13
            ? matchFinishedAt
            : matchFinishedAt * 1000;
        dateStr = new Date(ts).toLocaleDateString("tr-TR", {
          month: "short",
          day: "numeric",
        });
      }
      const valRaw = item.stats[dataKey];
      const val =
        valRaw !== undefined && valRaw !== null && valRaw.toString() !== "NaN"
          ? parseFloat(valRaw as string)
          : 0;
      return {
        date: dateStr,
        value: val,
        matchFinishedAt:
          typeof matchFinishedAt === "number" ? matchFinishedAt : 0,
      };
    })
    .filter((d) => d.date && !isNaN(d.value))
    .sort((a, b) => a.matchFinishedAt - b.matchFinishedAt);

  const chartConfig = {
    value: {
      label: label,
      color: color,
    },
  } satisfies ChartConfig;

  // Son maç tarihi ve ilk maç tarihi (grafikteki data'dan)
  const firstDate = chartData.length > 0 ? chartData[0].date : null;
  const lastDate =
    chartData.length > 0 ? chartData[chartData.length - 1].date : null;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Alan Grafiği - Gradyan</CardTitle>
        <CardDescription>
          {firstDate && lastDate
            ? `${firstDate} - ${lastDate} arası  ${label} değişimi`
            : `${label} istatistikleri`}
        </CardDescription>
      </CardHeader>
      <CardContent className='w-full p-0'>
        <div className='w-full'>
          <ChartContainer config={chartConfig}>
            <AreaChart
              width={undefined}
              height={300}
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
              className='w-full'>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id='fillKR' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='5%'
                    stopColor='var(--primary)'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='95%'
                    stopColor='var(--primary)'
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              {/* K/R Ratio */}
              <Area
                dataKey='value'
                type='natural'
                fill='url(#fillKR)'
                fillOpacity={0.4}
                stroke={color}
                stackId='a'
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

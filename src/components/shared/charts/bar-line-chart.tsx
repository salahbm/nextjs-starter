'use client';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import { type CartesianChartProps, type TooltipIndicator } from './types';

export interface BarLineChartProps extends Omit<CartesianChartProps, 'series'> {
  barRadius?: number;
  barSeries: string[];
  lineCurve?: React.ComponentProps<typeof Line>['type'];
  lineSeries: string[];
  tooltipIndicator?: TooltipIndicator;
}

export function BarLineChart({
  barRadius = 4,
  barSeries,
  className,
  config,
  data,
  lineCurve = 'monotone',
  lineSeries,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showYAxis = false,
  tooltipIndicator = 'dot',
  xAxisKey,
}: BarLineChartProps) {
  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
        />
        {showYAxis && (
          <YAxis axisLine={false} tickLine={false} tickMargin={8} width={36} />
        )}
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator={tooltipIndicator} />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {barSeries.map((dataKey) => (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            fill={`var(--color-${dataKey})`}
            radius={barRadius}
          />
        ))}
        {lineSeries.map((dataKey) => (
          <Line
            key={dataKey}
            dataKey={dataKey}
            type={lineCurve}
            stroke={`var(--color-${dataKey})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </ComposedChart>
    </ChartContainer>
  );
}

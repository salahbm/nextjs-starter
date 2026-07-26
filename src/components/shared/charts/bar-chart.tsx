'use client';

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import { type CartesianChartProps, type TooltipIndicator } from './types';
import { getSeriesKeys } from './utils';

export interface BarChartProps extends CartesianChartProps {
  horizontal?: boolean;
  radius?: number;
  stacked?: boolean;
  tooltipIndicator?: TooltipIndicator;
}

export function BarChart({
  className,
  config,
  data,
  horizontal = false,
  radius = 4,
  series,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showYAxis = false,
  stacked = false,
  tooltipIndicator = 'dot',
  xAxisKey,
}: BarChartProps) {
  const seriesKeys = getSeriesKeys(config, series);

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <RechartsBarChart
        accessibilityLayer
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ left: horizontal ? 8 : 12, right: 12 }}
      >
        {showGrid && (
          <CartesianGrid horizontal={!horizontal} vertical={horizontal} />
        )}
        <XAxis
          dataKey={horizontal ? undefined : xAxisKey}
          type={horizontal ? 'number' : 'category'}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          hide={horizontal}
        />
        <YAxis
          dataKey={horizontal ? xAxisKey : undefined}
          type={horizontal ? 'category' : 'number'}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          width={horizontal ? 64 : 36}
          hide={!horizontal && !showYAxis}
        />
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator={tooltipIndicator} />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {seriesKeys.map((dataKey) => (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            fill={`var(--color-${dataKey})`}
            radius={radius}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

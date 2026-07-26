'use client';

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import { type CartesianChartProps, type TooltipIndicator } from './types';
import { getSeriesKeys } from './utils';

export interface LineChartProps extends CartesianChartProps {
  curve?: React.ComponentProps<typeof Line>['type'];
  tooltipIndicator?: TooltipIndicator;
}

export function LineChart({
  className,
  config,
  curve = 'monotone',
  data,
  series,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showYAxis = false,
  tooltipIndicator = 'line',
  xAxisKey,
}: LineChartProps) {
  const seriesKeys = getSeriesKeys(config, series);

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <RechartsLineChart
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
        {seriesKeys.map((dataKey) => (
          <Line
            key={dataKey}
            dataKey={dataKey}
            type={curve}
            stroke={`var(--color-${dataKey})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

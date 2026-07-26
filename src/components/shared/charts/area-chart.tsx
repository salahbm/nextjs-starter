'use client';

import { useId } from 'react';

import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import { type CartesianChartProps, type TooltipIndicator } from './types';
import { getSeriesKeys } from './utils';

export interface AreaChartProps extends CartesianChartProps {
  curve?: React.ComponentProps<typeof Area>['type'];
  stacked?: boolean;
  tooltipIndicator?: TooltipIndicator;
}

export function AreaChart({
  className,
  config,
  curve = 'natural',
  data,
  series,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showYAxis = false,
  stacked = false,
  tooltipIndicator = 'dot',
  xAxisKey,
}: AreaChartProps) {
  const id = useId().replace(/:/g, '');
  const seriesKeys = getSeriesKeys(config, series);

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <RechartsAreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <defs>
          {seriesKeys.map((dataKey) => (
            <linearGradient
              key={dataKey}
              id={`${id}-${dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${dataKey})`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${dataKey})`}
                stopOpacity={0.08}
              />
            </linearGradient>
          ))}
        </defs>
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
          <Area
            key={dataKey}
            dataKey={dataKey}
            type={curve}
            fill={`url(#${id}-${dataKey})`}
            fillOpacity={0.5}
            stroke={`var(--color-${dataKey})`}
            strokeWidth={2}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

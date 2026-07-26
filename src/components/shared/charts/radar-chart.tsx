'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import { type CartesianChartProps, type TooltipIndicator } from './types';
import { getSeriesKeys } from './utils';

export interface RadarChartProps
  extends Omit<CartesianChartProps, 'showGrid' | 'showYAxis'> {
  gridType?: 'circle' | 'polygon';
  tooltipIndicator?: TooltipIndicator;
}

export function RadarChart({
  className,
  config,
  data,
  gridType = 'polygon',
  series,
  showLegend = true,
  showTooltip = true,
  tooltipIndicator = 'dot',
  xAxisKey,
}: RadarChartProps) {
  const seriesKeys = getSeriesKeys(config, series);

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <RechartsRadarChart accessibilityLayer data={data}>
        <PolarGrid gridType={gridType} />
        <PolarAngleAxis dataKey={xAxisKey} />
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator={tooltipIndicator} />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {seriesKeys.map((dataKey) => (
          <Radar
            key={dataKey}
            dataKey={dataKey}
            fill={`var(--color-${dataKey})`}
            fillOpacity={0.3}
            stroke={`var(--color-${dataKey})`}
            strokeWidth={2}
          />
        ))}
      </RechartsRadarChart>
    </ChartContainer>
  );
}

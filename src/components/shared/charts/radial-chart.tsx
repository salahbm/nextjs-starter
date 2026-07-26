'use client';

import { RadialBar, RadialBarChart } from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import {
  type ChartConfig,
  type ChartDatum,
  type TooltipIndicator,
} from './types';
import { addDataColors } from './utils';

export interface RadialChartProps {
  className?: string;
  config: ChartConfig;
  data: ChartDatum[];
  endAngle?: number;
  innerRadius?: string | number;
  nameKey: string;
  outerRadius?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  startAngle?: number;
  tooltipIndicator?: TooltipIndicator;
  valueKey: string;
}

export function RadialChart({
  className,
  config,
  data,
  endAngle = -270,
  innerRadius = '25%',
  nameKey,
  outerRadius = '90%',
  showLegend = true,
  showTooltip = true,
  startAngle = 90,
  tooltipIndicator = 'dot',
  valueKey,
}: RadialChartProps) {
  const coloredData = addDataColors(data, nameKey);

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <RadialBarChart
        accessibilityLayer
        data={coloredData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
      >
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                indicator={tooltipIndicator}
                nameKey={nameKey}
              />
            }
          />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        )}
        <RadialBar dataKey={valueKey} background cornerRadius={100} />
      </RadialBarChart>
    </ChartContainer>
  );
}

'use client';

import { type ReactNode } from 'react';

import { Label, Pie, PieChart } from 'recharts';

import { ChartContainer } from './chart-container';
import { ChartLegend, ChartLegendContent } from './chart-legend';
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip';
import {
  type ChartConfig,
  type ChartDatum,
  type TooltipIndicator,
} from './types';
import { addDataColors } from './utils';

export interface DonutChartProps {
  centerLabel?: ReactNode;
  centerValue?: ReactNode;
  className?: string;
  config: ChartConfig;
  data: ChartDatum[];
  innerRadius?: number;
  nameKey: string;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  valueKey: string;
}

export function DonutChart({
  centerLabel,
  centerValue,
  className,
  config,
  data,
  innerRadius = 60,
  nameKey,
  outerRadius = 92,
  showLegend = true,
  showTooltip = true,
  tooltipIndicator = 'dot',
  valueKey,
}: DonutChartProps) {
  const coloredData = addDataColors(data, nameKey);
  const total = data.reduce((sum, item) => {
    const value = item[valueKey];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
  const resolvedCenterLabel = centerLabel ?? config[valueKey]?.label ?? 'Total';
  const resolvedCenterValue = centerValue ?? total.toLocaleString();

  return (
    <ChartContainer
      config={config}
      className={className ?? 'aspect-auto h-72 w-full'}
    >
      <PieChart accessibilityLayer>
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
        <Pie
          data={coloredData}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          strokeWidth={2}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                return null;
              }

              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-2xl font-bold"
                  >
                    {resolvedCenterValue}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 22}
                    className="fill-muted-foreground text-xs"
                  >
                    {resolvedCenterLabel}
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

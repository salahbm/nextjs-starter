import { type ComponentType, type ReactNode } from 'react';

const CHART_THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | {
        color?: never;
        theme: Record<keyof typeof CHART_THEMES, string>;
      }
  )
>;

export type ChartDatum = Record<string, unknown>;

export interface CartesianChartProps {
  className?: string;
  config: ChartConfig;
  data: ChartDatum[];
  series?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showYAxis?: boolean;
  xAxisKey: string;
}

export type TooltipIndicator = 'dashed' | 'dot' | 'line';

export { CHART_THEMES };

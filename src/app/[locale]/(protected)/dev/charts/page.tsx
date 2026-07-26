import { type ReactNode } from 'react';

import {
  AreaChart,
  BarChart,
  BarLineChart,
  type ChartConfig,
  DonutChart,
  LineChart,
  RadarChart,
  RadialChart,
} from '@/components/shared/charts';

const trafficData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 284, mobile: 170 },
];

const trafficConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const browserData = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 187 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 90 },
];

const browserConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const capabilityData = [
  { capability: 'Speed', current: 86, target: 94 },
  { capability: 'Quality', current: 78, target: 88 },
  { capability: 'Access', current: 91, target: 96 },
  { capability: 'Scale', current: 74, target: 90 },
  { capability: 'Trust', current: 88, target: 93 },
  { capability: 'DX', current: 82, target: 92 },
];

const capabilityConfig = {
  current: {
    label: 'Current',
    color: 'var(--chart-2)',
  },
  target: {
    label: 'Target',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

const channelData = [
  { channel: 'organic', conversions: 88 },
  { channel: 'paid', conversions: 72 },
  { channel: 'referral', conversions: 61 },
  { channel: 'social', conversions: 48 },
];

const channelConfig = {
  conversions: {
    label: 'Conversions',
  },
  organic: {
    label: 'Organic',
    color: 'var(--chart-1)',
  },
  paid: {
    label: 'Paid',
    color: 'var(--chart-2)',
  },
  referral: {
    label: 'Referral',
    color: 'var(--chart-3)',
  },
  social: {
    label: 'Social',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

function ChartShowcaseCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 border-0 bg-transparent p-0 shadow-none sm:rounded-lg sm:border sm:bg-card sm:p-5 sm:text-card-foreground sm:shadow-xs">
      <div className="mb-4 px-4 sm:px-0">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function ChartsPage() {
  return (
    <main className="container mx-auto space-y-6 px-0 pb-10 sm:px-8">
      <header className="space-y-2 px-4 sm:px-0">
        <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
        <p className="max-w-3xl text-muted-foreground">
          Reusable Recharts starters with theme-aware colors, accessible
          interaction, tooltips, and legends.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartShowcaseCard
          title="Line chart"
          description="Compare trends across a continuous time axis."
        >
          <LineChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Area chart"
          description="Emphasize volume while preserving the trend."
        >
          <AreaChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
            stacked
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Bar chart"
          description="Compare discrete values across categories."
        >
          <BarChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Bar and line chart"
          description="Combine discrete volume and a continuous trend."
        >
          <BarLineChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
            barSeries={['desktop']}
            lineSeries={['mobile']}
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Donut chart"
          description="Show how categories contribute to a whole."
        >
          <DonutChart
            data={browserData}
            config={browserConfig}
            nameKey="browser"
            valueKey="visitors"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Radar chart"
          description="Compare several dimensions on a shared scale."
        >
          <RadarChart
            data={capabilityData}
            config={capabilityConfig}
            xAxisKey="capability"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Radial chart"
          description="Compare progress across a compact radial layout."
        >
          <RadialChart
            data={channelData}
            config={channelConfig}
            nameKey="channel"
            valueKey="conversions"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Chart tooltip"
          description="Hover or focus a point to see the dashed tooltip variant."
        >
          <LineChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
            showLegend={false}
            tooltipIndicator="dashed"
          />
        </ChartShowcaseCard>

        <ChartShowcaseCard
          title="Chart legend"
          description="Series labels and colors are derived from the chart config."
        >
          <BarChart
            data={trafficData}
            config={trafficConfig}
            xAxisKey="month"
            showTooltip={false}
          />
        </ChartShowcaseCard>
      </div>
    </main>
  );
}

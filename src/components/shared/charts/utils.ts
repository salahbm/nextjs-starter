import { type ChartConfig, type ChartDatum } from './types';

export function getSeriesKeys(config: ChartConfig, series?: string[]) {
  if (series?.length) {
    return series;
  }

  return Object.entries(config)
    .filter(([, item]) => item.color ?? item.theme)
    .map(([key]) => key);
}

export function addDataColors(
  data: ChartDatum[],
  nameKey: string,
): ChartDatum[] {
  return data.map((item) => ({
    ...item,
    fill: item.fill ?? `var(--color-${String(item[nameKey])})`,
  }));
}

export function getPayloadConfig(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const nestedPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configKey = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configKey = payload[key as keyof typeof payload] as string;
  } else if (
    nestedPayload &&
    key in nestedPayload &&
    typeof nestedPayload[key as keyof typeof nestedPayload] === 'string'
  ) {
    configKey = nestedPayload[key as keyof typeof nestedPayload] as string;
  }

  return configKey in config ? config[configKey] : config[key];
}

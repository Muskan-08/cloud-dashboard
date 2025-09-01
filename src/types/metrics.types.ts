export const MetricColors = {
  cpu: '#1890ff',
  memory: '#52c41a',
  disk: '#722ed1',
  network: '#fa8c16'
} as const;

export interface RegionalMetricsProps {
  region: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  status: 'online' | 'offline' | 'warning' | 'maintenance';
}

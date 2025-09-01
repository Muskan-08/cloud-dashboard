import React, { useState } from 'react';
import { Card } from 'antd';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';
import { ResourceMetrics } from '../../../types';
import dayjs from 'dayjs';
import ChartHeader from '../../molecules/ChartHeader/ChartHeader';
import MetricLine from '../../molecules/MetricLine/MetricLine';
import MetricArea from '../../molecules/MetricArea/MetricArea';
import styles from './ServerMetricsChart.module.css';

interface ServerMetricsChartProps {
  metrics: ResourceMetrics[];
  serverName: string;
  chartType?: 'line' | 'area';
  selectedMetrics?: string[];
}

const metricColors = {
  cpu: '#1890ff',
  memory: '#52c41a',
  disk: '#faad14',
  network: '#722ed1',
};

const ServerMetricsChart: React.FC<ServerMetricsChartProps> = ({
  metrics,
  serverName,
  chartType = 'line',
  selectedMetrics: initialMetrics = ['cpu', 'memory'],
}) => {
  const [selectedMetrics, setSelectedMetrics] = useState(initialMetrics);
  const formatTimestamp = (timestamp: string) => {
    return dayjs(timestamp).format('HH:mm');
  };

  const formatTooltip = (value: number, name: string) => {
    return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
  };

  const renderMetrics = (Component: typeof MetricLine | typeof MetricArea) => {
    return selectedMetrics.map((metric) => (
      <Component
        key={metric}
        metricName={metric}
        color={metricColors[metric as keyof typeof metricColors]}
      />
    ));
  };

  const renderChart = () => {
    const ChartComponent = chartType === 'area' ? AreaChart : LineChart;
    const MetricComponent = chartType === 'area' ? MetricArea : MetricLine;

    return (
      <ChartComponent data={metrics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTimestamp}
          className={styles.axisLabel}
        />
        <YAxis domain={[0, 100]} className={styles.axisLabel} />
        <Tooltip
          labelFormatter={formatTimestamp}
          formatter={formatTooltip}
        />
        <Legend />
        {renderMetrics(MetricComponent)}
      </ChartComponent>
    );
  };

  return (
    <Card
      className={styles.card}
      title={
        <ChartHeader
          title={`${serverName} - Resource Metrics`}
          selectedMetrics={selectedMetrics}
          onMetricsChange={setSelectedMetrics}
        />
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </Card>
  );
};

export default ServerMetricsChart;

import React from 'react';
import { Card, Select, Typography } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { ResourceMetrics } from '../../types';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

interface ServerMetricsChartProps {
  metrics: ResourceMetrics[];
  serverName: string;
  chartType?: 'line' | 'area';
  selectedMetrics?: string[];
}

const ServerMetricsChart: React.FC<ServerMetricsChartProps> = ({
  metrics,
  serverName,
  chartType = 'line',
  selectedMetrics = ['cpu', 'memory'],
}) => {
  const formatTimestamp = (timestamp: string) => {
    return dayjs(timestamp).format('HH:mm');
  };

  const formatTooltip = (value: number, name: string) => {
    return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
  };

  const colors = {
    cpu: '#1890ff',
    memory: '#52c41a',
    disk: '#faad14',
    network: '#722ed1',
  };

  const renderChart = () => {
    if (chartType === 'area') {
      return (
        <AreaChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            style={{ fontSize: '12px' }}
          />
          <YAxis domain={[0, 100]} style={{ fontSize: '12px' }} />
          <Tooltip
            labelFormatter={formatTimestamp}
            formatter={formatTooltip}
          />
          <Legend />
          {selectedMetrics.includes('cpu') && (
            <Area
              type="monotone"
              dataKey="cpu"
              stackId="1"
              stroke={colors.cpu}
              fill={colors.cpu}
              fillOpacity={0.3}
            />
          )}
          {selectedMetrics.includes('memory') && (
            <Area
              type="monotone"
              dataKey="memory"
              stackId="1"
              stroke={colors.memory}
              fill={colors.memory}
              fillOpacity={0.3}
            />
          )}
          {selectedMetrics.includes('disk') && (
            <Area
              type="monotone"
              dataKey="disk"
              stackId="1"
              stroke={colors.disk}
              fill={colors.disk}
              fillOpacity={0.3}
            />
          )}
          {selectedMetrics.includes('network') && (
            <Area
              type="monotone"
              dataKey="network"
              stackId="1"
              stroke={colors.network}
              fill={colors.network}
              fillOpacity={0.3}
            />
          )}
        </AreaChart>
      );
    }

    return (
      <LineChart data={metrics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTimestamp}
          style={{ fontSize: '12px' }}
        />
        <YAxis domain={[0, 100]} style={{ fontSize: '12px' }} />
        <Tooltip
          labelFormatter={formatTimestamp}
          formatter={formatTooltip}
        />
        <Legend />
        {selectedMetrics.includes('cpu') && (
          <Line
            type="monotone"
            dataKey="cpu"
            stroke={colors.cpu}
            strokeWidth={2}
            dot={{ fill: colors.cpu, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
        {selectedMetrics.includes('memory') && (
          <Line
            type="monotone"
            dataKey="memory"
            stroke={colors.memory}
            strokeWidth={2}
            dot={{ fill: colors.memory, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
        {selectedMetrics.includes('disk') && (
          <Line
            type="monotone"
            dataKey="disk"
            stroke={colors.disk}
            strokeWidth={2}
            dot={{ fill: colors.disk, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
        {selectedMetrics.includes('network') && (
          <Line
            type="monotone"
            dataKey="network"
            stroke={colors.network}
            strokeWidth={2}
            dot={{ fill: colors.network, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    );
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>
            {serverName} - Resource Metrics
          </Title>
          <Select
            defaultValue={selectedMetrics}
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select metrics"
            size="small"
          >
            <Option value="cpu">CPU</Option>
            <Option value="memory">Memory</Option>
            <Option value="disk">Disk</Option>
            <Option value="network">Network</Option>
          </Select>
        </div>
      }
      style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    >
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </Card>
  );
};

export default ServerMetricsChart;

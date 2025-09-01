import React from 'react';
import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ResourceTrendsProps {
  data: Array<{
    timestamp: string;
    avgCpu: number;
    avgMemory: number;
    avgDisk: number;
    avgNetwork: number;
  }>;
}

const ResourceTrends: React.FC<ResourceTrendsProps> = ({ data }) => {
  return (
    <Card title="Resource Utilization Trends">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => {
              const date = new Date(value);
              return date instanceof Date && !isNaN(date.getTime())
                ? date.toLocaleTimeString()
                : 'Invalid Date';
            }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => {
              const date = new Date(value);
              return date instanceof Date && !isNaN(date.getTime())
                ? date.toLocaleString()
                : 'Invalid Date';
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="avgCpu"
            name="Avg CPU Usage"
            stroke="#1890ff"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="avgMemory"
            name="Avg Memory Usage"
            stroke="#52c41a"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="avgDisk"
            name="Avg Disk Usage"
            stroke="#faad14"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="avgNetwork"
            name="Avg Network Usage"
            stroke="#f759ab"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ResourceTrends;

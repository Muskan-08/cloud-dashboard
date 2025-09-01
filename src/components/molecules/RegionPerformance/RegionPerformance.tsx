import React from 'react';
import { Card } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RegionPerformanceProps {
  data: Array<{
    region: string;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  }>;
}

const RegionPerformance: React.FC<RegionPerformanceProps> = ({ data }) => {
  return (
    <Card title="Regional Performance Comparison">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cpu" name="CPU Usage" fill="#1890ff" stroke="#1890ff" fillOpacity={0.6} />
          <Area type="monotone" dataKey="memory" name="Memory Usage" fill="#52c41a" stroke="#52c41a" fillOpacity={0.6} />
          <Area type="monotone" dataKey="disk" name="Disk Usage" fill="#faad14" stroke="#faad14" fillOpacity={0.6} />
          <Area type="monotone" dataKey="network" name="Network Usage" fill="#f759ab" stroke="#f759ab" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RegionPerformance;

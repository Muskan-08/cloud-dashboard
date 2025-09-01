import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActiveAlertsProps {
  data: Array<{
    name: string;
    alerts: number;
  }>;
}

export const ActiveAlerts: React.FC<ActiveAlertsProps> = ({ data }) => {
  return (
    <Card title="Active Alerts">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="alerts" fill="#ff4d4f" name="Alerts" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

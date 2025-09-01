import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricColors } from '../../../types/metrics.types';
import styles from './ServerMetrics.module.css';

interface ServerMetricsProps {
  data: Array<{
    timestamp: string;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  }>;
}

const ServerMetrics: React.FC<ServerMetricsProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke={MetricColors.cpu} />
          <Line type="monotone" dataKey="memory" stroke={MetricColors.memory} />
          <Line type="monotone" dataKey="disk" stroke={MetricColors.disk} />
          <Line type="monotone" dataKey="network" stroke={MetricColors.network} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServerMetrics;

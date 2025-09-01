import React from 'react';
import { Area } from 'recharts';

interface MetricAreaProps {
  metricName: string;
  color: string;
}

const MetricArea: React.FC<MetricAreaProps> = ({ metricName, color }) => {
  return (
    <Area
      type="monotone"
      dataKey={metricName}
      stackId="1"
      stroke={color}
      fill={color}
      fillOpacity={0.3}
    />
  );
};

export default MetricArea;

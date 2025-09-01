import React from 'react';
import { Line } from 'recharts';


interface MetricLineProps {
  metricName: string;
  color: string;
}

const MetricLine: React.FC<MetricLineProps> = ({ metricName, color }) => {
  return (
    <Line
      type="monotone"
      dataKey={metricName}
      stroke={color}
      strokeWidth={2}
      dot={{ fill: color, strokeWidth: 2, r: 4 }}
      activeDot={{ r: 6 }}
    />
  );
};

export default MetricLine;

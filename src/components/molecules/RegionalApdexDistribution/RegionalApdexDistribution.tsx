import { Card } from 'antd';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import styles from './RegionalApdexDistribution.module.css';

interface GeographicApdexData {
  region: string;
  apdex: number;
  servers: number;
}

interface RegionalApdexDistributionProps {
  data: GeographicApdexData[];
}

const COLORS = {
  'North America': '#0088FE',
  'Europe': '#00C49F',
  'Asia Pacific': '#FFBB28',
  'South America': '#FF8042'
};

export function RegionalApdexDistribution({ data }: RegionalApdexDistributionProps) {
  const transformedData = React.useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.apdex, 0);
    return data.map(item => ({
      ...item,
      percentage: (item.apdex / total) * 100
    }));
  }, [data]);

  return (

    <Card title="Regional Apdex Distribution">
      <div className={styles.container}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={transformedData}
            dataKey="apdex"
            nameKey="region"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} (${(percent ? (percent * 100).toFixed(0) : 0)}%)`}
          >
            {transformedData.map((entry) => (
              <Cell 
                key={entry.region} 
                fill={COLORS[entry.region as keyof typeof COLORS] || '#8884d8'} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [
              `Apdex: ${value.toFixed(2)}`,
              `Region: ${name}`
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
    </Card>
  );
}

export default RegionalApdexDistribution;

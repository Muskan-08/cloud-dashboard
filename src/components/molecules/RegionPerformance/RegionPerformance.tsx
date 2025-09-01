import React from 'react';
import { Card, Radio } from 'antd';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
  const [viewType, setViewType] = React.useState<'radar' | 'bar'>('radar');

  const colors = {
    cpu: '#1890ff',
    memory: '#52c41a',
    disk: '#faad14',
    network: '#f759ab'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#fff',
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ margin: '4px 0', color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RadarView = () => (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
        <PolarGrid />
        <PolarAngleAxis dataKey="region" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="CPU Usage"
          dataKey="cpu"
          stroke={colors.cpu}
          fill={colors.cpu}
          fillOpacity={0.3}
        />
        <Radar
          name="Memory Usage"
          dataKey="memory"
          stroke={colors.memory}
          fill={colors.memory}
          fillOpacity={0.3}
        />
        <Radar
          name="Disk Usage"
          dataKey="disk"
          stroke={colors.disk}
          fill={colors.disk}
          fillOpacity={0.3}
        />
        <Radar
          name="Network Usage"
          dataKey="network"
          stroke={colors.network}
          fill={colors.network}
          fillOpacity={0.3}
        />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );

  const BarView = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" angle={-45} textAnchor="end" interval={0} height={60} />
        <YAxis domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="cpu" name="CPU Usage" fill={colors.cpu} />
        <Bar dataKey="memory" name="Memory Usage" fill={colors.memory} />
        <Bar dataKey="disk" name="Disk Usage" fill={colors.disk} />
        <Bar dataKey="network" name="Network Usage" fill={colors.network} />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Card
      title="Regional Performance Comparison"
    >
       <div style={{ float: 'right', margin: 'unset', top: 60, right: 12 }}>
          <Radio.Group value={viewType} onChange={e => setViewType(e.target.value)}>
            <Radio.Button value="radar">Radar View</Radio.Button>
            <Radio.Button value="bar">Bar View</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{marginTop: '40px'}}>
          {viewType === 'radar' ? <RadarView /> : <BarView />}
        </div>
    </Card>
  );
};

export default RegionPerformance;

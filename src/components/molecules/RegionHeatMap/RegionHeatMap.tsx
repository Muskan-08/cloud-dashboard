import React from 'react';
import { Card } from 'antd';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface RegionHeatMapProps {
  data: Array<{
    name: string;
    servers: number;
    value: number;
    status: 'online' | 'offline' | 'warning' | 'maintenance';
  }>;
}

const RegionHeatMap: React.FC<RegionHeatMapProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'offline':
        return '#ff4d4f';
      case 'maintenance':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const CustomizedContent = (props: any) => {
    const { depth, x, y, width, height, name, servers, status } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getStatusColor(status),
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={12}
            >
              {`${servers} servers`}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <Card title="Regional Server Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={data}
          dataKey="value"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={CustomizedContent}
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </Card>
  );
};

export default RegionHeatMap;

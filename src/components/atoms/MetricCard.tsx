import React from 'react';
import { Card, Progress, Tooltip } from 'antd';
import { CloudServerOutlined, DatabaseOutlined, HddOutlined, GlobalOutlined } from '@ant-design/icons';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  showProgress?: boolean;
  size?: 'small' | 'default';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '%',
  icon,
  color = '#1890ff',
  showProgress = true,
  size = 'default',
}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (title.toLowerCase()) {
      case 'cpu':
        return <CloudServerOutlined />;
      case 'memory':
        return <DatabaseOutlined />;
      case 'disk':
        return <HddOutlined />;
      case 'network':
        return <GlobalOutlined />;
      default:
        return <CloudServerOutlined />;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return '#ff4d4f';
    if (value >= 75) return '#faad14';
    return '#52c41a';
  };

  return (
    <Card
      size={size}
      style={{ 
        height: size === 'small' ? '120px' : '140px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      bodyStyle={{ padding: size === 'small' ? '12px' : '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color, fontSize: size === 'small' ? '16px' : '18px', marginRight: '8px' }}>
          {getIcon()}
        </span>
        <span style={{ 
          fontSize: size === 'small' ? '12px' : '14px', 
          fontWeight: 500,
          color: '#666'
        }}>
          {title}
        </span>
      </div>
      
      <div style={{ 
        fontSize: size === 'small' ? '20px' : '24px', 
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#262626'
      }}>
        {value}{unit}
      </div>
      
      {showProgress && (
        <Tooltip title={`${value}%`}>
          <Progress
            percent={value}
            strokeColor={getProgressColor(value)}
            showInfo={false}
            size={size === 'small' ? 'small' : 'default'}
            strokeWidth={size === 'small' ? 4 : 6}
          />
        </Tooltip>
      )}
    </Card>
  );
};

export default MetricCard;

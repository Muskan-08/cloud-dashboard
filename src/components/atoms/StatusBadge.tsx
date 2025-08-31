import React from 'react';
import { Badge } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, StopOutlined, ToolOutlined } from '@ant-design/icons';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  size?: 'default' | 'small';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'default' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'Online',
        };
      case 'offline':
        return {
          color: 'error',
          icon: <StopOutlined />,
          text: 'Offline',
        };
      case 'maintenance':
        return {
          color: 'processing',
          icon: <ToolOutlined />,
          text: 'Maintenance',
        };
      case 'warning':
        return {
          color: 'warning',
          icon: <ExclamationCircleOutlined />,
          text: 'Warning',
        };
      default:
        return {
          color: 'default',
          icon: null,
          text: 'Unknown',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      status={config.color as any}
      text={
        <span style={{ fontSize: size === 'small' ? '12px' : '14px' }}>
          {config.icon} {config.text}
        </span>
      }
    />
  );
};

export default StatusBadge;

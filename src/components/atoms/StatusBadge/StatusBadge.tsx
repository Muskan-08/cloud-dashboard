import React from 'react';
import { Badge } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, StopOutlined, ToolOutlined } from '@ant-design/icons';
import { StatusBadgeProps } from './StatusBadge.types';
import styles from "./StatusBadge.module.css"

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
  const statusTextClassName = `${styles.statusText} ${size === 'small' ? styles.statusTextSmall : styles.statusTextDefault}`;

  return (
    <Badge
      status={config.color as any}
      text={
        <span className={statusTextClassName}>
          {config.icon} {config.text}
        </span>
      }
    />
  );
};

export default StatusBadge;

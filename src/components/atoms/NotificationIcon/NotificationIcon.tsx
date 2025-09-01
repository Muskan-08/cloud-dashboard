import React from 'react';
import { Badge } from 'antd';
import { CheckOutlined, BellOutlined } from '@ant-design/icons';
import styles from './NotificationIcon.module.css';

export interface NotificationIconProps {
  type: 'success' | 'warning' | 'error' | 'info';
  unread?: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type, unread = false }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckOutlined className={styles.icon} style={{ color: '#52c41a' }} />;
      case 'warning':
        return <BellOutlined className={styles.icon} style={{ color: '#faad14' }} />;
      case 'error':
        return <BellOutlined className={styles.icon} style={{ color: '#ff4d4f' }} />;
      case 'info':
        return <BellOutlined className={styles.icon} style={{ color: '#1890ff' }} />;
      default:
        return <BellOutlined className={styles.icon} style={{ color: '#262626' }} />;
    }
  };

  return (
    <Badge dot={unread} color={getNotificationColor(type)}>
      <span>{getIcon()}</span>
    </Badge>
  );
};

export const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success': return '#52c41a';
    case 'warning': return '#faad14';
    case 'error': return '#ff4d4f';
    case 'info': return '#1890ff';
    default: return '#d9d9d9';
  }
};

export default NotificationIcon;

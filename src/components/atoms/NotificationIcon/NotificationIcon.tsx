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
        return <CheckOutlined className={`${styles.icon} ${styles.iconGreen}`} />;
      case 'warning':
        return <BellOutlined className={`${styles.icon} ${styles.iconOrange}`} />;
      case 'error':
        return <BellOutlined className={`${styles.icon} ${styles.iconRed}`} />;
      case 'info':
        return <BellOutlined className={`${styles.icon} ${styles.iconBlue}`} />;
      default:
        return <BellOutlined className={`${styles.icon} ${styles.iconDark}`} />;
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

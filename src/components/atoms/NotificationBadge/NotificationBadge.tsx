import React from 'react';
import { Badge, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styles from './NotificationBadge.module.css';

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count === 0) {
    return (
      <Space className={styles.wrapper}>
        <BellOutlined />
        <span>Notifications</span>
      </Space>
    );
  }

  return (
    <Space className={styles.wrapper}>
      <BellOutlined />
      <span>Notifications</span>
      <Badge count={count} size="small" />
    </Space>
  );
};

export default NotificationBadge;

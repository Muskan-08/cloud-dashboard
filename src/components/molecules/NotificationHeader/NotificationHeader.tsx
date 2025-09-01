import React from 'react';
import { Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import NotificationBadge from '../../atoms/NotificationBadge/NotificationBadge';
import styles from './NotificationHeader.module.css';

interface NotificationHeaderProps {
  unreadCount: number;
  hasNotifications: boolean;
  onClearAll: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  hasNotifications,
  onClearAll,
}) => {
  return (
    <div className={styles.header}>
      <NotificationBadge count={unreadCount} />
      <Button 
        type="text" 
        icon={<ClearOutlined />} 
        onClick={onClearAll}
        disabled={!hasNotifications}
      >
        Clear All
      </Button>
    </div>
  );
};

export default NotificationHeader;

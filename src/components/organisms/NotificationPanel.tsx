import React from 'react';
import { Drawer } from 'antd';
import { Notification } from '../../types';
import NotificationHeader from '../molecules/NotificationHeader/NotificationHeader';
import NotificationGroup from '../molecules/NotificationGroup/NotificationGroup';
import EmptyNotifications from '../atoms/EmptyNotifications/EmptyNotifications';
import styles from './NotificationPanel.module.css';

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  visible,
  onClose,
  notifications,
  onDismiss,
  onMarkAsRead,
  onClearAll,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const renderContent = () => {
    if (notifications.length === 0) {
      return <EmptyNotifications />;
    }

    return (
      <div className={styles.content}>
        {Object.entries(groupedNotifications).map(([date, dayNotifications]) => (
          <NotificationGroup
            key={date}
            date={date}
            notifications={dayNotifications}
            onDismiss={onDismiss}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    );
  };

  return (
    <Drawer
      title={
        <NotificationHeader
          unreadCount={unreadCount}
          hasNotifications={notifications.length > 0}
          onClearAll={onClearAll}
        />
      }
      placement="right"
      width={400}
      onClose={onClose}
      open={visible}
      className={styles.drawer}
    >
      {renderContent()}
    </Drawer>
  );
};

export default NotificationPanel;

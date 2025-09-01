import React from 'react';
import { List } from 'antd';
import { Notification } from '../../../types';
import DateHeader from '../../atoms/DateHeader/DateHeader';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationGroup.module.css';

interface NotificationGroupProps {
  date: string;
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({
  date,
  notifications,

  onMarkAsRead,
}) => {
  return (
    <div className={styles.group}>
      <DateHeader date={date} />
      <List
        dataSource={notifications}
        renderItem={(notification) => (
          <NotificationItem
            title={notification.title}
            message={notification.message}
            timestamp={notification.timestamp}
            type={notification.type}
            read={notification.read}
            onClick={() => {
              !notification.read && onMarkAsRead(notification.id);
            }}
          />
        )}
        className={styles.list}
      />
    </div>
  );
};

export default NotificationGroup;

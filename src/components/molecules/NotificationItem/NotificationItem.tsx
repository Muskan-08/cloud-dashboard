import React from 'react';
import { Avatar, Badge, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import styles from './NotificationItem.module.css';
import { Notification } from '../../../types/notification.types';

const { Text, Paragraph } = Typography;

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  type: Notification['type'];
  read: boolean;
  onClick?: () => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined className={styles.successIcon} />;
    case 'warning':
      return <WarningOutlined className={styles.warningIcon} />;
    case 'error':
      return <ExclamationCircleOutlined className={styles.errorIcon} />;
    default:
      return <InfoCircleOutlined className={styles.infoIcon} />;
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  timestamp,
  type,
  read,
  onClick,
}) => {
  return (
    <div className={`${styles.notificationItem} ${!read ? styles.unread : ''}`} onClick={onClick}>
      <Badge dot={!read} offset={[-4, 4]}>
        <Avatar icon={getNotificationIcon(type)} className={styles.avatar} />
      </Badge>
      <div className={styles.content}>
        <div className={styles.header}>
          <Text strong>{title}</Text>
          <Text type="secondary" className={styles.timestamp}>
            {dayjs(timestamp).format('HH:mm')}
          </Text>
        </div>
        <Paragraph ellipsis={{ rows: 2 }} className={styles.message}>
          {message}
        </Paragraph>
      </div>
    </div>
  );
};

export default NotificationItem;

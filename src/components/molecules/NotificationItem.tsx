import React from 'react';
import { List, Badge, Button, Tooltip, Tag } from 'antd';
import { CloseOutlined, CheckOutlined, BellOutlined } from '@ant-design/icons';
import { Notification } from '../../types';
import dayjs from 'dayjs';

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDismiss,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <BellOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <BellOutlined style={{ color: '#ff4d4f' }} />;
      case 'info':
        return <BellOutlined style={{ color: '#1890ff' }} />;
      default:
        return <BellOutlined />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#ff4d4f';
      case 'info': return '#1890ff';
      default: return '#d9d9d9';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = dayjs();
    const notificationTime = dayjs(timestamp);
    const diffMinutes = now.diff(notificationTime, 'minute');
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = now.diff(notificationTime, 'hour');
    if (diffHours < 24) return `${diffHours}h ago`;
    return notificationTime.format('MMM DD, HH:mm');
  };

  return (
    <List.Item
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: notification.read ? '#fafafa' : '#fff',
        opacity: notification.read ? 0.7 : 1,
      }}
      actions={[
        !notification.read && (
          <Tooltip title="Mark as read">
            <Button
              type="text"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => onMarkAsRead(notification.id)}
            />
          </Tooltip>
        ),
        <Tooltip title="Dismiss">
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => onDismiss(notification.id)}
          />
        </Tooltip>,
      ].filter(Boolean)}
    >
      <List.Item.Meta
        avatar={
          <Badge dot={!notification.read} color={getNotificationColor(notification.type)}>
            {getNotificationIcon(notification.type)}
          </Badge>
        }
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: notification.read ? 400 : 600 }}>
              {notification.title}
            </span>
            <Tag color={getNotificationColor(notification.type)} style={{ fontSize: '12px', padding: '0 6px', height: '20px', lineHeight: '20px' }}>
              {notification.type.toUpperCase()}
            </Tag>
          </div>
        }
        description={
          <div>
            <div style={{ marginBottom: '4px', color: '#666' }}>
              {notification.message}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {formatTimestamp(notification.timestamp)}
            </div>
          </div>
        }
      />
    </List.Item>
  );
};

export default NotificationItem;

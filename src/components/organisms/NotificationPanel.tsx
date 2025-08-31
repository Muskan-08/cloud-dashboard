import React from 'react';
import { Drawer, List, Button, Typography, Empty, Badge, Space } from 'antd';
import { BellOutlined, ClearOutlined } from '@ant-design/icons';
import { Notification } from '../../types';
import NotificationItem from '../molecules/NotificationItem';

const { Title } = Typography;

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

  return (
    <Drawer
      title={
        <Space>
          <BellOutlined />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge count={unreadCount} size="small" />
          )}
        </Space>
      }
      placement="right"
      width={400}
      onClose={onClose}
      open={visible}
      extra={
        <Button 
          type="text" 
          icon={<ClearOutlined />} 
          onClick={onClearAll}
          disabled={notifications.length === 0}
        >
          Clear All
        </Button>
      }
    >
      {notifications.length === 0 ? (
        <Empty
          description="No notifications"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div style={{ height: '100%', overflow: 'auto' }}>
          {Object.entries(groupedNotifications).map(([date, dayNotifications]) => (
            <div key={date} style={{ marginBottom: '24px' }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#666' }}>
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Title>
              
              <List
                dataSource={dayNotifications}
                renderItem={(notification) => (
                  <NotificationItem
                    notification={notification}
                    onDismiss={onDismiss}
                    onMarkAsRead={onMarkAsRead}
                  />
                )}
                style={{ backgroundColor: '#fff' }}
              />
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default NotificationPanel;

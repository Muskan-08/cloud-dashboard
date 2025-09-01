import React from 'react';
import { Layout } from 'antd';
import DashboardHeader from '../DashboardHeader';

const { Header } = Layout;

interface AppHeaderProps {
  onRefresh: () => void;
  unreadNotifications: number;
  onNotificationsClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onRefresh,
  unreadNotifications,
  onNotificationsClick,
}) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
        right: 0
      }}
    >
      <DashboardHeader
        onRefresh={onRefresh}
        unreadNotifications={unreadNotifications}
        onNotificationsClick={onNotificationsClick}
      />
    </Header>
  );
};

export default AppHeader;

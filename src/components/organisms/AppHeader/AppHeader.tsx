import React from 'react';
import { Layout } from 'antd';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import { Server } from '../../../types';

const { Header } = Layout;

interface AppHeaderProps {
  onRefresh: () => void;
  unreadNotifications: number;
  onNotificationsClick: () => void;
  onServerLinked: (server: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>) => void;
  existingServers: Server[];
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onRefresh,
  unreadNotifications,
  onNotificationsClick,
  onServerLinked,
  existingServers,
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
        onServerLinked={onServerLinked}
        existingServers={existingServers}
      />
    </Header>
  );
};

export default AppHeader;

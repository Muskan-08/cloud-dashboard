import React, { useState } from 'react';
import { Layout, Typography, Button, Badge } from 'antd';
import { BellOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './DashboardHeader.module.css';
import cloudLogo from '../../../assets/cloud-logo.png';
import LinkServerForm from '../../molecules/LinkServerForm/LinkServerForm';
import { Server } from '../../../types';

const { Header } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  onRefresh: () => void;
  unreadNotifications: number;
  onNotificationsClick: () => void;
  onServerLinked: (server: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>) => void;
  existingServers: Server[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onRefresh,
  unreadNotifications,
  onNotificationsClick,
  onServerLinked,
  existingServers,
}) => {
  const [isLinkServerModalVisible, setIsLinkServerModalVisible] = useState(false);
  return (
    <Header className={styles.header}>
      <div className={styles.leftSection}>
        <img src={cloudLogo} alt="Cloud Logo" className={styles.logo} />
        <Title level={3} className={styles.title}>
          Cloud Dashboard
        </Title>
      </div>
      <div className={styles.rightSection}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsLinkServerModalVisible(true)}
          className={styles.linkServerButton}
        >
          Link Server
        </Button>
        <Button 
          type="text" 
          icon={<ReloadOutlined />} 
          onClick={onRefresh}
        />
        <Badge count={unreadNotifications}>
          <Button
            type="text"
            icon={<BellOutlined />}
            onClick={onNotificationsClick}
          />
        </Badge>
      </div>

      <LinkServerForm
        visible={isLinkServerModalVisible}
        onCancel={() => setIsLinkServerModalVisible(false)}
        onSubmit={(values) => {
          onServerLinked(values);
          setIsLinkServerModalVisible(false);
        }}
        existingServers={existingServers}
      />
    </Header>
  );
};

export default DashboardHeader;

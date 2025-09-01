import React from 'react';
import { Layout, Typography, Button, Badge } from 'antd';
import { BellOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './DashboardHeader.module.css';
import cloudLogo from '../../assets/cloud-logo.png';

const { Header } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  onRefresh: () => void;
  unreadNotifications: number;
  onNotificationsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onRefresh,
  unreadNotifications,
  onNotificationsClick,
}) => {
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
    </Header>
  );
};

export default DashboardHeader;

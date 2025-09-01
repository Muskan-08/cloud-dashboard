import React from 'react';
import { Row, Col, Switch, message } from 'antd';
import { Server } from '../../../types';
import styles from './ServerStatusOverview.module.css';

interface ServerStatusOverviewProps {
  servers: Server[];
  onServerToggle?: (serverName: string, newStatus: boolean) => void;
}

export const ServerStatusOverview: React.FC<ServerStatusOverviewProps> = ({ servers, onServerToggle }) => {
  const handleServerToggle = (serverName: string, checked: boolean) => {
    if (onServerToggle) {
      onServerToggle(serverName, checked);
      message.success(`Server ${serverName} ${checked ? 'started' : 'stopped'}`);
    }
  };
  return (
    <div className={styles.serverStatusOverview}>
      <h2>Server Status Overview</h2>
      <Row gutter={[16, 16]}>
        {servers.length === 0 ? (
          <Col span={24}>
            <div className={styles.noData}>
              No servers found matching your search criteria
            </div>
          </Col>
        ) : (
          servers.map((server) => (
          <Col key={server.name} xs={24} sm={12} md={8} lg={6}>
            <div className={styles.serverCard}>
              <div className={styles.serverHeader}>
                <h3>{server.name}</h3>
                <Switch
                  size='small'
                  checked={server.status === 'online'}
                  onChange={(checked) => handleServerToggle(server.name, checked)}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
              </div>
              <div className={styles.metrics}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>CPU:</span>
                  <span className={styles.metricValue} style={{ 
                    color: server.cpu > 80 ? '#ff4d4f' : server.cpu > 60 ? '#faad14' : '#52c41a' 
                  }}>
                    {server.cpu}%
                  </span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Memory:</span>
                  <span className={styles.metricValue} style={{ 
                    color: server.memory > 80 ? '#ff4d4f' : server.memory > 60 ? '#faad14' : '#52c41a' 
                  }}>
                    {server.memory}%
                  </span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Disk:</span>
                  <span className={styles.metricValue} style={{ 
                    color: server.disk > 80 ? '#ff4d4f' : server.disk > 60 ? '#faad14' : '#52c41a' 
                  }}>
                    {server.disk}%
                  </span>
                </div>
                <div className={`${styles.metricItem} ${styles.status}`}>
                  <span className={styles.metricLabel}>Status:</span>
                  <span className={styles[server.status === 'online' ? 'online' : 'offline']}>
                    {server.status}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        )))}
      </Row>
    </div>
  );
};

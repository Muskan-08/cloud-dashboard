import React from 'react';
import { Card } from 'antd';
import { Server } from '../../../types';
import ServerInfo from '../../atoms/ServerInfo/ServerInfo';
import ServerDetails from '../../atoms/ServerDetails/ServerDetails';
import ServerMetrics from '../ServerMetrics/ServerMetrics';
import ServerActions from '../../atoms/ServerActions/ServerActions';
import styles from './ServerCard.module.css';

interface ServerCardProps {
  server: Server;
  onViewDetails?: (server: Server) => void;
  onManage?: (server: Server) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ 
  server, 
  onViewDetails, 
  onManage 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#52c41a';
      case 'offline': return '#ff4d4f';
      case 'maintenance': return '#1890ff';
      case 'warning': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  return (
    <Card
      hoverable
      className={styles.card}
      style={{
        border: `2px solid ${getStatusColor(server.status)}20`,
      }}
      // className={styles.cardBody}
    >
      <div className={styles.content}>
        <ServerInfo
          name={server.name}
          status={server.status}
        />
        
        <ServerDetails
          region={server.region}
          account={server.account}
          uptime={server.uptime}
          lastUpdated={server.lastUpdated}
        />

        <ServerMetrics
          data={[
            {
              timestamp: new Date().toISOString(),
              cpu: server.cpu,
              memory: server.memory,
              disk: server.disk,
              network: server.network
            }
          ]}
        />

        <ServerActions
          server={server}
          onViewDetails={onViewDetails}
          onManage={onManage}
        />
      </div>
    </Card>
  );
};

export default ServerCard;

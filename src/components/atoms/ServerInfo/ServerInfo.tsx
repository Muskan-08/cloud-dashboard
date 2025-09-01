import React from 'react';
import StatusBadge from '../StatusBadge';
import styles from './ServerInfo.module.css';

interface ServerInfoProps {
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
}

const ServerInfo: React.FC<ServerInfoProps> = ({ name, status }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.name}>{name}</h3>
      <StatusBadge status={status} />
    </div>
  );
};

export default ServerInfo;

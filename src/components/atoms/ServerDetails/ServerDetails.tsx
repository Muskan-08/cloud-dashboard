import React from 'react';
import dayjs from 'dayjs';
import styles from './ServerDetails.module.css';

interface ServerDetailsProps {
  region: string;
  account: string;
  uptime: number;
  lastUpdated: string;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({
  region,
  account,
  uptime,
  lastUpdated,
}) => {
  const formatUptime = (uptime: number) => {
    if (uptime === 0) return '0%';
    return `${uptime.toFixed(1)}%`;
  };

  const formatLastUpdated = (timestamp: string) => {
    const now = dayjs();
    const updated = dayjs(timestamp);
    const diffMinutes = now.diff(updated, 'minute');
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = now.diff(updated, 'hour');
    if (diffHours < 24) return `${diffHours}h ago`;
    return updated.format('MMM DD, HH:mm');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <div>Region: {region}</div>
        <div>Account: {account}</div>
      </div>
      <div className={styles.metrics}>
        <div>Uptime: {formatUptime(uptime)}</div>
        <div>Updated: {formatLastUpdated(lastUpdated)}</div>
      </div>
    </div>
  );
};

export default ServerDetails;

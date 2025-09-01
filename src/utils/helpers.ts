import { Server } from '../types';
import { STATUS } from '../constants';

// Get status color based on server status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case STATUS.ONLINE:
      return '#52c41a';
    case STATUS.WARNING:
      return '#faad14';
    case STATUS.OFFLINE:
      return '#ff4d4f';
    default:
      return '#666';
  }
};

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Calculate server health percentage
export const calculateServerHealth = (server: Server): number => {
  const weights = {
    cpu: 0.3,
    memory: 0.3,
    disk: 0.2,
    network: 0.2
  };

  const cpuHealth = Math.max(0, 100 - server.cpu);
  const memoryHealth = Math.max(0, 100 - server.memory);
  const diskHealth = Math.max(0, 100 - server.disk);
  const networkHealth = Math.max(0, 100 - server.network);

  return Math.round(
    cpuHealth * weights.cpu +
    memoryHealth * weights.memory +
    diskHealth * weights.disk +
    networkHealth * weights.network
  );
};

// Format uptime percentage
export const formatUptime = (uptime: number): string => {
  return `${uptime.toFixed(2)}%`;
};

// Format date relative to now
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

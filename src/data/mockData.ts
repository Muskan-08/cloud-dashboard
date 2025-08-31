import { Server, Notification, ResourceMetrics } from '../types';
import dayjs from 'dayjs';

// Mock server data
export const mockServers: Server[] = [
  {
    id: '1',
    name: 'web-server-01',
    status: 'online',
    region: 'us-east-1',
    account: 'production',
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89,
    uptime: 99.8,
    lastUpdated: dayjs().subtract(2, 'minute').toISOString(),
  },
  {
    id: '2',
    name: 'db-server-01',
    status: 'online',
    region: 'us-east-1',
    account: 'production',
    cpu: 78,
    memory: 92,
    disk: 45,
    network: 34,
    uptime: 99.9,
    lastUpdated: dayjs().subtract(1, 'minute').toISOString(),
  },
  {
    id: '3',
    name: 'app-server-01',
    status: 'warning',
    region: 'us-west-2',
    account: 'staging',
    cpu: 95,
    memory: 88,
    disk: 67,
    network: 56,
    uptime: 98.5,
    lastUpdated: dayjs().subtract(30, 'second').toISOString(),
  },
  {
    id: '4',
    name: 'cache-server-01',
    status: 'offline',
    region: 'eu-west-1',
    account: 'production',
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    uptime: 0,
    lastUpdated: dayjs().subtract(5, 'minute').toISOString(),
  },
  {
    id: '5',
    name: 'load-balancer-01',
    status: 'maintenance',
    region: 'us-east-1',
    account: 'production',
    cpu: 12,
    memory: 23,
    disk: 8,
    network: 15,
    uptime: 99.2,
    lastUpdated: dayjs().subtract(10, 'minute').toISOString(),
  },
  {
    id: '6',
    name: 'monitoring-server-01',
    status: 'online',
    region: 'us-west-2',
    account: 'monitoring',
    cpu: 23,
    memory: 45,
    disk: 12,
    network: 78,
    uptime: 99.7,
    lastUpdated: dayjs().subtract(1, 'minute').toISOString(),
  },
  {
    id: '7',
    name: 'backup-server-01',
    status: 'online',
    region: 'eu-west-1',
    account: 'backup',
    cpu: 34,
    memory: 56,
    disk: 89,
    network: 23,
    uptime: 99.1,
    lastUpdated: dayjs().subtract(3, 'minute').toISOString(),
  },
  {
    id: '8',
    name: 'api-server-01',
    status: 'warning',
    region: 'us-east-1',
    account: 'production',
    cpu: 87,
    memory: 94,
    disk: 34,
    network: 67,
    uptime: 97.8,
    lastUpdated: dayjs().subtract(45, 'second').toISOString(),
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High CPU Usage',
    message: 'Server app-server-01 is experiencing high CPU usage (95%)',
    timestamp: dayjs().subtract(2, 'minute').toISOString(),
    read: false,
    serverId: '3',
  },
  {
    id: '2',
    type: 'error',
    title: 'Server Offline',
    message: 'Server cache-server-01 is offline and not responding',
    timestamp: dayjs().subtract(5, 'minute').toISOString(),
    read: false,
    serverId: '4',
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Scheduled maintenance for load-balancer-01 completed successfully',
    timestamp: dayjs().subtract(10, 'minute').toISOString(),
    read: true,
    serverId: '5',
  },
  {
    id: '4',
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Server db-server-01 memory usage is at 92%',
    timestamp: dayjs().subtract(15, 'minute').toISOString(),
    read: false,
    serverId: '2',
  },
  {
    id: '5',
    type: 'success',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully for all production servers',
    timestamp: dayjs().subtract(30, 'minute').toISOString(),
    read: true,
  },
];

// Generate mock metrics for the last 24 hours
export const generateMockMetrics = (_serverId: string): ResourceMetrics[] => {
  const metrics: ResourceMetrics[] = [];
  const now = dayjs();

  for (let i = 23; i >= 0; i--) {
    const timestamp = now.subtract(i, 'hour');
    metrics.push({
      timestamp: timestamp.toISOString(),
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
    });
  }

  return metrics;
};

// Generate random notifications for real-time simulation
export const generateRandomNotification = (): Notification => {
  const types: Array<'info' | 'warning' | 'error' | 'success'> = ['info', 'warning', 'error', 'success'];
  const messages = [
    'Server performance degraded',
    'Network latency increased',
    'Disk space running low',
    'Backup completed successfully',
    'Security scan completed',
    'New deployment successful',
    'SSL certificate expiring soon',
    'Database connection restored',
  ];

  const randomServer = mockServers[Math.floor(Math.random() * mockServers.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    id: Date.now().toString(),
    type,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
    message: `${message} on ${randomServer.name}`,
    timestamp: new Date().toISOString(),
    read: false,
    serverId: randomServer.id,
  };
};

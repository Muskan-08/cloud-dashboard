import { Server, Notification, DashboardStats } from '../types';
import dayjs from 'dayjs';

// Utility functions
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


interface ConsolidatedData {
  servers: Server[];
  notifications: Notification[];
  metrics: {
    hourly: {
      [serverId: string]: Array<{
        timestamp: string;
        cpu: number;
        memory: number;
        disk: number;
        network: number;
      }>;
    };
    daily: {
      [serverId: string]: Array<{
        timestamp: string;
        cpu: number;
        memory: number;
        disk: number;
        network: number;
      }>;
    };
    regional: {
      [region: string]: {
        servers: number;
        performance: number;
        latency: number;
        metrics: {
          cpu: number;
          memory: number;
          disk: number;
          network: number;
        };
      };
    };
  };
  stats: DashboardStats;
}

// Function to create a new server
export const createNewServer = (
  name: string,
  region: string,
  account: string
): Server => {
  const newServer: Server = {
    id: String(Date.now()), // Use timestamp as a simple unique ID
    name,
    status: 'online',
    region,
    account,
    cpu: getRandomValue(20, 60),
    memory: getRandomValue(30, 70),
    disk: getRandomValue(40, 80),
    network: getRandomValue(25, 65),
    uptime: getRandomValue(0, 100), // Between 0% and 100%
    lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  // Initialize metrics for the new server
  hourlyMetrics[newServer.id] = generateTimeSeriesData('hourly');
  dailyMetrics[newServer.id] = generateTimeSeriesData('daily');

  return newServer;
};

// Generate metrics data
const hourlyMetrics: { [key: string]: any } = {};
const dailyMetrics: { [key: string]: any } = {};

export const servers: Server[] = [
  {
    id: '1',
    name: 'web-server-01',
    status: 'online',
    region: 'us-north-1',
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
    region: 'us-east-2',
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
    region: 'us-south-2',
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
    region: 'us-north-1',
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
    region: 'us-south-2',
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
    region: 'eu-west-2',
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
    region: 'us-east-3',
    account: 'production',
    cpu: 87,
    memory: 94,
    disk: 34,
    network: 67,
    uptime: 97.8,
    lastUpdated: dayjs().subtract(45, 'second').toISOString(),
  },
];

const notifications: Notification[] = [
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

// Generate metrics data for each server
servers.forEach(server => {
  hourlyMetrics[server.id] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: dayjs().subtract(23 - i, 'hour').format('HH:mm'),
    cpu: getRandomValue(20, 95),
    memory: getRandomValue(30, 90),
    disk: getRandomValue(10, 85),
    network: getRandomValue(15, 95)
  }));

  dailyMetrics[server.id] = Array.from({ length: 7 }, (_, i) => ({
    timestamp: dayjs().subtract(6 - i, 'day').format('MM/DD'),
    cpu: getRandomValue(20, 95),
    memory: getRandomValue(30, 90),
    disk: getRandomValue(10, 85),
    network: getRandomValue(15, 95)
  }));
});

// Regional metrics data
const regionalMetrics: { [key: string]: any } = {
  'us-north-1': {
    servers: 12,
    performance: 95,
    latency: 25,
    metrics: {
      cpu: 65,
      memory: 72,
      disk: 45,
      network: 88
    }
  },
  'us-south-2': {
    servers: 8,
    performance: 92,
    latency: 45,
    metrics: {
      cpu: 58,
      memory: 65,
      disk: 52,
      network: 76
    }
  },
  'eu-south-1': {
    servers: 6,
    performance: 88,
    latency: 85,
    metrics: {
      cpu: 72,
      memory: 68,
      disk: 43,
      network: 82
    }
  }
};

// Calculate dashboard stats
const stats: DashboardStats = {
  totalServers: servers.length,
  onlineServers: servers.filter(s => s.status === 'online').length,
  offlineServers: servers.filter(s => s.status === 'offline').length,
  warningServers: servers.filter(s => s.status === 'warning').length,
  totalAlerts: notifications.filter(n => !n.read).length,
  averageCpu: Math.round(servers.reduce((acc, s) => acc + s.cpu, 0) / servers.length),
  averageMemory: Math.round(servers.reduce((acc, s) => acc + s.memory, 0) / servers.length),
  uptime: 0
};

// Helper function for time series data
export const generateTimeSeriesData = (timeSpan: 'hourly' | 'daily', days = 1) => {
  const data = [];
  const now = dayjs();
  const points = timeSpan === 'hourly' ? 24 : days;
  const interval = timeSpan === 'hourly' ? 'hour' : 'day';

  for (let i = points - 1; i >= 0; i--) {
    data.push({
      timestamp: now.subtract(i, interval).toISOString(),
      cpu: getRandomValue(20, 95),
      memory: getRandomValue(30, 90),
      disk: getRandomValue(10, 85),
      network: getRandomValue(15, 95),
      alerts: getRandomValue(0, 5)
    });
  }
  
  return data;
};

// Generate random notifications
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

  const randomServer = servers[Math.floor(Math.random() * servers.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    id: Date.now().toString(),
    type,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
    message: `${message} on ${randomServer.name}`,
    timestamp: dayjs().toISOString(),
    read: false,
    serverId: randomServer.id,
  };
};

// Export consolidated mock data
export const mockData: ConsolidatedData = {
  servers,
  notifications,
  metrics: {
    hourly: hourlyMetrics,
    daily: dailyMetrics,
    regional: regionalMetrics
  },
  stats
};

// Export individual elements for backward compatibility
export const mockServers = servers;
export const mockNotifications = notifications;
export const mockRegionalData = Object.entries(regionalMetrics).map(([region, data]) => ({
  region,
  servers: data.servers,
  performance: data.performance,
  latency: data.latency
}));

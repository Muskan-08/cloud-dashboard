import { Server, DashboardStats } from '../types';
import { createNewServer } from '../data/mockData';
import { message } from 'antd';
import dayjs from 'dayjs';

export const handleServerLink = (
  serverData: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>,
  currentServers: Server[],
  currentStats: DashboardStats,
  setServers: (servers: Server[]) => void,
  setStats: (stats: DashboardStats) => void
) => {
  try {
    const newServer = createNewServer(
      serverData.name,
      serverData.region,
      serverData.account
    );
    
    setServers([...currentServers, newServer]);
    
    message.success(`Server ${newServer.name} has been linked successfully!`);
    
    const totalServers = currentServers.length + 1;
    const onlineServers = currentServers.filter(s => s.status === 'online').length + 1;
    const offlineServers = currentServers.filter(s => s.status === 'offline').length;
    const warningServers = currentServers.filter(s => s.status === 'warning').length;
    const averageCpu = (currentServers.reduce((sum, s) => sum + s.cpu, 0) + newServer.cpu) / totalServers;
    const averageMemory = (currentServers.reduce((sum, s) => sum + s.memory, 0) + newServer.memory) / totalServers;
    const uptime = (currentServers.reduce((sum, s) => sum + s.uptime, 0) + newServer.uptime) / totalServers;

    setStats({
      ...currentStats,
      totalServers,
      onlineServers,
      offlineServers,
      warningServers,
      averageCpu,
      averageMemory,
      uptime
    });

  } catch (error) {
    message.error('Failed to link server. Please try again.');
    console.error('Error linking server:', error);
  }
};

export const initializeDashboardData = async (
  servers: Server[],
  mockServers: Server[],
  mockNotifications: any[],
  setLoading: (loading: boolean) => void,
  setServers: (servers: Server[]) => void,
  setNotifications: (notifications: any[]) => void,
  setStats: (stats: DashboardStats) => void,
  setError: (error: string | null) => void
) => {
  try {
    setLoading(true);
    
    if (servers.length === 0) {
      setServers(mockServers);
    }
    
    setNotifications(mockNotifications);
    
    const currentServers = servers.length > 0 ? servers : mockServers;
    const totalServers = currentServers.length;
    const onlineServers = currentServers.filter(s => s.status === 'online').length;
    const offlineServers = currentServers.filter(s => s.status === 'offline').length;
    const warningServers = currentServers.filter(s => s.status === 'warning').length;
    const totalAlerts = mockNotifications.filter(n => !n.read).length;
    const averageCpu = currentServers.reduce((sum, s) => sum + s.cpu, 0) / totalServers;
    const averageMemory = currentServers.reduce((sum, s) => sum + s.memory, 0) / totalServers;
    
    setStats({
      totalServers,
      onlineServers,
      offlineServers,
      warningServers,
      totalAlerts,
      averageCpu: Math.round(averageCpu),
      averageMemory: Math.round(averageMemory),
      uptime: 0
    });
  } catch (err) {
    setError('Failed to load dashboard data');
    message.error('Failed to load dashboard data');
  } finally {
    setLoading(false);
  }
};

export const getGeographicApdexData = () => [
  { region: 'North America', apdex: 0.50, servers: 20 },
  { region: 'Europe', apdex: 0.89, servers: 15 },
  { region: 'Asia Pacific', apdex: 0.88, servers: 18 },
  { region: 'South America', apdex: 0.85, servers: 8 }
];

export const getChartData = (generateTimeSeriesData: (period: 'hourly' | 'daily') => any[]) => {
  return generateTimeSeriesData('hourly').map(data => ({
    name: dayjs(data.timestamp).format('HH:mm'),
    alerts: data.alerts
  }));
};

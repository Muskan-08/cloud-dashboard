import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Spin, Empty, message, Card } from 'antd';
import dayjs from 'dayjs';
const { Content } = Layout;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useDashboard } from '../hooks/useDashboard';
import { 
  mockServers, 
  mockNotifications, 
  generateRandomNotification, 
  generateTimeSeriesData,
  mockRegionalData} from '../data/mockData';
import { Server, ResourceMetrics } from '../types';

import NotificationPanel from '../components/organisms/NotificationPanel';
import StatsOverview from '../components/organisms/StatsOverview';
import AppSider from '../components/organisms/AppSider';
import AppHeader from '../components/organisms/AppHeader';

import RegionPerformance from '../components/molecules/RegionPerformance/RegionPerformance';
import ResourceTrends from '../components/molecules/ResourceTrends/ResourceTrends';
import { RegionalApdexDistribution } from '../components/molecules/RegionalApdexDistribution/RegionalApdexDistribution';

const Dashboard: React.FC = () => {
  const {

    loading,
    error,
    setServers,
    setNotifications,
    addNotification,
    setLoading,
    setError,
    setStats,
    stats,
    notifications,
    unreadNotifications,
  } = useDashboard();

  // State for managing selected server and its metrics
  const [selectedServer, _setSelectedServer] = useState<Server | null>(null);
  const [_serverMetrics, setServerMetrics] = useState<ResourceMetrics[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Transform the data for the Regional Apdex Distribution chart
  const geographicApdexData = React.useMemo(() => [
    { region: 'North America', apdex: 0.50, servers: 20 },
    { region: 'Europe', apdex: 0.89, servers: 15 },
    { region: 'Asia Pacific', apdex: 0.88, servers: 18 },
    { region: 'South America', apdex: 0.85, servers: 8 }
  ], []);

  // Generate time series data for alerts
  const chartData = React.useMemo(() => {
    return generateTimeSeriesData('hourly').map(data => ({
      name: dayjs(data.timestamp).format('HH:mm'),
      alerts: data.alerts
    }));
  }, []);

  const initializeData = useCallback(async () => {
    try {
      setLoading(true);
      setServers(mockServers);
      setNotifications(mockNotifications);
      
      // Calculate stats after setting data
      const totalServers = mockServers.length;
      const onlineServers = mockServers.filter(s => s.status === 'online').length;
      const offlineServers = mockServers.filter(s => s.status === 'offline').length;
      const warningServers = mockServers.filter(s => s.status === 'warning').length;
      const totalAlerts = mockNotifications.filter(n => !n.read).length;
      const averageCpu = mockServers.reduce((sum, s) => sum + s.cpu, 0) / totalServers;
      const averageMemory = mockServers.reduce((sum, s) => sum + s.memory, 0) / totalServers;
      
      setStats({
        totalServers,
        onlineServers,
        offlineServers,
        warningServers,
        totalAlerts,
        averageCpu: Math.round(averageCpu),
        averageMemory: Math.round(averageMemory),
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (selectedServer) {
        const newMetrics = generateTimeSeriesData('hourly');
        setServerMetrics(newMetrics);
      }
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, [selectedServer]);

  // Simulated real-time notifications
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        const newNotification = generateRandomNotification();
        addNotification(newNotification);
        message.info(`New notification: ${newNotification.title}`);
      }
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, [addNotification]);


  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Empty description={error} />
      </div>
    );
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider
          collapsed={collapsed}
          onCollapse={setCollapsed}
          selectedKey="dashboard"
          onSelect={() => {}}
        />
        <Layout style={{ 
          marginLeft: collapsed ? 80 : 240,
          transition: 'margin-left 0.2s'
        }}>
          <div style={{ height: 64 }} /> {/* Spacer for fixed header */}
          <AppHeader
            onRefresh={initializeData}
            unreadNotifications={unreadNotifications().length}
            onNotificationsClick={() => setNotificationDrawerOpen(true)}
          />
          <Content style={{ margin: '24px', minHeight: 280 }}>
            <StatsOverview stats={stats} />
            {/* New Visualization Row */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '24px' }}>
              <div style={{ flex: '2' }}>
                <RegionalApdexDistribution data={geographicApdexData} />
              </div>
              <div style={{ flex: '2' }}>
                <Card title="Active Alerts">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="alerts" fill="#ff4d4f" name="Alerts" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </div>

            {/* Performance Comparison and Resource Trends */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
              <div style={{ flex: 1 }}>
                <RegionPerformance
                  data={mockRegionalData.map(data => ({
                    region: data.region,
                    cpu: data.performance,
                    memory: Math.round(data.performance * 0.8),
                    disk: Math.round(data.performance * 0.7),
                    network: Math.round(data.performance * 0.9)
                  }))}
                />
              </div>
              <div style={{ flex: 1 }}>
                <ResourceTrends
                  data={generateTimeSeriesData('hourly').map(data => ({
                    timestamp: data.timestamp,
                    avgCpu: data.cpu,
                    avgMemory: data.memory,
                    avgDisk: data.disk,
                    avgNetwork: data.network
                  }))}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <NotificationPanel
        visible={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        notifications={notifications}
        onDismiss={(id) => {
          setNotifications(notifications.filter(n => n.id !== id));
        }}
        onMarkAsRead={(id) => {
          setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        }}
        onClearAll={() => {
          setNotifications([]);
        }}
      />
    </>
  );
};

export default Dashboard;

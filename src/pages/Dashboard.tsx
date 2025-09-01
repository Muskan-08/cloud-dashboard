import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Spin, Empty, message } from 'antd';
const { Content } = Layout;
import styles from '../styles/Dashboard.module.css';

import { useDashboard } from '../hooks/useDashboard';
import { 
  mockServers, 
  mockNotifications, 
  generateRandomNotification, 
  generateTimeSeriesData,
  mockRegionalData } from '../data/mockData';
import { Server, ResourceMetrics } from '../types';
import { 
  handleServerLink,
  initializeDashboardData,
  getGeographicApdexData,
  getChartData
} from '../utils/dashboardHelpers';

import NotificationPanel from '../components/organisms/NotificationPanel/NotificationPanel';
import StatsOverview from '../components/organisms/StatsOverview/StatsOverview';
import AppSider from '../components/organisms/AppSider';
import AppHeader from '../components/organisms/AppHeader';

import RegionPerformance from '../components/molecules/RegionPerformance/RegionPerformance';
import ResourceTrends from '../components/molecules/ResourceTrends/ResourceTrends';
import { RegionalApdexDistribution } from '../components/molecules/RegionalApdexDistribution/RegionalApdexDistribution';
import { ActiveAlerts } from '../components/molecules/ActiveAlerts/ActiveAlerts';

const Dashboard: React.FC = () => {
  const {
    servers,
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

  const handleServerLinked = (serverData: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>) => {
    handleServerLink(serverData, servers, stats, setServers, setStats);
  };

  const [selectedServer, _setSelectedServer] = useState<Server | null>(null);
  const [_serverMetrics, setServerMetrics] = useState<ResourceMetrics[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  const geographicApdexData = React.useMemo(() => getGeographicApdexData(), []);

  const chartData = React.useMemo(() => getChartData(generateTimeSeriesData), []);

  const initializeData = useCallback(async () => {
    await initializeDashboardData(
      servers,
      mockServers,
      mockNotifications,
      setLoading,
      setServers,
      setNotifications,
      setStats,
      setError
    );
  }, [servers]);

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
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingContainer}>
        <Empty description={error} />
      </div>
    );
  }

  return (
    <>
      <Layout className={styles.layout}>
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
          <div className={styles.headerSpacer} />
          <AppHeader
            onRefresh={initializeData}
            unreadNotifications={unreadNotifications().length}
            onNotificationsClick={() => setNotificationDrawerOpen(true)}
            onServerLinked={handleServerLinked}
            existingServers={servers}
          />
          <Content className={styles.contentArea}>
            <StatsOverview stats={stats} />
            <div className={styles.metricsContainer}>
              <div className={styles.metricsSection}>
                <RegionalApdexDistribution data={geographicApdexData} />
              </div>
              <div className={styles.metricsSection}>
                <ActiveAlerts data={chartData} />
              </div>
            </div>

            <div className={styles.statsContainer}>
              <div className={styles.statsSection}>
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
              <div className={styles.statsSection2}>
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

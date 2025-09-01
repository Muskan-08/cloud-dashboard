import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Row, Col, Card, Table, Select } from 'antd';
import { Line } from '@ant-design/plots';
import { useDispatch } from 'react-redux';
import { toggleServerStatus } from '../store/slices/dashboardSlice';
import SearchInput from '../components/atoms/SearchInput/SearchInput';
import styles from '../styles/ServerOverview.module.css';
import AppSider from '../components/organisms/AppSider';
import AppHeader from '../components/organisms/AppHeader';
import { ServerStatusOverview } from '../components/organisms/ServerStatusOverview';
import { handleServerLink } from '../utils/dashboardHelpers';
import { 
  filterServers,
  transformChartData,
  getChartConfig,
  getTableColumns,
  metricOptions 
} from '../utils/serverOverviewHelpers';

const { Option } = Select;
const { Content } = Layout;

import { servers as mockServers } from '../data/mockData';
import { useDashboard } from '../hooks/useDashboard';
import { Server } from '../types';
import NotificationPanel from '../components/organisms/NotificationPanel/NotificationPanel';

const ServerOverview: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('cpu');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  // const { servers, notifications } = useSelector(selectDashboardState);

    const {
      servers,
      setServers,
      setStats,
      stats,
      notifications,
      unreadNotifications,
      setNotifications
    } = useDashboard();
  
    const handleServerLinked = (serverData: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>) => {
      handleServerLink(serverData, servers, stats, setServers, setStats);
    };

  // Filter servers based on search query
  const filteredServers = useMemo(() => filterServers(servers, searchQuery), [servers, searchQuery]);

  useEffect(() => {
    // Initialize servers from mock data if not already present
    if (servers.length === 0) {
      dispatch(setServers(mockServers));
    }
  }, [dispatch, servers.length]);
  

  const handleServerToggle = (serverName: string, newStatus: boolean) => {
    console.log('Toggling server:', serverName, 'to status:', newStatus);
    dispatch(toggleServerStatus({ serverName, status: newStatus }));
  };

  // Transform server data for the line chart
  const chartData = transformChartData(filteredServers, selectedMetric);

  // Configure line chart
  const chartConfig = getChartConfig(chartData);

  // Table columns configuration
  const columns = getTableColumns();

  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout className={styles.layout}>
      <AppSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        selectedKey="servers"
        onSelect={() => {}}
      />
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 240,
        transition: 'margin-left 0.2s'
      }}>
        <div className={styles.headerSpacer} />
        <AppHeader
          onRefresh={() => dispatch(setServers(mockServers))}
          unreadNotifications={unreadNotifications().length}
          onNotificationsClick={() => setNotificationDrawerOpen(true)}
          onServerLinked={handleServerLinked}
          existingServers={servers}
        />
        <Content className={styles.contentArea}>
          <div className={styles.container}>
            <Row gutter={[16, 16]} className={styles.searchRow} justify="end">
              <Col span={8}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by server name or region..."
                />
              </Col>
            </Row>
            <ServerStatusOverview servers={filteredServers} onServerToggle={handleServerToggle} />
            
            <h1 className={styles.metricsTitle}>Server Metrics Overview</h1>
            
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card 
                  title="Server Metrics Visualization"
                  extra={
                    <Select
                      value={selectedMetric}
                      onChange={setSelectedMetric}
                      className={styles.select}
                    >
                {metricOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            }
          >
            <Line {...chartConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.metricsRow}>
        <Col span={24}>
          <Card title="Detailed Server Metrics">
            <Table 
              dataSource={filteredServers}
              columns={columns}
              rowKey="id"
              pagination={false}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </div>
        </Content>
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
      </Layout>
    </Layout>
  );
};

export default ServerOverview;

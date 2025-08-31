import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, Spin, Empty, Modal, message, Card, Badge, Button, Typography, Avatar, Menu } from 'antd';
import { 
  SearchOutlined, 
  DashboardOutlined, 
  CloudOutlined, 
  GlobalOutlined, 
  DatabaseOutlined, 
  SettingOutlined, 
  BellOutlined, 
  QuestionCircleOutlined, 
  UserOutlined,
  MenuOutlined,
  LeftOutlined,
  RightOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { useDashboard } from '../hooks/useDashboard';
import { mockServers, mockNotifications, generateRandomNotification, generateMockMetrics } from '../data/mockData';
import { Server } from '../types';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/atoms/ThemeToggle';

const { Content, Sider } = Layout;
const { Text } = Typography;

const Dashboard: React.FC = () => {
  const { themeConfig } = useTheme();
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
    filteredServers,
    unreadNotifications,
  } = useDashboard();

  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [serverMetrics, setServerMetrics] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [timeRange] = useState('Last 7 days');

  // Mock data for charts
  const cpuUsageData = [
    { time: '00:00', cpu: 45, memory: 67, disk: 23 },
    { time: '04:00', cpu: 52, memory: 71, disk: 28 },
    { time: '08:00', cpu: 78, memory: 89, disk: 45 },
    { time: '12:00', cpu: 85, memory: 92, disk: 67 },
    { time: '16:00', cpu: 91, memory: 95, disk: 78 },
    { time: '20:00', cpu: 67, memory: 73, disk: 34 },
    { time: '24:00', cpu: 45, memory: 67, disk: 23 },
  ];

  const regionUsageData = [
    { region: 'US East', requests: 22.3, calls: 5, unmonitored: 0 },
    { region: 'US West', requests: 18.7, calls: 3, unmonitored: 1 },
    { region: 'Europe', requests: 15.2, calls: 2, unmonitored: 0 },
    { region: 'Asia', requests: 12.8, calls: 4, unmonitored: 2 },
  ];

  const thirdPartyData = [
    { time: '12:00', cfapps: 88.9, dynatrace: 74.1, google: 73.4 },
    { time: '12:30', cfapps: 92.3, dynatrace: 78.5, google: 76.8 },
    { time: '13:00', cfapps: 89.7, dynatrace: 75.2, google: 74.1 },
    { time: '13:30', cfapps: 91.4, dynatrace: 77.8, google: 75.9 },
  ];

  const apdexData = [
    { region: 'North America', score: 0.95, color: '#52c41a' },
    { region: 'Europe', score: 0.87, color: '#faad14' },
    { region: 'Asia Pacific', score: 0.78, color: '#ff4d4f' },
    { region: 'South America', score: 0.92, color: '#52c41a' },
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setServers(mockServers);
        setNotifications(mockNotifications);
        
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
      }
    };

    initializeData();
  }, [setServers, setNotifications, setStats, setLoading, setError]);

  // Simulate real-time notifications
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

  // Update server metrics periodically
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (servers.length > 0) {
        const updatedServers = servers.map(server => ({
          ...server,
          cpu: Math.min(100, Math.max(0, server.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.min(100, Math.max(0, server.memory + (Math.random() - 0.5) * 8)),
          disk: Math.min(100, Math.max(0, server.disk + (Math.random() - 0.5) * 5)),
          network: Math.min(100, Math.max(0, server.network + (Math.random() - 0.5) * 15)),
          lastUpdated: new Date().toISOString(),
        }));
        setServers(updatedServers);
      }
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, [servers, setServers]);

  const handleViewServerDetails = useCallback((server: Server) => {
    setSelectedServer(server);
    const metrics = generateMockMetrics(server.id);
    setServerMetrics(metrics);
  }, []);

  if (error) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '24px', textAlign: 'center' }}>
          <Empty description={error} />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ height: '100vh', background: themeConfig.colorBgContainer, position: 'fixed', width: '100%', top: 0, left: 0 }}>
      {/* Top Navigation Bar */}
      <div style={{ 
        background: themeConfig.topBarBackground, 
        padding: '12px 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: `1px solid ${themeConfig.colorBorder}`,
        position: 'fixed',
        width: '100%',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            style={{ color: themeConfig.colorText }}
            onClick={() => setCollapsed(!collapsed)}
          />
          <SearchOutlined style={{ color: themeConfig.colorTextSecondary, fontSize: '16px' }} />
          <input 
            placeholder="Search your environment..." 
            style={{
              background: themeConfig.colorBgElevated,
              border: 'none',
              color: themeConfig.colorText,
              padding: '8px 12px',
              borderRadius: '4px',
              width: '300px',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button 
              type="text" 
              icon={<LeftOutlined />} 
              style={{ color: themeConfig.colorText }}
            />
            <Text style={{ color: themeConfig.colorText }}>{timeRange}</Text>
            <Button 
              type="text" 
              icon={<RightOutlined />} 
              style={{ color: themeConfig.colorText }}
            />
          </div>
          
          <Badge count={unreadNotifications().length} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              style={{ color: themeConfig.colorText, fontSize: '18px' }}
            />
          </Badge>
          
          <ThemeToggle />
          
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined />} 
            style={{ color: themeConfig.colorText }}
          />
          
          <Avatar icon={<UserOutlined />} style={{ background: themeConfig.colorPrimary }} />
        </div>
      </div>

      <Layout style={{ marginTop: '64px', height: 'calc(100vh - 64px)' }}>
        {/* Left Sidebar */}
        <Sider 
          collapsed={collapsed} 
          style={{ 
            background: themeConfig.sidebarBackground,
            borderRight: `1px solid ${themeConfig.colorBorder}`,
            height: '100%',
            position: 'fixed',
            left: 0,
            top: '64px',
            bottom: 0,
            overflow: 'auto'
          }}
          width={200}
        >
          <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              style={{
                background: 'transparent',
                border: 'none',
                color: themeConfig.colorText
              }}
              items={[
                {
                  key: 'search',
                  icon: <SearchOutlined />,
                  label: 'Search',
                  onClick: () => message.info('Search functionality coming soon')
                },
                {
                  key: 'dashboard',
                  icon: <DashboardOutlined />,
                  label: 'Dashboard'
                },
                {
                  type: 'divider'
                },
                {
                  key: 'services',
                  icon: <CloudOutlined />,
                  label: 'Services',
                  onClick: () => Modal.info({
                    title: 'Services',
                    content: 'Service management coming soon'
                  })
                },
                {
                  key: 'monitoring',
                  icon: <GlobalOutlined />,
                  label: 'Monitoring',
                  onClick: () => Modal.info({
                    title: 'Monitoring',
                    content: 'System monitoring dashboard coming soon'
                  })
                },
                {
                  key: 'cloud',
                  icon: <CloudOutlined />,
                  label: 'Cloud',
                  onClick: () => Modal.info({
                    title: 'Cloud Resources',
                    content: 'Cloud resource management coming soon'
                  })
                },
                {
                  key: 'reports',
                  icon: <DatabaseOutlined />,
                  label: 'Reports',
                  onClick: () => Modal.info({
                    title: 'Reports',
                    content: 'Analytics and reporting coming soon'
                  })
                },
                {
                  key: 'infrastructure',
                  icon: <SettingOutlined />,
                  label: 'Infrastructure',
                  onClick: () => Modal.info({
                    title: 'Infrastructure Settings',
                    content: 'Infrastructure management coming soon'
                  })
                },
                {
                  key: 'apis',
                  icon: <ApiOutlined />,
                  label: 'APIs',
                  onClick: () => Modal.info({
                    title: 'API Management',
                    content: 'API documentation and management coming soon'
                  })
                }
              ]}
            />
            
            <Menu
              mode="inline"
              style={{
                background: 'transparent',
                border: 'none',
                marginTop: 'auto',
                color: themeConfig.colorText
              }}
              items={[
                {
                  key: 'help',
                  icon: <QuestionCircleOutlined />,
                  label: 'Help & Support',
                  onClick: () => Modal.info({
                    title: 'Help & Support',
                    content: 'Documentation and help resources coming soon'
                  })
                },
                {
                  key: 'user',
                  icon: <UserOutlined />,
                  label: 'User Settings',
                  onClick: () => Modal.info({
                    title: 'User Settings',
                    content: 'Profile and preferences coming soon'
                  })
                }
              ]}
            />
          </div>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content style={{ 
            padding: '24px',
            background: themeConfig.colorBgContainer,
            marginLeft: collapsed ? '80px' : '200px',
            overflow: 'auto',
            height: '100%'
          }}>
            <Spin spinning={loading} size="large">
              <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <Row gutter={[24, 24]}>
                  {/* Column 1: Quick Overview */}
                  <Col xs={24} lg={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Card 
                        style={{ background: themeConfig.cardBackground, border: `1px solid ${themeConfig.cardBorder}` }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: themeConfig.colorText, fontSize: '14px' }}>Problems</Text>
                          <Badge count="1" style={{ background: themeConfig.errorColor }} />
                        </div>
                        <Text style={{ color: themeConfig.colorTextSecondary, fontSize: '12px' }}>1/313</Text>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: '#fff', fontSize: '14px' }}>Hosts</Text>
                          <Badge count="1" style={{ background: '#faad14' }} />
                        </div>
                        <Text style={{ color: '#666', fontSize: '12px' }}>1/31</Text>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: '#52c41a', fontSize: '14px' }}>Web checks</Text>
                        </div>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>All fine</Text>
                        <Text style={{ color: '#666', fontSize: '12px' }}>12</Text>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: '#52c41a', fontSize: '14px' }}>Applications</Text>
                        </div>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>All fine</Text>
                        <Text style={{ color: '#666', fontSize: '12px' }}>21</Text>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: '#52c41a', fontSize: '14px' }}>Services</Text>
                        </div>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>All fine</Text>
                        <Text style={{ color: '#666', fontSize: '12px' }}>115</Text>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(6, 1fr)', 
                          gap: '2px', 
                          marginTop: '8px' 
                        }}>
                          {Array.from({ length: 36 }, (_, i) => (
                            <div key={i} style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: '#52c41a', 
                              borderRadius: '2px' 
                            }} />
                          ))}
                        </div>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text style={{ color: '#52c41a', fontSize: '14px' }}>Databases</Text>
                        </div>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>All fine</Text>
                        <Text style={{ color: '#666', fontSize: '12px' }}>10</Text>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(5, 1fr)', 
                          gap: '2px', 
                          marginTop: '8px' 
                        }}>
                          {Array.from({ length: 25 }, (_, i) => (
                            <div key={i} style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: '#52c41a', 
                              borderRadius: '2px' 
                            }} />
                          ))}
                        </div>
                      </Card>

                      <Card 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ marginBottom: '8px' }}>
                          <Text style={{ color: '#fff', fontSize: '14px' }}>Smartscape</Text>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '60px', 
                          background: 'linear-gradient(45deg, #1890ff, #40a9ff)',
                          borderRadius: '4px',
                          opacity: 0.7
                        }} />
                        <Text style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>204 Processes</Text>
                      </Card>
                    </div>
                  </Col>

                  {/* Column 2: Cloud & Infrastructure */}
                  <Col xs={24} lg={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Card 
                        title="AWS account" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '4px' }}>demo environment</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>1 RDS instances</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>1 Load balancers</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>12 EC2 instances</Text>
                      </Card>

                      <Card 
                        title="VMware vCenter" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '4px' }}>emea-gdn-vc002</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>Migrations: Last Mon 2, Today 2</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>Guests: Last Mon 11, Today 11</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>2 ESXi hosts</Text>
                      </Card>

                      <Card 
                        title="Database" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '4px' }}>easyTravelBusiness (Derby Client)</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>112 /min Transactions</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>845 /min Statements</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block' }}>1 ms Response time</Text>
                      </Card>

                      <Card 
                        title="Docker" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block', marginBottom: '8px' }}>3 Docker hosts</Text>
                        <div style={{ marginBottom: '8px' }}>
                          <Text style={{ color: '#666', fontSize: '12px', display: 'block' }}>Containers</Text>
                          <div style={{ 
                            width: '100%', 
                            height: '20px', 
                            background: '#404040', 
                            borderRadius: '2px',
                            position: 'relative'
                          }}>
                            <div style={{ 
                              width: '60%', 
                              height: '100%', 
                              background: '#1890ff', 
                              borderRadius: '2px' 
                            }} />
                          </div>
                          <Text style={{ color: '#666', fontSize: '10px' }}>last Mon 24, now 24</Text>
                        </div>
                        <div>
                          <Text style={{ color: '#666', fontSize: '12px', display: 'block' }}>Images</Text>
                          <div style={{ 
                            width: '100%', 
                            height: '20px', 
                            background: '#404040', 
                            borderRadius: '2px',
                            position: 'relative'
                          }}>
                            <div style={{ 
                              width: '40%', 
                              height: '100%', 
                              background: '#1890ff', 
                              borderRadius: '2px' 
                            }} />
                          </div>
                          <Text style={{ color: '#666', fontSize: '10px' }}>last Mon 5, now 5</Text>
                        </div>
                      </Card>
                    </div>
                  </Col>

                  {/* Column 3: Application Health */}
                  <Col xs={24} lg={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Card 
                        title="Action duration" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '8px' }}>www.easytravel.com</Text>
                        <div style={{ 
                          width: '100%', 
                          height: '120px', 
                          background: 'linear-gradient(135deg, #722ed1, #b37feb, #d3adf7)',
                          borderRadius: '4px',
                          opacity: 0.8
                        }} />
                      </Card>

                      <Card 
                        title="Services" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block', marginBottom: '4px' }}>104 Web</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block', marginBottom: '4px' }}>1 Messaging</Text>
                        <Text style={{ color: '#fff', fontSize: '12px', display: 'block', marginBottom: '8px' }}>6 RMI/Custom</Text>
                        
                        <div style={{ marginBottom: '16px' }}>
                          <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={[
                              { date: '18. Jul', value: 65 },
                              { date: '20. Jul', value: 78 },
                              { date: '22. Jul', value: 45 },
                              { date: '24. Jul', value: 92 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.chartGridColor} />
                              <XAxis dataKey="date" stroke={themeConfig.chartTextColor} fontSize={10} />
                              <YAxis stroke={themeConfig.chartTextColor} fontSize={10} />
                              <Bar dataKey="value" fill={themeConfig.colorPrimary} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <Text style={{ color: '#666', fontSize: '10px', display: 'block' }}>Monitored requests: 22.3k/min</Text>
                        <Text style={{ color: '#666', fontSize: '10px', display: 'block' }}>Calls to Internet: 5/min</Text>
                        <Text style={{ color: '#666', fontSize: '10px', display: 'block' }}>Calls to unmonitored hosts: 0/min</Text>
                      </Card>
                    </div>
                  </Col>

                  {/* Column 4: User Experience */}
                  <Col xs={24} lg={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Card 
                        title="Apdex" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '8px' }}>www.easytravel.com</Text>
                        <div style={{ 
                          width: '100%', 
                          height: '120px', 
                          background: 'linear-gradient(135deg, #52c41a, #faad14, #ff4d4f)',
                          borderRadius: '4px',
                          opacity: 0.8
                        }} />
                      </Card>

                      <Card 
                        title="Most used 3rd party providers" 
                        style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                        headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                        bodyStyle={{ padding: '16px' }}
                      >
                        <Text style={{ color: themeConfig.colorTextSecondary, fontSize: '12px', display: 'block', marginBottom: '8px' }}>www.easytravel.com</Text>
                        
                        <div style={{ marginBottom: '16px' }}>
                          <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={thirdPartyData}>
                              <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.chartGridColor} />
                              <XAxis dataKey="time" stroke={themeConfig.chartTextColor} fontSize={10} />
                              <YAxis stroke={themeConfig.chartTextColor} fontSize={10} />
                              <Bar dataKey="cfapps" stackId="a" fill="#722ed1" />
                              <Bar dataKey="dynatrace" stackId="a" fill="#b37feb" />
                              <Bar dataKey="google" stackId="a" fill="#d3adf7" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div style={{ fontSize: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <Text style={{ color: '#722ed1' }}>cfapps.io: 88.9/min</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <Text style={{ color: '#b37feb' }}>dynatrace.com: 74.1/min</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <Text style={{ color: '#d3adf7' }}>google.com: 73.4/min</Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>

                {/* Additional Metrics Section */}
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                  <Col xs={24} lg={12}>
                    <Card 
                      title="CPU & Memory Usage Over Time" 
                      style={{ background: themeConfig.cardBackground, border: `1px solid ${themeConfig.cardBorder}` }}
                      headStyle={{ color: themeConfig.colorText, borderBottom: `1px solid ${themeConfig.colorBorder}` }}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cpuUsageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.chartGridColor} />
                          <XAxis dataKey="time" stroke={themeConfig.chartTextColor} />
                          <YAxis stroke={themeConfig.chartTextColor} />
                          <RechartsTooltip 
                            contentStyle={{ 
                              background: themeConfig.cardBackground, 
                              border: `1px solid ${themeConfig.cardBorder}`,
                              color: themeConfig.colorText
                            }}
                          />
                          <Line type="monotone" dataKey="cpu" stroke={themeConfig.errorColor} strokeWidth={2} />
                          <Line type="monotone" dataKey="memory" stroke={themeConfig.colorPrimary} strokeWidth={2} />
                          <Line type="monotone" dataKey="disk" stroke={themeConfig.successColor} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Card 
                      title="Regional Performance Metrics" 
                      style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                      headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={regionUsageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                          <XAxis dataKey="region" stroke="#666" />
                          <YAxis stroke="#666" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              background: '#2a2a2a', 
                              border: '1px solid #404040',
                              color: '#fff'
                            }}
                          />
                          <Area type="monotone" dataKey="requests" stackId="1" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="calls" stackId="1" stroke="#52c41a" fill="#52c41a" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="unmonitored" stackId="1" stroke="#faad14" fill="#faad14" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Card>
                  </Col>
                </Row>

                {/* Apdex Score Distribution */}
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                  <Col xs={24} lg={8}>
                    <Card 
                      title="Apdex Score Distribution" 
                      style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                      headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                    >
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={apdexData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="score"
                          >
                            {apdexData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            contentStyle={{ 
                              background: '#2a2a2a', 
                              border: '1px solid #404040',
                              color: '#fff'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        {apdexData.map((item, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <div style={{ width: '12px', height: '12px', background: item.color, borderRadius: '2px' }} />
                            <Text style={{ color: '#fff', fontSize: '12px' }}>{item.region}: {item.score}</Text>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} lg={16}>
                    <Card 
                      title="Server Status Overview" 
                      style={{ background: '#2a2a2a', border: '1px solid #404040' }}
                      headStyle={{ color: '#fff', borderBottom: '1px solid #404040' }}
                    >
                      <Row gutter={[16, 16]}>
                        {filteredServers().slice(0, 8).map(server => (
                          <Col xs={12} sm={8} lg={6} key={server.id}>
                            <Card 
                              size="small" 
                              style={{ 
                                background: '#404040', 
                                border: '1px solid #666',
                                cursor: 'pointer'
                              }}
                              bodyStyle={{ padding: '12px' }}
                              onClick={() => handleViewServerDetails(server)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <div style={{ 
                                  width: '8px', 
                                  height: '8px', 
                                  background: server.status === 'online' ? '#52c41a' : 
                                             server.status === 'warning' ? '#faad14' : 
                                             server.status === 'offline' ? '#ff4d4f' : '#666',
                                  borderRadius: '50%' 
                                }} />
                                <Text style={{ color: '#fff', fontSize: '12px' }}>{server.name}</Text>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text style={{ color: '#666', fontSize: '10px' }}>CPU:</Text>
                                <Text style={{ color: '#fff', fontSize: '10px' }}>{server.cpu}%</Text>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text style={{ color: '#666', fontSize: '10px' }}>Memory:</Text>
                                <Text style={{ color: '#fff', fontSize: '10px' }}>{server.memory}%</Text>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#666', fontSize: '10px' }}>Status:</Text>
                                <Text style={{ 
                                  color: server.status === 'online' ? '#52c41a' : 
                                         server.status === 'warning' ? '#faad14' : 
                                         server.status === 'offline' ? '#ff4d4f' : '#666',
                                  fontSize: '10px' 
                                }}>
                                  {server.status}
                                </Text>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Spin>
          </Content>
        </Layout>
      </Layout>

      {/* Server Details Modal */}
      <Modal
        title={`${selectedServer?.name} - Server Details`}
        open={!!selectedServer}
        onCancel={() => setSelectedServer(null)}
        footer={null}
        width={800}
        destroyOnClose
        style={{ top: 20 }}
        bodyStyle={{ background: themeConfig.cardBackground }}
      >
        {selectedServer && serverMetrics && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Text style={{ color: themeConfig.colorText }}>Server: {selectedServer.name}</Text>
              <br />
              <Text style={{ color: themeConfig.colorTextSecondary }}>Region: {selectedServer.region}</Text>
              <br />
              <Text style={{ color: themeConfig.colorTextSecondary }}>Account: {selectedServer.account}</Text>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={serverMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.chartGridColor} />
                <XAxis dataKey="timestamp" stroke={themeConfig.chartTextColor} />
                <YAxis stroke={themeConfig.chartTextColor} />
                <RechartsTooltip 
                  contentStyle={{ 
                    background: themeConfig.cardBackground, 
                    border: `1px solid ${themeConfig.cardBorder}`,
                    color: themeConfig.colorText
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke={themeConfig.errorColor} strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke={themeConfig.colorPrimary} strokeWidth={2} />
                <Line type="monotone" dataKey="disk" stroke={themeConfig.successColor} strokeWidth={2} />
                <Line type="monotone" dataKey="network" stroke={themeConfig.warningColor} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Dashboard;

import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Row, Col, Card, Table, Select, Tag } from 'antd';
import { Line } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { toggleServerStatus, setServers, setShowNotifications } from '../store/slices/dashboardSlice';
import { selectDashboardState } from '../store/selectors/dashboardSelectors';
import SearchInput from '../components/atoms/SearchInput/SearchInput';
import styles from '../styles/ServerOverview.module.css';
import dayjs from 'dayjs';
import AppSider from '../components/organisms/AppSider';
import AppHeader from '../components/organisms/AppHeader';
import { ServerStatusOverview } from '../components/organisms/ServerStatusOverview';

const { Option } = Select;
const { Content } = Layout;

import { servers as mockServers } from '../data/mockData';

const ServerOverview: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('cpu');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  const { servers, notifications } = useSelector(selectDashboardState);

  // Filter servers based on search query
  const filteredServers = useMemo(() => {
    if (!searchQuery) return servers;
    
    const query = searchQuery.toLowerCase();
    return servers.filter(server => 
      server.name.toLowerCase().includes(query) || 
      server.region.toLowerCase().includes(query)
    );
  }, [servers, searchQuery]);

  useEffect(() => {
    // Initialize servers from mock data if not already present
    if (servers.length === 0) {
      dispatch(setServers(mockServers));
    }
  }, [dispatch]);
  

  const handleServerToggle = (serverName: string, newStatus: boolean) => {
    console.log('Toggling server:', serverName, 'to status:', newStatus);
    dispatch(toggleServerStatus({ serverName, status: newStatus }));
  };

  // Transform server data for the line chart
  const chartData = filteredServers.map(server => ({
    name: server.name,
    value: server[selectedMetric as keyof typeof server],
    metric: selectedMetric,
  }));

  // Configure line chart
  const chartConfig = {
    data: chartData,
    xField: 'name',
    yField: 'value',
    seriesField: 'metric',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Server Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'CPU (%)',
      dataIndex: 'cpu',
      key: 'cpu',
      sorter: (a: any, b: any) => a.cpu - b.cpu,
    },
    {
      title: 'Memory (%)',
      dataIndex: 'memory',
      key: 'memory',
      sorter: (a: any, b: any) => a.memory - b.memory,
    },
    {
      title: 'Disk (%)',
      dataIndex: 'disk',
      key: 'disk',
      sorter: (a: any, b: any) => a.disk - b.disk,
    },
    {
      title: 'Network (%)',
      dataIndex: 'network',
      key: 'network',
      sorter: (a: any, b: any) => a.network - b.network,
    },
    {
      title: 'Uptime (%)',
      dataIndex: 'uptime',
      key: 'uptime',
      sorter: (a: any, b: any) => a.uptime - b.uptime,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text: string) => dayjs(text).format('MMM D, YYYY HH:mm:ss'),
      sorter: (a: any, b: any) => dayjs(a.lastUpdated).unix() - dayjs(b.lastUpdated).unix(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={text === 'online' ? 'green' : 'volcano'}>
          {text === 'online' ? 'Online' : 'Offline'}
        </Tag>
      ),
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
    },
  ];

  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <div style={{ height: 64 }} /> {/* Spacer for fixed header */}
        <AppHeader
          onRefresh={() => dispatch(setServers(mockServers))}
          unreadNotifications={notifications.filter(n => !n.read).length}
          onNotificationsClick={() => dispatch(setShowNotifications(true))}
        />
        <Content style={{ margin: '24px' }}>
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
            
            <h1 style={{ marginTop: '32px' }}>Server Metrics Overview</h1>
            
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card 
                  title="Server Metrics Visualization"
                  extra={
                    <Select
                      value={selectedMetric}
                      onChange={setSelectedMetric}
                      style={{ width: 150 }}
                    >
                <Option value="cpu">CPU Usage</Option>
                <Option value="memory">Memory Usage</Option>
                <Option value="disk">Disk Usage</Option>
                <Option value="network">Network Usage</Option>
                <Option value="uptime">Uptime</Option>
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
      </Layout>
    </Layout>
  );
};

export default ServerOverview;

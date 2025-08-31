import React from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { 
  CloudServerOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined,
  BellOutlined,
  DashboardOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { DashboardStats } from '../../types';

interface StatsOverviewProps {
  stats: DashboardStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const getCpuColor = (value: number) => {
    if (value >= 90) return '#ff4d4f';
    if (value >= 75) return '#faad14';
    return '#52c41a';
  };

  const getMemoryColor = (value: number) => {
    if (value >= 90) return '#ff4d4f';
    if (value >= 75) return '#faad14';
    return '#52c41a';
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic
              title="Total Servers"
              value={stats.totalServers}
              prefix={<CloudServerOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic
              title="Online Servers"
              value={stats.onlineServers}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${stats.totalServers}`}
            />
            <Progress 
              percent={stats.totalServers > 0 ? (stats.onlineServers / stats.totalServers) * 100 : 0} 
              strokeColor="#52c41a"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic
              title="Warning Servers"
              value={stats.warningServers}
              prefix={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic
              title="Offline Servers"
              value={stats.offlineServers}
              prefix={<StopOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={{ 
            height: '140px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Statistic
              title="Average CPU"
              value={stats.averageCpu}
              prefix={<DashboardOutlined style={{ color: getCpuColor(stats.averageCpu) }} />}
              valueStyle={{ color: getCpuColor(stats.averageCpu), fontSize: '24px' }}
              suffix="%"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card style={{ 
            height: '140px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Statistic
              title="Average Memory"
              value={stats.averageMemory}
              prefix={<DatabaseOutlined style={{ color: getMemoryColor(stats.averageMemory) }} />}
              valueStyle={{ color: getMemoryColor(stats.averageMemory), fontSize: '24px' }}
              suffix="%"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card style={{ 
            height: '140px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Statistic
              title="Active Alerts"
              value={stats.totalAlerts}
              prefix={<BellOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f', fontSize: '24px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatsOverview;

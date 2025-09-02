import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import dayjs from 'dayjs';
import CountUp from 'react-countup';
import { 
  CloudServerOutlined, 
  DashboardOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { generateTimeSeriesData } from '../../../data/mockData';
import { DashboardStats } from '../../../types';
import styles from './StatsOverview.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';

interface StatsOverviewProps {
  stats: DashboardStats;
  loading?: boolean;
}


const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const chartData = React.useMemo(() => {
    return generateTimeSeriesData('hourly').map(data => ({
      name: dayjs(data.timestamp).format('HH:mm'),
      cpu: data.cpu,
      memory: data.memory,
      alerts: data.alerts
    }));
  }, []);

  return (
    <div className={styles.statsContainer}>
      <Row gutter={[16, 16]} className={styles.summaryBar}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={styles.statsCard}>
            <Statistic 
              title="Total Servers" 
              value={stats.totalServers} 
              prefix={<CloudServerOutlined className={styles.blue} />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} separator="," />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={`${styles.statsCard} ${styles.cardBorderGreen}`}>
            <Statistic 
              title="Online" 
              value={stats.onlineServers} 
              prefix={<CheckCircleOutlined className={styles.green} />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} separator="," />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={`${styles.statsCard} ${styles.cardBorderOrange}`}>
            <Statistic 
              title="Warning" 
              value={stats.warningServers} 
              prefix={<ExclamationCircleOutlined className={styles.orange} />}
              valueStyle={{ color: '#faad14' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} separator="," />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={`${styles.statsCard} ${styles.cardBorderRed}`}>
            <Statistic 
              title="Offline" 
              value={stats.offlineServers} 
              prefix={<StopOutlined className={styles.red} />}
              valueStyle={{ color: '#ff4d4f' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} separator="," />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={styles.statsCard}>
            <Statistic 
              title="Avg CPU" 
              value={stats.averageCpu} 
              prefix={<DashboardOutlined className={styles.blue} />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} decimals={1} suffix="%" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card hoverable className={styles.statsCard}>
            <Statistic 
              title="Avg Memory" 
              value={stats.averageMemory} 
              prefix={<DatabaseOutlined className={styles.blue} />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(value) => (
                <CountUp end={Number(value)} duration={2} decimals={1} suffix="%" />
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} md={24}>
          <Card title="CPU & Memory Usage" className={styles.chartCard}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#1890ff" name="CPU Usage" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="#52c41a" name="Memory Usage" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatsOverview;

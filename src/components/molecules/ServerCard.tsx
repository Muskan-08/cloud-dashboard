import React from 'react';
import { Card, Row, Col, Tooltip, Button } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import StatusBadge from '../atoms/StatusBadge';
import MetricCard from '../atoms/MetricCard';
import { Server } from '../../types';
import dayjs from 'dayjs';

interface ServerCardProps {
  server: Server;
  onViewDetails?: (server: Server) => void;
  onManage?: (server: Server) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ 
  server, 
  onViewDetails, 
  onManage 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#52c41a';
      case 'offline': return '#ff4d4f';
      case 'maintenance': return '#1890ff';
      case 'warning': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const formatUptime = (uptime: number) => {
    if (uptime === 0) return '0%';
    return `${uptime.toFixed(1)}%`;
  };

  const formatLastUpdated = (timestamp: string) => {
    const now = dayjs();
    const updated = dayjs(timestamp);
    const diffMinutes = now.diff(updated, 'minute');
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = now.diff(updated, 'hour');
    if (diffHours < 24) return `${diffHours}h ago`;
    return updated.format('MMM DD, HH:mm');
  };

  return (
    <Card
      hoverable
      style={{
        marginBottom: '16px',
        borderRadius: '8px',
        border: `2px solid ${getStatusColor(server.status)}20`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            {server.name}
          </h3>
          <StatusBadge status={server.status} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>Region: {server.region}</div>
            <div>Account: {server.account}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
            <div>Uptime: {formatUptime(server.uptime)}</div>
            <div>Updated: {formatLastUpdated(server.lastUpdated)}</div>
          </div>
        </div>
      </div>

      <Row gutter={[8, 8]} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <MetricCard
            title="CPU"
            value={server.cpu}
            size="small"
            color="#1890ff"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Memory"
            value={server.memory}
            size="small"
            color="#52c41a"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Disk"
            value={server.disk}
            size="small"
            color="#faad14"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Network"
            value={server.network}
            size="small"
            color="#722ed1"
          />
        </Col>
      </Row>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => onViewDetails?.(server)}
          />
        </Tooltip>
        <Tooltip title="Manage Server">
          <Button
            type="text"
            icon={<SettingOutlined />}
            size="small"
            onClick={() => onManage?.(server)}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default ServerCard;

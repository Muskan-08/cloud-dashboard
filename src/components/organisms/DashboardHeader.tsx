import React, { useState } from 'react';
import { Layout, Input, Select, Button, Badge, Dropdown, Space, Typography } from 'antd';
import { SearchOutlined, BellOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { SearchFilters } from '../../types';

const { Header } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

interface DashboardHeaderProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
  unreadNotifications: number;
  onNotificationsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onRefresh,
  unreadNotifications,
  onNotificationsClick,
}) => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || '');

  const handleSearch = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleRegionChange = (value: string) => {
    onFiltersChange({ ...filters, region: value });
  };

  const handleAccountChange = (value: string) => {
    onFiltersChange({ ...filters, account: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value);

  const filterMenu = (
    <div style={{ padding: '8px' }}>
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '12px', color: '#666' }}>Status</label>
        <Select
          style={{ width: '100%', marginTop: '4px' }}
          placeholder="All Status"
          value={filters.status}
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="online">Online</Option>
          <Option value="offline">Offline</Option>
          <Option value="maintenance">Maintenance</Option>
          <Option value="warning">Warning</Option>
        </Select>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '12px', color: '#666' }}>Region</label>
        <Select
          style={{ width: '100%', marginTop: '4px' }}
          placeholder="All Regions"
          value={filters.region}
          onChange={handleRegionChange}
          allowClear
        >
          <Option value="us-east-1">US East (N. Virginia)</Option>
          <Option value="us-west-2">US West (Oregon)</Option>
          <Option value="eu-west-1">Europe (Ireland)</Option>
        </Select>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '12px', color: '#666' }}>Account</label>
        <Select
          style={{ width: '100%', marginTop: '4px' }}
          placeholder="All Accounts"
          value={filters.account}
          onChange={handleAccountChange}
          allowClear
        >
          <Option value="production">Production</Option>
          <Option value="staging">Staging</Option>
          <Option value="monitoring">Monitoring</Option>
          <Option value="backup">Backup</Option>
        </Select>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" onClick={onClearFilters}>
          Clear All
        </Button>
        <Button size="small" type="primary" onClick={() => {}}>
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0 24px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Cloud Dashboard
        </Title>
        
        <Search
          placeholder="Search servers, regions, accounts..."
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          style={{ width: 300 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <Space size="middle">
        <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomRight">
          <Button 
            icon={<FilterOutlined />} 
            type={hasActiveFilters ? 'primary' : 'default'}
          >
            Filters
            {hasActiveFilters && (
              <Badge count={Object.values(filters).filter(Boolean).length} size="small" />
            )}
          </Button>
        </Dropdown>
        
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Refresh
        </Button>
        
        <Badge count={unreadNotifications} size="small">
          <Button 
            type="text" 
            icon={<BellOutlined />} 
            size="large"
            onClick={onNotificationsClick}
            style={{ fontSize: '18px' }}
          />
        </Badge>
      </Space>
    </Header>
  );
};

export default DashboardHeader;

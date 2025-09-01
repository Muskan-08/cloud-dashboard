import React from 'react';
import { Select, Button } from 'antd';
import { SearchFilters } from '../../../types';
import styles from './FilterMenu.module.css';

const { Option } = Select;

interface FilterMenuProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
}) => {
  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleRegionChange = (value: string) => {
    onFiltersChange({ ...filters, region: value });
  };

  const handleAccountChange = (value: string) => {
    onFiltersChange({ ...filters, account: value });
  };

  return (
    <div className={styles.filterMenu}>
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Status</label>
        <Select
          className={styles.filterSelect}
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
      
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Region</label>
        <Select
          className={styles.filterSelect}
          placeholder="All Regions"
          value={filters.region}
          onChange={handleRegionChange}
          allowClear
        >
          <Option value="us-north-1">US North (N. Virginia)</Option>
          <Option value="us-south-2">US South (Oregon)</Option>
          <Option value="eu-west-1">Europe (Ireland)</Option>
        </Select>
      </div>
      
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Account</label>
        <Select
          className={styles.filterSelect}
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
      
      <div className={styles.filterActions}>
        <Button size="small" onClick={onClearFilters}>
          Clear All
        </Button>
        <Button size="small" type="primary" onClick={onApplyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterMenu;

import React from 'react';
import { Select } from 'antd';
import styles from './MetricSelect.module.css';

const { Option } = Select;

export interface MetricSelectProps {
  selectedMetrics: string[];
  onChange: (value: string[]) => void;
}

const MetricSelect: React.FC<MetricSelectProps> = ({ selectedMetrics, onChange }) => {
  return (
    <Select
      mode="multiple"
      value={selectedMetrics}
      onChange={onChange}
      className={styles.select}
    >
      <Option value="cpu">CPU Usage</Option>
      <Option value="memory">Memory Usage</Option>
      <Option value="disk">Disk Usage</Option>
      <Option value="network">Network Usage</Option>
    </Select>
  );
};

export default MetricSelect;

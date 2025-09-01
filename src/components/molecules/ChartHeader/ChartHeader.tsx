import React from 'react';
import { Typography } from 'antd';
import MetricSelect from '../../atoms/MetricSelect/MetricSelect';
import styles from './ChartHeader.module.css';

const { Title } = Typography;

interface ChartHeaderProps {
  title: string;
  selectedMetrics: string[];
  onMetricsChange: (metrics: string[]) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  selectedMetrics,
  onMetricsChange,
}) => {
  return (
    <div className={styles.header}>
      <Title level={4} className={styles.title}>
        {title}
      </Title>
      <MetricSelect
        selectedMetrics={selectedMetrics}
        onChange={onMetricsChange}
      />
    </div>
  );
};

export default ChartHeader;

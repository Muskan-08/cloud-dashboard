import React from 'react';
import { Card, Progress, Tooltip } from 'antd';
import { CloudServerOutlined, DatabaseOutlined, HddOutlined, GlobalOutlined } from '@ant-design/icons';
import { MetricCardProps } from './MetricCard.types';
import styles from './MetricCard.module.css';

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '%',
  icon,
  color = '#1890ff',
  showProgress = true,
  size = 'default',
}) => {
  const getIcon = () => {
    if (icon && React.isValidElement(icon)) {
      return React.cloneElement(icon, { style: { color } });
    }
    
    const IconComponent = (() => {
      switch (title.toLowerCase()) {
        case 'cpu':
          return CloudServerOutlined;
        case 'memory':
          return DatabaseOutlined;
        case 'disk':
          return HddOutlined;
        case 'network':
          return GlobalOutlined;
        default:
          return CloudServerOutlined;
      }
    })();
    
    return <IconComponent style={{ color }} />;
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return '#ff4d4f';
    if (value >= 75) return '#faad14';
    return '#52c41a';
  };

  const getCardClassName = () => {
    return `${styles.metricCard} ${size === 'small' ? styles.metricCardSmall : styles.metricCardDefault}`;
  };

  const getBodyClassName = () => {
    return size === 'small' ? styles.metricCardBodySmall : styles.metricCardBodyDefault;
  };

  const getIconClassName = () => {
    return `${styles.icon} ${size === 'small' ? styles.iconSmall : styles.iconDefault}`;
  };

  const getTitleClassName = () => {
    return `${styles.title} ${size === 'small' ? styles.titleSmall : styles.titleDefault}`;
  };

  const getValueClassName = () => {
    return `${styles.value} ${size === 'small' ? styles.valueSmall : styles.valueDefault}`;
  };

  return (
    <Card
      size={size}
      className={`${getCardClassName()} ${styles.cardBody}`}
    >
      <div className={getBodyClassName()}>
        <div className={styles.header}>
          <span className={`${getIconClassName()} ${styles.icon}`}>
            {getIcon()}
          </span>
          <span className={getTitleClassName()}>
            {title}
          </span>
        </div>
        
        <div className={getValueClassName()}>
          {value}{unit}
        </div>
        
        {showProgress && (
          <Tooltip title={`${value}%`}>
            <Progress
              percent={value}
              strokeColor={getProgressColor(value)}
              showInfo={false}
              size={size === 'small' ? 'small' : 'default'}
              strokeWidth={size === 'small' ? 4 : 6}
            />
          </Tooltip>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;

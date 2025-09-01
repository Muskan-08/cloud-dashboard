import React from 'react';
import { Empty } from 'antd';
import styles from './EmptyNotifications.module.css';

const EmptyNotifications: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Empty
        description="No notifications"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );
};

export default EmptyNotifications;

import React from 'react';
import { Button, Space, Dropdown } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import FilterButton from '../../atoms/FilterButton';
import NotificationIcon from '../../atoms/NotificationIcon';

import styles from './HeaderActions.module.css';

interface HeaderActionsProps {
  activeFilters: number;
  filterMenu: React.ReactElement;
  onRefresh: () => void;
  onNotificationsClick: () => void;
  unreadNotifications: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  activeFilters,
  filterMenu,
  onRefresh,
  onNotificationsClick,
  unreadNotifications,
}) => {
  return (
    <Space size="middle" className={styles.actions}>
      <Dropdown dropdownRender={() => filterMenu} trigger={['click']} placement="bottomRight">
        <FilterButton activeFilters={activeFilters} onClick={() => {}} />
      </Dropdown>

      <Button 
        icon={<ReloadOutlined />} 
        onClick={onRefresh}
        className={styles.refreshButton}
      >
        Refresh
      </Button>

      <Button 
        type="text" 
        onClick={onNotificationsClick}
        className={styles.notificationButton}
      >
        <NotificationIcon type="info" unread={unreadNotifications > 0} />
      </Button>
    </Space>
  );
};

export default HeaderActions;

import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { Server } from '../../../types';
import styles from './ServerActions.module.css';

interface ServerActionsProps {
  server: Server;
  onViewDetails?: (server: Server) => void;
  onManage?: (server: Server) => void;
}

const ServerActions: React.FC<ServerActionsProps> = ({
  server,
  onViewDetails,
  onManage,
}) => {
  return (
    <div className={styles.actions}>
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
  );
};

export default ServerActions;

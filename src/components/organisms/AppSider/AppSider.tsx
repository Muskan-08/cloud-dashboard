import React from 'react';
import { Layout } from 'antd';
import SidebarMenu from '../../molecules/SideBarMenu/SidebarMenu';

const { Sider } = Layout;

interface AppSiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  selectedKey: string;
  onSelect?: (key: string) => void;
}

const AppSider: React.FC<AppSiderProps> = ({
  collapsed,
  onCollapse,
  selectedKey,
  onSelect,
}) => {
  return (
    <Sider
      width={240}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        backgroundColor: '#ffffff',
        borderRight: '1px solid #f0f0f0',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 65,
        zIndex: 1001
      }}
    >
      <SidebarMenu
        selectedKey={selectedKey}
        collapsed={collapsed}
        onSelect={onSelect || (() => {})}
      />
    </Sider>
  );
};

export default AppSider;

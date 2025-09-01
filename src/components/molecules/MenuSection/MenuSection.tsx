import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './MenuSection.module.css';

interface MenuSectionProps {
  title: string;
  items: {
    key: string;
    icon: React.ReactNode;
    label: string;
  }[];
  selectedKey: string;
  collapsed: boolean;
  onSelect: (key: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  selectedKey,
  collapsed,
  onSelect,
}) => {
  const navigate = useNavigate();
  
  const onClick: MenuProps['onClick'] = (e) => {
    onSelect(e.key);
    switch (e.key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'servers':
        navigate('/servers');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.menuSection}>
      {!collapsed && <h3 className={styles.title}>{title}</h3>}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={onClick}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};

export default MenuSection;

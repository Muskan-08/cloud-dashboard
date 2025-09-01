import React, { useState } from 'react';
import {
  DashboardOutlined,
  CloudServerOutlined,
  AlertOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import MenuSection from '../MenuSection/MenuSection';
import HelpSupportModal from '../HelpSupportModal/HelpSupportModal';
import styles from './SidebarMenu.module.css';

interface SidebarMenuProps {
  selectedKey: string;
  collapsed: boolean;
  onSelect: (key: string) => void;
}

const menuSections = [
  {
    title: 'Main',
    items: [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: 'servers',
        icon: <CloudServerOutlined />,
        label: 'Servers',
      },
      {
        key: 'alerts',
        icon: <AlertOutlined />,
        label: 'Alerts',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        key: 'help',
        icon: <QuestionCircleOutlined />,
        label: 'Help & Support',
      },
    ],
  },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  selectedKey,
  collapsed,
  onSelect,
}) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleMenuSelect = (key: string) => {
    if (key === 'help') {
      setIsHelpModalOpen(true);
    } else {
      onSelect(key);
    }
  };

  return (
    <>
      <nav className={styles.sidebar}>
        {menuSections.map((section) => (
          <MenuSection
            key={section.title}
            title={section.title}
            items={section.items}
            selectedKey={selectedKey}
            collapsed={collapsed}
            onSelect={handleMenuSelect}
          />
        ))}
      </nav>
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

export default SidebarMenu;

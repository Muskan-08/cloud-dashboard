import React from 'react';
import { Button, Badge } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styles from './FilterButton.module.css';

export interface FilterButtonProps {
  activeFilters: number;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  activeFilters,
  onClick
}) => {
  return (
    <Button 
      icon={<FilterOutlined />} 
      type={activeFilters > 0 ? 'primary' : 'default'}
      onClick={onClick}
      className={styles.filterButton}
    >
      Filters
      {activeFilters > 0 && (
        <Badge count={activeFilters} size="small" />
      )}
    </Button>
  );
};

export default FilterButton;

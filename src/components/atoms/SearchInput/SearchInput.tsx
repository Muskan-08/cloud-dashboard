import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchInput.module.css';
import useDebounce from '../../../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceTime = 700,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceTime);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={styles.searchWrapper}>
      <Input
        className={styles.searchInput}
        placeholder={placeholder}
        prefix={<SearchOutlined className={styles.searchIcon} />}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        allowClear
      />
    </div>
  );
};

export default SearchInput;

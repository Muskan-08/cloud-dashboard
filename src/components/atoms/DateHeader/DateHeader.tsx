import React from 'react';
import { Typography } from 'antd';
import styles from './DateHeader.module.css';

const { Title } = Typography;

interface DateHeaderProps {
  date: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Title level={5} className={styles.header}>
      {formattedDate}
    </Title>
  );
};

export default DateHeader;

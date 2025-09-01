export interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  showProgress?: boolean;
  size?: 'small' | 'default';
}

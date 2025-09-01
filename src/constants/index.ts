// Time range constants
export const TIME_RANGES = {
  LAST_24_HOURS: 'Last 24 hours',
  LAST_7_DAYS: 'Last 7 days',
  LAST_30_DAYS: 'Last 30 days',
  LAST_MONTH: 'Last month'
} as const;

// Status constants
export const STATUS = {
  ONLINE: 'online',
  WARNING: 'warning',
  OFFLINE: 'offline'
} as const;

// Chart colors
export const CHART_COLORS = {
  CPU: '#ff4d4f',
  MEMORY: '#1890ff',
  DISK: '#52c41a',
  NETWORK: '#faad14'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info'
} as const;

// Regions
export const REGIONS = {
  US_EAST_1: 'us-east-1',
  US_WEST_2: 'us-west-2',
  EU_WEST_1: 'eu-west-1'
} as const;

// Accounts
export const ACCOUNTS = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DEVELOPMENT: 'development'
} as const;

// Metrics update interval (in milliseconds)
export const METRICS_UPDATE_INTERVAL = 5000;

// Menu items
export const MENU_ITEMS = [
  {
    key: 'search',
    label: 'Search',
    icon: 'SearchOutlined',
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'DashboardOutlined',
  },
  {
    key: 'services',
    label: 'Services',
    icon: 'CloudOutlined',
  },
  {
    key: 'monitoring',
    label: 'Monitoring',
    icon: 'GlobalOutlined',
  },
  {
    key: 'cloud',
    label: 'Cloud',
    icon: 'CloudOutlined',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: 'DatabaseOutlined',
  },
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    icon: 'SettingOutlined',
  }
];

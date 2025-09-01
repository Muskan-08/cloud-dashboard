import { Server } from '../types';
import dayjs from 'dayjs';

export const filterServers = (servers: Server[], searchQuery: string) => {
  if (!searchQuery) return servers;
  
  const query = searchQuery.toLowerCase();
  return servers.filter(server => 
    server.name.toLowerCase().includes(query) || 
    server.region.toLowerCase().includes(query)
  );
};

export const transformChartData = (servers: Server[], selectedMetric: string) => {
  return servers.map(server => ({
    name: server.name,
    value: server[selectedMetric as keyof typeof server],
    metric: selectedMetric,
  }));
};

export const getChartConfig = (chartData: any[]) => ({
  data: chartData,
  xField: 'name',
  yField: 'value',
  seriesField: 'metric',
  point: {
    size: 5,
    shape: 'diamond',
  },
  label: {
    style: {
      fill: '#aaa',
    },
  },
});

export const getTableColumns = () => [
  {
    title: 'Server Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: Server, b: Server) => a.name.localeCompare(b.name),
  },
  {
    title: 'CPU (%)',
    dataIndex: 'cpu',
    key: 'cpu',
    sorter: (a: Server, b: Server) => a.cpu - b.cpu,
  },
  {
    title: 'Memory (%)',
    dataIndex: 'memory',
    key: 'memory',
    sorter: (a: Server, b: Server) => a.memory - b.memory,
  },
  {
    title: 'Disk (%)',
    dataIndex: 'disk',
    key: 'disk',
    sorter: (a: Server, b: Server) => a.disk - b.disk,
  },
  {
    title: 'Network (%)',
    dataIndex: 'network',
    key: 'network',
    sorter: (a: Server, b: Server) => a.network - b.network,
  },
  {
    title: 'Uptime (%)',
    dataIndex: 'uptime',
    key: 'uptime',
    sorter: (a: Server, b: Server) => a.uptime - b.uptime,
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdated',
    key: 'lastUpdated',
    render: (text: string) => dayjs(text).format('MMM D, YYYY HH:mm:ss'),
    sorter: (a: Server, b: Server) => dayjs(a.lastUpdated).unix() - dayjs(b.lastUpdated).unix(),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      return {
        props: {
          style: {
            color: text === 'online' ? '#52c41a' : '#f5222d',
            backgroundColor: text === 'online' ? '#f6ffed' : '#fff1f0',
            borderRadius: '2px',
            padding: '2px 8px',
          }
        },
        children: text === 'online' ? 'Online' : 'Offline'
      };
    },
    sorter: (a: Server, b: Server) => a.status.localeCompare(b.status),
  },
];

export const metricOptions = [
  { value: 'cpu', label: 'CPU Usage' },
  { value: 'memory', label: 'Memory Usage' },
  { value: 'disk', label: 'Disk Usage' },
  { value: 'network', label: 'Network Usage' },
  { value: 'uptime', label: 'Uptime' },
];

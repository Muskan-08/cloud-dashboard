export interface Server {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  region: string;
  account: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: number;
  lastUpdated: string;
}

export interface ResourceMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

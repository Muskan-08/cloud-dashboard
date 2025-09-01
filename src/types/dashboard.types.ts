export interface DashboardStats {
  totalServers: number;
  onlineServers: number;
  offlineServers: number;
  warningServers: number;
  totalAlerts: number;
  averageCpu: number;
  averageMemory: number;
  uptime: number; // in percentage
}

export interface SearchFilters {
  status?: string;
  region?: string;
  account?: string;
  searchTerm?: string;
}

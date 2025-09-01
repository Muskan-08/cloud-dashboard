import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';


// Atomic Selectors - Basic building blocks
export const selectDashboardState = (state: RootState) => state.dashboard;
export const selectServers = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.servers
);
export const selectFilters = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.filters
);

// Molecular Selectors - Filter by specific criteria
export const selectServersByStatus = createSelector(
  [selectServers, (_, status: string | null) => status],
  (servers, status) => status ? servers.filter(server => server.status === status) : servers
);

export const selectServersByRegion = createSelector(
  [selectServers, (_, region: string | null) => region],
  (servers, region) => region ? servers.filter(server => server.region === region) : servers
);

export const selectServersBySearch = createSelector(
  [selectServers, (_, searchTerm: string | null) => searchTerm],
  (servers, searchTerm) => {
    if (!searchTerm) return servers;
    const searchLower = searchTerm.toLowerCase();
    return servers.filter(server =>
      server.name.toLowerCase().includes(searchLower) ||
      server.region.toLowerCase().includes(searchLower)
    );
  }
);

// Organism Selector - Combines all filters
export const selectFilteredServers = createSelector(
  [selectServers, selectFilters],
  (servers, filters) => {
    let filtered = servers;

    if (filters.status) {
      filtered = filtered.filter(server => server.status === filters.status);
    }

    if (filters.region) {
      filtered = filtered.filter(server => server.region === filters.region);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(server =>
        server.name.toLowerCase().includes(searchLower) ||
        server.region.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }
);

// Additional Molecular Selectors for statistics
export const selectServerStatistics = createSelector(
  [selectServers],
  (servers) => {
    const stats = {
      total: servers.length,
      byStatus: {} as Record<string, number>,
      byRegion: {} as Record<string, number>,
    };

    servers.forEach(server => {
      // Count by status
      stats.byStatus[server.status] = (stats.byStatus[server.status] || 0) + 1;
      
      // Count by region
      stats.byRegion[server.region] = (stats.byRegion[server.region] || 0) + 1;
    });

    return stats;
  }
);

export const selectResourceUtilization = createSelector(
  [selectServers],
  (servers) => {
    const total = servers.length;
    if (total === 0) return { averageCpu: 0, averageMemory: 0, averageDisk: 0 };

    const sums = servers.reduce((acc, server) => ({
      cpu: acc.cpu + server.cpu,
      memory: acc.memory + server.memory,
      disk: acc.disk + server.disk,
    }), { cpu: 0, memory: 0, disk: 0 });

    return {
      averageCpu: Math.round(sums.cpu / total),
      averageMemory: Math.round(sums.memory / total),
      averageDisk: Math.round(sums.disk / total),
    };
  }
);

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  setServers,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  dismissNotification,
  setFilters,
  clearFilters,
  setStats,
  setLoading,
  setError,
} from '../store/slices/dashboardSlice';
import { Server, Notification, SearchFilters, DashboardStats } from '../types';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard = useSelector((state: RootState) => state.dashboard);

  return {
    // State
    servers: dashboard.servers,
    notifications: dashboard.notifications,
    filters: dashboard.filters,
    stats: dashboard.stats,
    loading: dashboard.loading,
    error: dashboard.error,

    // Actions
    setServers: (servers: Server[]) => dispatch(setServers(servers)),
    setNotifications: (notifications: Notification[]) => dispatch(setNotifications(notifications)),
    addNotification: (notification: Notification) => dispatch(addNotification(notification)),
    markNotificationAsRead: (id: string) => dispatch(markNotificationAsRead(id)),
    dismissNotification: (id: string) => dispatch(dismissNotification(id)),
    setFilters: (filters: SearchFilters) => dispatch(setFilters(filters)),
    clearFilters: () => dispatch(clearFilters()),
    setStats: (stats: DashboardStats) => dispatch(setStats(stats)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),

    // Computed values
    filteredServers: () => {
      let filtered = dashboard.servers;

      if (dashboard.filters.status) {
        filtered = filtered.filter(server => server.status === dashboard.filters.status);
      }

      if (dashboard.filters.region) {
        filtered = filtered.filter(server => server.region === dashboard.filters.region);
      }

      if (dashboard.filters.account) {
        filtered = filtered.filter(server => server.account === dashboard.filters.account);
      }

      if (dashboard.filters.searchTerm) {
        const searchTerm = dashboard.filters.searchTerm.toLowerCase();
        filtered = filtered.filter(server =>
          server.name.toLowerCase().includes(searchTerm) ||
          server.region.toLowerCase().includes(searchTerm) ||
          server.account.toLowerCase().includes(searchTerm)
        );
      }

      return filtered;
    },

    unreadNotifications: () => {
      return dashboard.notifications.filter(notification => !notification.read);
    },
  };
};

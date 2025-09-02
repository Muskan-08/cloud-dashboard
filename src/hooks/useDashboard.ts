import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
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
import { selectDashboardState, selectFilteredServers } from '../store/selectors/dashboardSelectors';
import { Server, Notification, SearchFilters, DashboardStats } from '../types';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard = useSelector(selectDashboardState);
  const filteredServers = useSelector(selectFilteredServers);

  return {
    servers: dashboard.servers,
    notifications: dashboard.notifications,
    filters: dashboard.filters,
    stats: dashboard.stats,
    loading: dashboard.loading,
    error: dashboard.error,
    filteredServers,
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

    unreadNotifications: () => {
      return dashboard.notifications.filter(notification => !notification.read);
    },
  };
};

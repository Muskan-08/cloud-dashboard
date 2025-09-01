import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Server, Notification, SearchFilters, DashboardStats } from '../../types';

interface DashboardState {
  servers: Server[];
  notifications: Notification[];
  filters: SearchFilters;
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  showNotifications: boolean;
}

const initialState: DashboardState = {
  servers: [],
  notifications: [],
  filters: {},
  stats: {
    totalServers: 0,
    onlineServers: 0,
    offlineServers: 0,
    warningServers: 0,
    totalAlerts: 0,
    averageCpu: 0,
    averageMemory: 0,
  },
  loading: true, // Start with loading true
  error: null,
  showNotifications: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload;
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    toggleServerStatus: (state, action: PayloadAction<{ serverName: string; status: boolean }>) => {
      state.servers = state.servers.map(server => 
        server.name === action.payload.serverName
          ? { ...server, status: action.payload.status ? 'online' : 'offline' }
          : server
      );
    },
    setShowNotifications: (state, action: PayloadAction<boolean>) => {
      state.showNotifications = action.payload;
    },
    setFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log('Setting loading state to:', action.payload);
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
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
  toggleServerStatus,
  setShowNotifications
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

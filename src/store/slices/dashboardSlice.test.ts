import { describe, it, expect } from 'vitest'
import dashboardReducer, { 
  setServers, 
  setNotifications, 
  addNotification, 
  markNotificationAsRead, 
  dismissNotification,
  setFilters,
  clearFilters,
  setStats,
  setLoading,
  setError
} from './dashboardSlice'
import { Server, Notification, DashboardStats } from '../../types'

describe('dashboardSlice', () => {
  const mockServer: Server = {
    id: '1',
    name: 'test-server',
    status: 'online',
    region: 'us-east-1',
    account: 'production',
    cpu: 50,
    memory: 60,
    disk: 30,
    network: 40,
    uptime: 99.5,
    lastUpdated: '2023-01-01T00:00:00Z',
  }

  const mockNotification: Notification = {
    id: '1',
    type: 'info',
    title: 'Test Notification',
    message: 'This is a test notification',
    timestamp: '2023-01-01T00:00:00Z',
    read: false,
  }

  const mockStats: DashboardStats = {
    totalServers: 1,
    onlineServers: 1,
    offlineServers: 0,
    warningServers: 0,
    totalAlerts: 1,
    averageCpu: 50,
    averageMemory: 60,
  }

  it('should return the initial state', () => {
    expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual({
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
      loading: false,
      error: null,
    })
  })

  it('should handle setServers', () => {
    const initialState = { servers: [], loading: true, error: null } as any
    const nextState = dashboardReducer(initialState, setServers([mockServer]))
    expect(nextState.servers).toEqual([mockServer])
    expect(nextState.loading).toBe(false)
  })

  it('should handle setNotifications', () => {
    const initialState = { notifications: [] } as any
    const nextState = dashboardReducer(initialState, setNotifications([mockNotification]))
    expect(nextState.notifications).toEqual([mockNotification])
  })

  it('should handle addNotification', () => {
    const initialState = { notifications: [] } as any
    const nextState = dashboardReducer(initialState, addNotification(mockNotification))
    expect(nextState.notifications).toEqual([mockNotification])
  })

  it('should handle markNotificationAsRead', () => {
    const initialState = { notifications: [mockNotification] } as any
    const nextState = dashboardReducer(initialState, markNotificationAsRead('1'))
    expect(nextState.notifications[0].read).toBe(true)
  })

  it('should handle dismissNotification', () => {
    const initialState = { notifications: [mockNotification] } as any
    const nextState = dashboardReducer(initialState, dismissNotification('1'))
    expect(nextState.notifications).toEqual([])
  })

  it('should handle setFilters', () => {
    const initialState = { filters: {} } as any
    const filters = { status: 'online', region: 'us-east-1' }
    const nextState = dashboardReducer(initialState, setFilters(filters))
    expect(nextState.filters).toEqual(filters)
  })

  it('should handle clearFilters', () => {
    const initialState = { filters: { status: 'online' } } as any
    const nextState = dashboardReducer(initialState, clearFilters())
    expect(nextState.filters).toEqual({})
  })

  it('should handle setStats', () => {
    const initialState = { stats: {} as DashboardStats } as any
    const nextState = dashboardReducer(initialState, setStats(mockStats))
    expect(nextState.stats).toEqual(mockStats)
  })

  it('should handle setLoading', () => {
    const initialState = { loading: false } as any
    const nextState = dashboardReducer(initialState, setLoading(true))
    expect(nextState.loading).toBe(true)
  })

  it('should handle setError', () => {
    const initialState = { error: null } as any
    const nextState = dashboardReducer(initialState, setError('Test error'))
    expect(nextState.error).toBe('Test error')
  })
})

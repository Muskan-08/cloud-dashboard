import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './store/slices/dashboardSlice'
import App from './App'

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
    },
  })
}

// Wrapper component for testing with Redux
const renderWithRedux = (component: React.ReactElement) => {
  const store = createTestStore()
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('App', () => {
  it('renders the dashboard', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Cloud Dashboard')).toBeInTheDocument()
  })

  it('renders the dashboard header', () => {
    renderWithRedux(<App />)
    expect(screen.getByPlaceholderText('Search servers, regions, accounts...')).toBeInTheDocument()
  })

  it('renders the refresh button', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Refresh')).toBeInTheDocument()
  })

  it('renders the filters button', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })
})

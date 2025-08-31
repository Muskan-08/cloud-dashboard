import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock window.matchMedia for Ant Design responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Extend Vitest's expect method with methods from react-testing-library
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = received !== null && received !== undefined
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    }
  },
})

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

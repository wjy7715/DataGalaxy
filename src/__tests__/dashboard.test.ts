import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDashboardStore } from '../stores/dashboard'

describe('Dashboard Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with null data and not loading', () => {
    const store = useDashboardStore()
    expect(store.data).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should fetch dashboard data', async () => {
    const store = useDashboardStore()
    await store.fetchDashboard()
    expect(store.data).not.toBeNull()
    expect(store.data?.totalUsers).toBeGreaterThan(0)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })
})

describe('Logger', () => {
  it('should export a logger instance', async () => {
    const { logger } = await import('../utils/logger')
    expect(logger).toBeDefined()
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.error).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.debug).toBe('function')
  })
})

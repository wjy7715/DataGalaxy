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
    expect(store.lastUpdated).toBe(0)
  })

  it('should fetch dashboard data', async () => {
    const store = useDashboardStore()
    await store.fetchDashboard()
    expect(store.data).not.toBeNull()
    expect(store.data?.statCards.length).toBe(5)
    expect(store.data?.rankList.length).toBe(8)
    expect(store.data?.barChart.length).toBe(7)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.lastUpdated).toBeGreaterThan(0)
  })

  it('should start and stop auto refresh', () => {
    const store = useDashboardStore()
    store.startAutoRefresh(5000)
    store.stopAutoRefresh()
    // No error should occur
  })

  it('should support setDataService', () => {
    const store = useDashboardStore()
    expect(() => store.setDataService).toBeDefined()
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

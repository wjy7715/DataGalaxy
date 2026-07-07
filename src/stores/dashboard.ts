import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardData } from '../types'
import { MockDataService } from '../services/MockDataService'
import type { IDataService } from '../services/DataService'
import { logger } from '../utils/logger'

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<number>(0)
  const dataService = ref<IDataService>(new MockDataService())

  let refreshTimer: ReturnType<typeof setInterval> | null = null

  async function fetchDashboard() {
    loading.value = true
    error.value = null
    try {
      logger.debug('Store: fetching dashboard')
      const response = await dataService.value.fetchDashboard()
      data.value = response.data
      lastUpdated.value = Date.now()
      logger.info('Store: dashboard data loaded')
    } catch (e) {
      const message = e instanceof Error ? e.message : '未知错误'
      error.value = message
      logger.error('Store: fetch failed', e)
    } finally {
      loading.value = false
    }
  }

  function startAutoRefresh(intervalMs = 10000) {
    stopAutoRefresh()
    refreshTimer = setInterval(() => {
      fetchDashboard()
    }, intervalMs)
  }

  function stopAutoRefresh() {
    if (refreshTimer !== null) {
      clearInterval(refreshTimer)
      refreshTimer = null
    }
  }

  function setDataService(service: IDataService) {
    dataService.value = service
  }

  return {
    data,
    loading,
    error,
    lastUpdated,
    fetchDashboard,
    startAutoRefresh,
    stopAutoRefresh,
    setDataService,
  }
})

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
  const dataService = ref<IDataService>(new MockDataService())

  async function fetchDashboard() {
    loading.value = true
    error.value = null
    try {
      logger.debug('Store: fetching dashboard')
      const response = await dataService.value.fetchDashboard()
      data.value = response.data
      logger.info('Store: dashboard data loaded', { data: response.data })
    } catch (e) {
      const message = e instanceof Error ? e.message : '未知错误'
      error.value = message
      logger.error('Store: fetch failed', e)
    } finally {
      loading.value = false
    }
  }

  function setDataService(service: IDataService) {
    dataService.value = service
  }

  return { data, loading, error, fetchDashboard, setDataService }
})

import type { IDataService } from './DataService'
import type { DashboardData, ApiResponse } from '../types'
import { logger } from '../utils/logger'

export class ApiDataService implements IDataService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    logger.info('ApiDataService: fetching dashboard data from API')
    const response = await fetch(`${this.baseUrl}/dashboard`)
    if (!response.ok) {
      logger.error('ApiDataService: request failed', response.status)
      throw new Error(`API request failed: ${response.status}`)
    }
    return response.json()
  }
}

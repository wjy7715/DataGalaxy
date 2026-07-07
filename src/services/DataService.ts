import type { DashboardData, ApiResponse } from '../types'

export interface IDataService {
  fetchDashboard(): Promise<ApiResponse<DashboardData>>
}

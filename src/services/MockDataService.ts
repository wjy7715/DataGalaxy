import type { IDataService } from './DataService'
import type { DashboardData, ApiResponse } from '../types'
import { logger } from '../utils/logger'

const MOCK_DATA: DashboardData = {
  totalUsers: 12846,
  totalOrders: 5892,
  revenue: 2365000,
  conversionRate: 12.8,
  barChart: [
    { name: '周一', value: 320 },
    { name: '周二', value: 450 },
    { name: '周三', value: 380 },
    { name: '周四', value: 510 },
    { name: '周五', value: 680 },
    { name: '周六', value: 420 },
    { name: '周日', value: 290 },
  ],
  lineChart: [
    { time: '00:00', value: 120, category: '访问量' },
    { time: '04:00', value: 80, category: '访问量' },
    { time: '08:00', value: 350, category: '访问量' },
    { time: '12:00', value: 520, category: '访问量' },
    { time: '16:00', value: 610, category: '访问量' },
    { time: '20:00', value: 480, category: '访问量' },
  ],
  pieChart: [
    { name: '搜索引擎', value: 40 },
    { name: '社交媒体', value: 25 },
    { name: '直接访问', value: 20 },
    { name: '邮件营销', value: 15 },
  ],
}

export class MockDataService implements IDataService {
  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    logger.info('MockDataService: fetching dashboard data')
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      code: 200,
      message: 'ok',
      data: MOCK_DATA,
    }
  }
}

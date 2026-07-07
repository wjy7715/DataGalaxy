export interface ChartDataPoint {
  name: string
  value: number
}

export interface TimeSeriesPoint {
  time: string
  value: number
  category?: string
}

export interface ChartConfig {
  id: string
  title: string
  type: 'bar' | 'line' | 'pie'
  width?: number
  height?: number
}

export interface DashboardData {
  totalUsers: number
  totalOrders: number
  revenue: number
  conversionRate: number
  barChart: ChartDataPoint[]
  lineChart: TimeSeriesPoint[]
  pieChart: ChartDataPoint[]
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

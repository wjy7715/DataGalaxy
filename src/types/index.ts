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

export type TrendType = 'up' | 'down'

export interface StatItem {
  label: string
  value: number
  icon: string
  trend: TrendType
  trendValue: string
}

export interface RankItem {
  rank: number
  pageName: string
  pv: number
  uv: number
  bounceRate: number
}

export interface DashboardData {
  statCards: StatItem[]
  barChart: ChartDataPoint[]
  lineChart: TimeSeriesPoint[]
  pieChart: ChartDataPoint[]
  rankList: RankItem[]
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

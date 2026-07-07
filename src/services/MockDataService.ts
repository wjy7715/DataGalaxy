import type { IDataService } from './DataService'
import type { DashboardData, ApiResponse } from '../types'
import { logger } from '../utils/logger'

function jitter(base: number, pct = 0.05): number {
  const delta = base * pct * (Math.random() * 2 - 1)
  return Math.round(base + delta)
}

function buildMockData(): DashboardData {
  return {
    statCards: [
      { label: '用户总数', value: jitter(12846), icon: '👤', trend: 'up', trendValue: '12.5%' },
      { label: '订单总量', value: jitter(5892), icon: '📦', trend: 'up', trendValue: '8.3%' },
      { label: '营收 (元)', value: jitter(2365000), icon: '💰', trend: 'up', trendValue: '15.7%' },
      {
        label: '转化率',
        value: +(12.8 + (Math.random() - 0.5) * 1.2).toFixed(1),
        icon: '📈',
        trend: 'down',
        trendValue: '2.1%',
      },
      { label: '当前在线', value: jitter(1023), icon: '🟢', trend: 'up', trendValue: '5.6%' },
    ],
    barChart: [
      { name: '周一', value: jitter(320) },
      { name: '周二', value: jitter(450) },
      { name: '周三', value: jitter(380) },
      { name: '周四', value: jitter(510) },
      { name: '周五', value: jitter(680) },
      { name: '周六', value: jitter(420) },
      { name: '周日', value: jitter(290) },
    ],
    lineChart: [
      { time: '00:00', value: jitter(120), category: '访问量' },
      { time: '02:00', value: jitter(90), category: '访问量' },
      { time: '04:00', value: jitter(60), category: '访问量' },
      { time: '06:00', value: jitter(140), category: '访问量' },
      { time: '08:00', value: jitter(350), category: '访问量' },
      { time: '10:00', value: jitter(480), category: '访问量' },
      { time: '12:00', value: jitter(520), category: '访问量' },
      { time: '14:00', value: jitter(590), category: '访问量' },
      { time: '16:00', value: jitter(610), category: '访问量' },
      { time: '18:00', value: jitter(530), category: '访问量' },
      { time: '20:00', value: jitter(420), category: '访问量' },
      { time: '22:00', value: jitter(280), category: '访问量' },
      { time: '00:00', value: jitter(80), category: '订单量' },
      { time: '02:00', value: jitter(50), category: '订单量' },
      { time: '04:00', value: jitter(30), category: '订单量' },
      { time: '06:00', value: jitter(70), category: '订单量' },
      { time: '08:00', value: jitter(180), category: '订单量' },
      { time: '10:00', value: jitter(260), category: '订单量' },
      { time: '12:00', value: jitter(310), category: '订单量' },
      { time: '14:00', value: jitter(350), category: '订单量' },
      { time: '16:00', value: jitter(370), category: '订单量' },
      { time: '18:00', value: jitter(300), category: '订单量' },
      { time: '20:00', value: jitter(220), category: '订单量' },
      { time: '22:00', value: jitter(140), category: '订单量' },
    ],
    pieChart: [
      { name: '搜索引擎', value: jitter(3850) },
      { name: '社交媒体', value: jitter(2410) },
      { name: '直接访问', value: jitter(1980) },
      { name: '邮件营销', value: jitter(1350) },
      { name: '外部引荐', value: jitter(870) },
    ],
    rankList: [
      {
        rank: 1,
        pageName: '首页 Dashboard',
        pv: jitter(48500),
        uv: jitter(32100),
        bounceRate: +(28.5 + Math.random()).toFixed(1),
      },
      {
        rank: 2,
        pageName: '商品详情页',
        pv: jitter(38200),
        uv: jitter(25600),
        bounceRate: +(35.2 + Math.random()).toFixed(1),
      },
      {
        rank: 3,
        pageName: '搜索结果页',
        pv: jitter(29100),
        uv: jitter(19300),
        bounceRate: +(22.8 + Math.random()).toFixed(1),
      },
      {
        rank: 4,
        pageName: '用户中心',
        pv: jitter(18300),
        uv: jitter(14200),
        bounceRate: +(18.6 + Math.random()).toFixed(1),
      },
      {
        rank: 5,
        pageName: '促销活动页',
        pv: jitter(15600),
        uv: jitter(11800),
        bounceRate: +(42.1 + Math.random()).toFixed(1),
      },
      {
        rank: 6,
        pageName: '帮助文档',
        pv: jitter(8900),
        uv: jitter(7200),
        bounceRate: +(55.3 + Math.random()).toFixed(1),
      },
      {
        rank: 7,
        pageName: '关于我们',
        pv: jitter(5600),
        uv: jitter(4800),
        bounceRate: +(48.9 + Math.random()).toFixed(1),
      },
      {
        rank: 8,
        pageName: '意见反馈',
        pv: jitter(3200),
        uv: jitter(2600),
        bounceRate: +(62.7 + Math.random()).toFixed(1),
      },
    ],
  }
}

export class MockDataService implements IDataService {
  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    logger.info('MockDataService: fetching dashboard data')
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      code: 200,
      message: 'ok',
      data: buildMockData(),
    }
  }
}

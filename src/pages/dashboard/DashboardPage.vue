<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '../../stores/dashboard'
import ChartCard from '../../components/common/ChartCard.vue'
import BarChart from '../../components/charts/BarChart.vue'
import LineChart from '../../components/charts/LineChart.vue'
import PieChart from '../../components/charts/PieChart.vue'

const store = useDashboardStore()

onMounted(() => {
  store.fetchDashboard()
})

function formatNum(n: number): string {
  return n.toLocaleString()
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <div class="stat-card">
        <span class="stat-card__label">用户总数</span>
        <span class="stat-card__value">{{
          store.data ? formatNum(store.data.totalUsers) : '--'
        }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">订单量</span>
        <span class="stat-card__value">{{
          store.data ? formatNum(store.data.totalOrders) : '--'
        }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">营收 (元)</span>
        <span class="stat-card__value">{{
          store.data ? formatNum(store.data.revenue) : '--'
        }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">转化率</span>
        <span class="stat-card__value">{{
          store.data ? store.data.conversionRate + '%' : '--'
        }}</span>
      </div>
    </div>

    <div v-if="store.loading" class="dashboard__loading">数据加载中...</div>
    <div v-else-if="store.error" class="dashboard__error">
      {{ store.error }}
    </div>

    <div v-if="store.data" class="dashboard__charts">
      <ChartCard title="周访问量统计">
        <BarChart :data="store.data.barChart" />
      </ChartCard>
      <ChartCard title="实时访问趋势">
        <LineChart :data="store.data.lineChart" />
      </ChartCard>
      <ChartCard title="流量来源分布">
        <PieChart :data="store.data.pieChart" />
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.stat-card__label {
  font-size: 14px;
  color: #888;
}
.stat-card__value {
  font-size: 28px;
  font-weight: 600;
  color: #00d4ff;
}
.dashboard__charts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.dashboard__loading,
.dashboard__error {
  text-align: center;
  padding: 60px;
  font-size: 16px;
  color: #888;
}
.dashboard__error {
  color: #ff5555;
}
</style>

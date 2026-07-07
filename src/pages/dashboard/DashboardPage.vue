<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '../../stores/dashboard'
import StatCard from '../../components/common/StatCard.vue'
import ChartCard from '../../components/common/ChartCard.vue'
import BarChart from '../../components/charts/BarChart.vue'
import LineChart from '../../components/charts/LineChart.vue'
import PieChart from '../../components/charts/PieChart.vue'
import RankList from '../../components/common/RankList.vue'

const store = useDashboardStore()

onMounted(() => {
  store.fetchDashboard().then(() => {
    store.startAutoRefresh(10000)
  })
})

onUnmounted(() => {
  store.stopAutoRefresh()
})

function retry() {
  store.fetchDashboard()
}
</script>

<template>
  <div class="dashboard">
    <!-- Loading overlay -->
    <div v-if="store.loading && !store.data" class="dashboard__loading">
      <div class="loading-spinner" />
      <span>数据加载中...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="store.error" class="dashboard__error">
      <p>{{ store.error }}</p>
      <button class="dashboard__retry-btn" @click="retry">重新加载</button>
    </div>

    <!-- Main content -->
    <template v-else-if="store.data">
      <div class="dashboard__stats">
        <StatCard
          v-for="stat in store.data.statCards"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :trend="stat.trend"
          :trend-value="stat.trendValue"
        />
      </div>

      <div class="dashboard__row">
        <ChartCard title="周访问量统计">
          <BarChart :data="store.data.barChart" />
        </ChartCard>
        <ChartCard title="24h 实时趋势">
          <LineChart :data="store.data.lineChart" />
        </ChartCard>
      </div>

      <div class="dashboard__row">
        <ChartCard title="流量来源分布">
          <PieChart :data="store.data.pieChart" />
        </ChartCard>
        <ChartCard title="热门页面 TOP 8">
          <RankList :data="store.data.rankList" />
        </ChartCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.dashboard__row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.dashboard__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  color: #888;
  font-size: 15px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(0, 212, 255, 0.15);
  border-top-color: #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.dashboard__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: #ff5555;
  font-size: 15px;
}

.dashboard__retry-btn {
  padding: 8px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: #ccc;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.dashboard__retry-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>

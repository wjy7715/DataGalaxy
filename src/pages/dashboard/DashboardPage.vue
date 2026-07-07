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
    <div v-if="store.loading && !store.data" class="dashboard__loading">
      <div class="loading-brush" />
      <span>研磨中...</span>
    </div>

    <div v-else-if="store.error" class="dashboard__error">
      <p>{{ store.error }}</p>
      <button class="dashboard__retry-btn" @click="retry">重新加载</button>
    </div>

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
        <ChartCard title="周访问量">
          <BarChart :data="store.data.barChart" />
        </ChartCard>
        <ChartCard title="时辰趋势">
          <LineChart :data="store.data.lineChart" />
        </ChartCard>
      </div>

      <div class="dashboard__row">
        <ChartCard title="来源分布">
          <PieChart :data="store.data.pieChart" />
        </ChartCard>
        <ChartCard title="热门页面">
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
  gap: 18px;
  height: 100%;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

.dashboard__row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 18px;
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
  color: #a0998c;
  font-size: 15px;
  letter-spacing: 2px;
}

.loading-brush {
  width: 40px;
  height: 40px;
  border: 2px solid #e5ded0;
  border-top-color: #991b1b;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
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
  color: #991b1b;
  font-size: 15px;
}

.dashboard__retry-btn {
  padding: 8px 24px;
  border: 1px solid #c4a97d;
  border-radius: 2px;
  background: #fefefc;
  color: #2c2c2c;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 1px;
  transition: background 0.2s;
}

.dashboard__retry-btn:hover {
  background: rgba(153, 27, 27, 0.05);
}
</style>

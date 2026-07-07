<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()
const now = ref(new Date())
const dateStr = ref('')
const timeStr = ref('')
let timer: ReturnType<typeof setInterval> | null = null

function updateClock() {
  const d = new Date()
  now.value = d
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  dateStr.value = `${y}-${mo}-${day}`

  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  timeStr.value = `${h}:${m}:${s}`
}

function formatLastUpdated(): string {
  if (!store.lastUpdated) return ''
  const diff = now.value.getTime() - store.lastUpdated
  return diff < 2000 ? '已刷新' : ''
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer !== null) clearInterval(timer)
})
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <div class="main-layout__left">
        <span class="main-layout__deco" />
        <h1 class="main-layout__title">DataGalaxy 数据星河</h1>
        <span class="main-layout__subtitle">实时数据可视化大屏</span>
      </div>
      <div class="main-layout__right">
        <span v-if="formatLastUpdated()" class="main-layout__badge">{{ formatLastUpdated() }}</span>
        <span class="main-layout__date">{{ dateStr }}</span>
        <span class="main-layout__time">{{ timeStr }}</span>
      </div>
    </header>
    <main class="main-layout__body">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-layout__header {
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.main-layout__left {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.main-layout__deco {
  display: inline-block;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, transparent);
  border-radius: 1px;
}

.main-layout__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 3px;
}

.main-layout__subtitle {
  font-size: 12px;
  color: #555;
  letter-spacing: 1px;
}

.main-layout__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.main-layout__badge {
  font-size: 11px;
  color: #00ff88;
  background: rgba(0, 255, 136, 0.08);
  border: 1px solid rgba(0, 255, 136, 0.2);
  padding: 2px 10px;
  border-radius: 10px;
}

.main-layout__date {
  font-size: 13px;
  color: #666;
  font-variant-numeric: tabular-nums;
}

.main-layout__time {
  font-size: 18px;
  font-weight: 600;
  color: #00ff88;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
  min-width: 80px;
}

.main-layout__body {
  flex: 1;
  padding: 20px 28px;
  overflow: hidden;
}
</style>

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
        <span class="main-layout__seal" />
        <h1 class="main-layout__title">如意数据大屏</h1>
        <span class="main-layout__subtitle">RuyiBigScreen</span>
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
  padding: 16px 36px;
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 2px solid #e5ded0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  backdrop-filter: blur(6px);
}

.main-layout__left {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.main-layout__seal {
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 2px solid #991b1b;
  border-radius: 4px;
  position: relative;
  transform: rotate(3deg);
}

.main-layout__seal::after {
  content: '印';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #991b1b;
  font-weight: 700;
  font-family: 'STSong', 'SimSun', serif;
}

.main-layout__title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: 4px;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
}

.main-layout__subtitle {
  font-size: 11px;
  color: #a0998c;
  letter-spacing: 2px;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.main-layout__right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.main-layout__badge {
  font-size: 11px;
  color: #5b8c5a;
  background: rgba(91, 140, 90, 0.08);
  border: 1px solid rgba(91, 140, 90, 0.25);
  padding: 2px 10px;
  border-radius: 2px;
  letter-spacing: 1px;
}

.main-layout__date {
  font-size: 13px;
  color: #8c8c8c;
  font-variant-numeric: tabular-nums;
}

.main-layout__time {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  font-variant-numeric: tabular-nums;
  letter-spacing: 3px;
  min-width: 80px;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.main-layout__body {
  flex: 1;
  padding: 20px 32px;
  overflow: hidden;
}
</style>

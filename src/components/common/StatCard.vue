<script setup lang="ts">
import { toRef } from 'vue'
import type { TrendType } from '../../types'
import { useCountUp } from '../../composables/useCountUp'

const props = defineProps<{
  label: string
  value: number
  icon: string
  trend: TrendType
  trendValue: string
}>()

const { displayValue } = useCountUp(toRef(props, 'value'))
</script>

<template>
  <div class="stat-card">
    <div class="stat-card__header">
      <span class="stat-card__icon">{{ icon }}</span>
      <span class="stat-card__label">{{ label }}</span>
    </div>
    <div class="stat-card__value">{{ displayValue }}</div>
    <div
      class="stat-card__trend"
      :class="{
        'stat-card__trend--up': trend === 'up',
        'stat-card__trend--down': trend === 'down',
      }"
    >
      <span class="stat-card__arrow">{{ trend === 'up' ? '▲' : '▼' }}</span>
      <span>{{ trendValue }}</span>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: statPulse 3s ease-in-out infinite;
}

@keyframes statPulse {
  0%,
  100% {
    border-color: rgba(255, 255, 255, 0.08);
  }
  50% {
    border-color: rgba(0, 212, 255, 0.25);
  }
}

.stat-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-card__icon {
  font-size: 18px;
}

.stat-card__label {
  font-size: 13px;
  color: #888;
}

.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  color: #00d4ff;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.stat-card__trend--up {
  color: #00ff88;
}

.stat-card__trend--down {
  color: #ff5555;
}

.stat-card__arrow {
  font-size: 10px;
}
</style>

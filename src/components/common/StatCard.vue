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
      :class="trend === 'up' ? 'stat-card__trend--up' : 'stat-card__trend--down'"
    >
      <span class="stat-card__arrow">{{ trend === 'up' ? '▲' : '▼' }}</span>
      <span>{{ trendValue }}</span>
    </div>
    <!-- 四角回纹装饰 -->
    <span class="stat-card__corner stat-card__corner--tl" />
    <span class="stat-card__corner stat-card__corner--tr" />
    <span class="stat-card__corner stat-card__corner--bl" />
    <span class="stat-card__corner stat-card__corner--br" />
  </div>
</template>

<style scoped>
.stat-card {
  background: #fefefc;
  border: 1px solid #e5ded0;
  border-radius: 2px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  transition: box-shadow 0.4s ease;
}

.stat-card:hover {
  box-shadow: 0 2px 16px rgba(44, 62, 80, 0.08);
}

/* 回纹角装饰 */
.stat-card__corner {
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
}

.stat-card__corner::before,
.stat-card__corner::after {
  content: '';
  position: absolute;
  background: #c4a97d;
}

.stat-card__corner--tl {
  top: -1px;
  left: -1px;
}
.stat-card__corner--tl::before {
  top: 0;
  left: 0;
  width: 10px;
  height: 1px;
}
.stat-card__corner--tl::after {
  top: 0;
  left: 0;
  width: 1px;
  height: 10px;
}

.stat-card__corner--tr {
  top: -1px;
  right: -1px;
}
.stat-card__corner--tr::before {
  top: 0;
  right: 0;
  width: 10px;
  height: 1px;
}
.stat-card__corner--tr::after {
  top: 0;
  right: 0;
  width: 1px;
  height: 10px;
}

.stat-card__corner--bl {
  bottom: -1px;
  left: -1px;
}
.stat-card__corner--bl::before {
  bottom: 0;
  left: 0;
  width: 10px;
  height: 1px;
}
.stat-card__corner--bl::after {
  bottom: 0;
  left: 0;
  width: 1px;
  height: 10px;
}

.stat-card__corner--br {
  bottom: -1px;
  right: -1px;
}
.stat-card__corner--br::before {
  bottom: 0;
  right: 0;
  width: 10px;
  height: 1px;
}
.stat-card__corner--br::after {
  bottom: 0;
  right: 0;
  width: 1px;
  height: 10px;
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
  color: #8c8c8c;
  letter-spacing: 1px;
}

.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.stat-card__trend--up {
  color: #991b1b;
}

.stat-card__trend--down {
  color: #5b8c5a;
}

.stat-card__arrow {
  font-size: 10px;
}
</style>

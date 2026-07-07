<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-card__title">{{ title }}</h3>
    <div class="chart-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background: #fefefc;
  border: 1px solid #e5ded0;
  border-radius: 2px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chart-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d4cbb8, transparent);
}

.chart-card__title {
  margin: 0 0 14px 0;
  padding-left: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: 2px;
  border-left: 3px solid #991b1b;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
}

.chart-card__body {
  flex: 1;
  min-height: 0;
}
</style>

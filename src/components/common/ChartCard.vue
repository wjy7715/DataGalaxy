<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-card__title">
      {{ title }}
    </h3>
    <div class="chart-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  backdrop-filter: blur(10px);
}
.chart-card__title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
}
.chart-card__body {
  width: 100%;
  height: calc(100% - 32px);
}
</style>

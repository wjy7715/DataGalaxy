<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <h1 class="main-layout__title">DataGalaxy 数据星河</h1>
      <span class="main-layout__subtitle">实时数据可视化大屏</span>
    </header>
    <main class="main-layout__body">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-layout__header {
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.main-layout__title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #00d4ff;
  letter-spacing: 2px;
}
.main-layout__subtitle {
  font-size: 14px;
  color: #888;
}
.main-layout__body {
  flex: 1;
  padding: 24px;
}
</style>

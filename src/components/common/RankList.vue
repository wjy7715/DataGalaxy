<script setup lang="ts">
import type { RankItem } from '../../types'

defineProps<{
  data: RankItem[]
}>()

const MEDAL_COLORS: Record<number, string> = {
  1: '#991b1b',
  2: '#b8860b',
  3: '#5b8c5a',
}
</script>

<template>
  <div class="rank-list">
    <div class="rank-list__header">
      <span class="rank-list__col rank-list__col--rank">#</span>
      <span class="rank-list__col rank-list__col--name">页面名称</span>
      <span class="rank-list__col rank-list__col--num">PV</span>
      <span class="rank-list__col rank-list__col--num">UV</span>
      <span class="rank-list__col rank-list__col--num">跳出率</span>
    </div>
    <TransitionGroup name="rank-item" tag="div">
      <div v-for="item in data" :key="item.rank" class="rank-list__row">
        <span class="rank-list__col rank-list__col--rank">
          <span
            v-if="item.rank <= 3"
            class="rank-list__medal"
            :style="{ background: MEDAL_COLORS[item.rank] }"
            >{{ item.rank }}</span
          >
          <span v-else class="rank-list__index">{{ item.rank }}</span>
        </span>
        <span class="rank-list__col rank-list__col--name">{{ item.pageName }}</span>
        <span class="rank-list__col rank-list__col--num">{{ item.pv.toLocaleString() }}</span>
        <span class="rank-list__col rank-list__col--num">{{ item.uv.toLocaleString() }}</span>
        <span class="rank-list__col rank-list__col--num">{{ item.bounceRate }}%</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.rank-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.rank-list__header {
  display: flex;
  padding: 8px 14px;
  font-size: 12px;
  color: #a0998c;
  letter-spacing: 1px;
  border-bottom: 1px solid #e5ded0;
}

.rank-list__row {
  display: flex;
  padding: 10px 14px;
  font-size: 13px;
  color: #4a4a4a;
  transition: background 0.3s;
  border-bottom: 1px solid #f2efe7;
}

.rank-list__row:nth-child(even) {
  background: rgba(196, 169, 125, 0.06);
}

.rank-list__row:hover {
  background: rgba(153, 27, 27, 0.04);
}

.rank-list__col--rank {
  width: 36px;
  text-align: center;
  flex-shrink: 0;
}

.rank-list__col--name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-list__col--num {
  width: 72px;
  text-align: right;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.rank-list__medal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  font-family: 'Georgia', serif;
}

.rank-list__index {
  color: #b5a995;
  font-family: 'Georgia', serif;
}

.rank-item-enter-active {
  transition: all 0.4s ease;
}

.rank-item-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChart } from '../../composables/useChart'
import type { TimeSeriesPoint } from '../../types'

const props = defineProps<{
  data: TimeSeriesPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

watch(
  () => props.data,
  (val) => {
    setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: val.map((d) => d.time),
        axisLabel: { color: '#999' },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#999' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      },
      series: [
        {
          type: 'line',
          data: val.map((d) => d.value),
          smooth: true,
          lineStyle: { color: '#00ff88', width: 2 },
          itemStyle: { color: '#00ff88' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0,255,136,0.3)' },
                { offset: 1, color: 'rgba(0,255,136,0.02)' },
              ],
            },
          },
        },
      ],
    })
  },
  { immediate: true },
)
</script>

<template>
  <div ref="chartRef" class="line-chart" />
</template>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;
  min-height: 280px;
}
</style>

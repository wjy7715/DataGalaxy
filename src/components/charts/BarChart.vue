<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChart } from '../../composables/useChart'
import type { ChartDataPoint } from '../../types'

const props = defineProps<{
  data: ChartDataPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

watch(
  () => props.data,
  (val) => {
    if (!val.length) return
    setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      grid: { left: '1%', right: '3%', top: '8%', bottom: '2%', containLabel: true },
      xAxis: {
        type: 'category',
        data: val.map((d) => d.name),
        axisLabel: { color: '#888', fontSize: 12 },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#888', fontSize: 12 },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      },
      series: [
        {
          type: 'bar',
          data: val.map((d) => d.value),
          animationDuration: 1000,
          barWidth: '50%',
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: '#0055aa' },
              ],
            },
          },
          label: {
            show: true,
            position: 'top',
            color: '#aaa',
            fontSize: 11,
          },
        },
      ],
    })
  },
  { immediate: true },
)
</script>

<template>
  <div ref="chartRef" class="bar-chart" />
</template>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>

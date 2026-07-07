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
    setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: val.map((d) => d.name),
        axisLabel: { color: '#999' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#999' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      },
      series: [
        {
          type: 'bar',
          data: val.map((d) => d.value),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: '#0066cc' },
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
  <div ref="chartRef" class="bar-chart" />
</template>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
  min-height: 280px;
}
</style>

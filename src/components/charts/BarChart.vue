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
        axisLabel: { color: '#7a7a7a', fontSize: 12 },
        axisLine: { lineStyle: { color: '#d9d0c1' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#7a7a7a', fontSize: 12 },
        splitLine: { lineStyle: { color: '#ede8db', type: 'dashed' } },
      },
      series: [
        {
          type: 'bar',
          data: val.map((d) => d.value),
          animationDuration: 1000,
          barWidth: '45%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#3d5a80' },
                { offset: 1, color: '#5b8c5a' },
              ],
            },
          },
          label: {
            show: true,
            position: 'top',
            color: '#8c8c8c',
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

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChart } from '../../composables/useChart'
import type { ChartDataPoint } from '../../types'

const props = defineProps<{
  data: ChartDataPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

const COLORS = ['#00d4ff', '#0066cc', '#00ff88', '#ffcc00']

watch(
  () => props.data,
  (val) => {
    setOption({
      tooltip: { trigger: 'item' },
      legend: {
        bottom: 0,
        textStyle: { color: '#999' },
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: 'rgba(0,0,0,0.8)',
            borderWidth: 2,
          },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' },
          },
          data: val.map((d, i) => ({
            ...d,
            itemStyle: { color: COLORS[i % COLORS.length] },
          })),
        },
      ],
    })
  },
  { immediate: true },
)
</script>

<template>
  <div ref="chartRef" class="pie-chart" />
</template>

<style scoped>
.pie-chart {
  width: 100%;
  height: 100%;
  min-height: 280px;
}
</style>

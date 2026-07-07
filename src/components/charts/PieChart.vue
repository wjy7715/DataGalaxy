<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChart } from '../../composables/useChart'
import type { ChartDataPoint } from '../../types'

const props = defineProps<{
  data: ChartDataPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

const COLORS = ['#00d4ff', '#0066cc', '#00ff88', '#ffcc00', '#ff6b9d']

watch(
  () => props.data,
  (val) => {
    if (!val.length) return
    const total = val.reduce((sum, d) => sum + d.value, 0)
    setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: {
        bottom: 0,
        textStyle: { color: '#888', fontSize: 12 },
      },
      graphic: {
        type: 'text',
        left: 'center',
        top: '42%',
        style: {
          text: `总流量\n${total.toLocaleString()}`,
          textAlign: 'center',
          fill: '#ccc',
          fontSize: 14,
          lineHeight: 24,
        },
      },
      series: [
        {
          type: 'pie',
          roseType: 'area',
          radius: ['50%', '78%'],
          center: ['50%', '46%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: 'rgba(10,14,39,0.8)',
            borderWidth: 3,
          },
          label: { show: false },
          emphasis: {
            scaleSize: 8,
            label: { show: true, fontSize: 13, fontWeight: 'bold' },
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
  min-height: 260px;
}
</style>

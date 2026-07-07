<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChart } from '../../composables/useChart'
import type { ChartDataPoint } from '../../types'

const props = defineProps<{
  data: ChartDataPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

const COLORS = ['#2c3e50', '#991b1b', '#5b8c5a', '#b8860b', '#c4a97d']

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
        textStyle: { color: '#7a7a7a', fontSize: 12 },
      },
      graphic: {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: `总计\n${total.toLocaleString()}`,
          textAlign: 'center',
          fill: '#2c2c2c',
          fontSize: 14,
          lineHeight: 26,
          fontFamily: 'Georgia, serif',
        },
      },
      series: [
        {
          type: 'pie',
          roseType: 'area',
          radius: ['48%', '76%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fbf9f3',
            borderWidth: 2,
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

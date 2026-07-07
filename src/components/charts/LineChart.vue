<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useChart } from '../../composables/useChart'
import type { TimeSeriesPoint } from '../../types'

const props = defineProps<{
  data: TimeSeriesPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const { setOption } = useChart(chartRef)

const categories = computed(() => [...new Set(props.data.map((d) => d.category ?? '访问量'))])

const LINE_STYLES: Record<string, { color: string; gradientColor: string }> = {
  访问量: { color: '#00d4ff', gradientColor: 'rgba(0,212,255,' },
  订单量: { color: '#00ff88', gradientColor: 'rgba(0,255,136,' },
}

watch(
  () => [props.data, categories.value] as const,
  ([val, cats]) => {
    if (!val.length) return

    const times = [...new Set(val.map((d) => d.time))]

    const series = cats.map((cat) => {
      const catData = val.filter((d) => (d.category ?? '访问量') === cat)
      const style = LINE_STYLES[cat] ?? { color: '#00d4ff', gradientColor: 'rgba(0,212,255,' }
      return {
        name: cat,
        type: 'line' as const,
        data: times.map((t) => catData.find((d) => d.time === t)?.value ?? null),
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: style.color, width: 2.5 },
        itemStyle: { color: style.color },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${style.gradientColor}0.35)` },
              { offset: 1, color: `${style.gradientColor}0.02)` },
            ],
          },
        },
      }
    })

    setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: cats,
        top: 0,
        textStyle: { color: '#888', fontSize: 12 },
      },
      grid: { left: '1%', right: '3%', top: '12%', bottom: '2%', containLabel: true },
      xAxis: {
        type: 'category',
        data: times,
        boundaryGap: false,
        axisLabel: { color: '#888', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#888', fontSize: 12 },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      },
      series,
    })
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div ref="chartRef" class="line-chart" />
</template>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>

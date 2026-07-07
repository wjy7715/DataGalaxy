import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as echarts from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
])

export function useChart(chartRef: Ref<HTMLElement | null>) {
  const instance = ref<echarts.ECharts | null>(null)

  function initChart() {
    if (!chartRef.value) return
    instance.value = echarts.init(chartRef.value)
  }

  function setOption(option: EChartsCoreOption) {
    instance.value?.setOption(option)
  }

  function resize() {
    instance.value?.resize()
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    instance.value?.dispose()
  })

  return { instance, setOption, resize }
}

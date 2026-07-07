import { ref, watch, type Ref } from 'vue'

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function useCountUp(target: Ref<number>, duration = 1500): { displayValue: Ref<string> } {
  const displayValue = ref('0')
  let animFrame: number | null = null

  function formatNum(n: number): string {
    if (Number.isInteger(n)) return n.toLocaleString()
    return n.toFixed(1)
  }

  function animate(from: number, to: number) {
    const startTime = performance.now()

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = from + (to - from) * eased

      displayValue.value = formatNum(current)

      if (progress < 1) {
        animFrame = requestAnimationFrame(step)
      } else {
        displayValue.value = formatNum(to)
      }
    }

    if (animFrame !== null) cancelAnimationFrame(animFrame)
    animFrame = requestAnimationFrame(step)
  }

  let prevValue = target.value
  animate(0, prevValue)

  watch(target, (newVal) => {
    animate(prevValue, newVal)
    prevValue = newVal
  })

  return { displayValue }
}

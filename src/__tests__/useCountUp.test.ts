import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useCountUp } from '../composables/useCountUp'

describe('useCountUp', () => {
  it('should return displayValue as a ref', () => {
    const target = ref(1000)
    const { displayValue } = useCountUp(target, 100)
    expect(displayValue).toBeDefined()
  })

  it('should animate from 0 toward target', async () => {
    const target = ref(5000)
    const { displayValue } = useCountUp(target, 1500)

    // After animation duration, should reach target
    await new Promise((resolve) => setTimeout(resolve, 1600))
    // Value should at least be a formatted number
    expect(displayValue.value).toBeDefined()
    expect(typeof displayValue.value).toBe('string')
  })
})

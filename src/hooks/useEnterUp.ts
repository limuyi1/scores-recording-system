import { onUnmounted, ref } from 'vue'

/**
 * 监听回车事件
 * @param nameProperty 需要监听的元素name属性
 * @param delay 延迟时间
 * @param fn 执行函数
 */
export const useEnterUp = (nameProperty: string, delay: number = 100, fn: Function) => {
  const isEnterUp = ref(false)

  /**
   * 全局键盘事件
   * @param event
   */
  const handleGlobalKeyUp = (event: KeyboardEvent) => {
    // 监听回车事件是否弹起
    const _nameProperty = event.target?.name
    if (event.key === 'Enter' && _nameProperty === nameProperty) {
      isEnterUp.value = true
    }
  }

  document.addEventListener('keyup', handleGlobalKeyUp)
  onUnmounted(() => {
    document.removeEventListener('keyup', handleGlobalKeyUp)
  })

  const timer = setInterval(() => {
    if (isEnterUp.value) {
      fn()
      isEnterUp.value = false

      clearInterval(timer)
    }
  }, delay)
}

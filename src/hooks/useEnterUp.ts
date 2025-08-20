import { onUnmounted, ref } from 'vue'

/**
 * 监听回车事件
 * @param nameProperty 需要监听的元素name属性
 * @param fn 执行函数
 * @param delay 延迟时间
 */
export const useEnterUp = (nameProperty: string, fn: Function, delay: number = 100) => {
  const isEnterUp = ref(false)
  let timer: number | null = null

  /**
   * 全局键盘事件
   * @param event
   */
  const handleGlobalKeyUp = (event: KeyboardEvent) => {
    // 监听回车事件是否弹起
    const target = event.target as HTMLElement | null
    // @ts-ignore
    const _nameProperty = target?.name || null
    if (event.key === 'Enter' && _nameProperty === nameProperty) {
      isEnterUp.value = true
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        try {
          fn()
        } catch (error) {
          console.error(error)
        }
        isEnterUp.value = false
      }, delay)
    }
  }

  document.addEventListener('keyup', handleGlobalKeyUp)
  onUnmounted(() => {
    document.removeEventListener('keyup', handleGlobalKeyUp)
    if (timer) {
      clearInterval(timer)
    }
  })
}

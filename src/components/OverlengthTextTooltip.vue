<script setup lang="ts">
import { ref, computed, type StyleValue } from 'vue'
import { useResizeObserver } from '@vueuse/core'

interface Props {
  content: string | number
  width?: number
  level?: number
  customClass?: string
  customStyle?: StyleValue
}
const props = withDefaults(defineProps<Props>(), {
  level: 1
})

const text = ref<HTMLElement>()
const isEllipsis = ref(false)

/**
 * 监听元素大小变化
 */
useResizeObserver(text, () => {
  checkEllipsis()
})

/**
 * 检测是否超出
 */
const checkEllipsis = () => {
  const _text = text.value as HTMLElement

  if (!_text) {
    return
  }

  const range = document.createRange()
  range.setStart(_text, 0)
  range.setEnd(_text, _text.childNodes.length)
  window.getSelection()!.addRange(range)
  const rangeWidth = range.getBoundingClientRect().width // 所有文字的宽度
  const rangeHeight = range.getBoundingClientRect().height // 所有文字的高度

  const { pLeft, pRight, pTop, pBottom } = getPadding(_text)
  const horizontalPadding = pLeft + pRight
  const verticalPadding = pTop + pBottom

  isEllipsis.value =
    rangeWidth + horizontalPadding > _text.offsetWidth ||
    rangeHeight + verticalPadding > _text.offsetHeight
}

/**
 * 获取元素的内边距
 * @param el
 */
const getPadding = (el: HTMLElement) => {
  const style = window.getComputedStyle(el, null)
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0
  return {
    pLeft: paddingLeft,
    pRight: paddingRight,
    pTop: paddingTop,
    pBottom: paddingBottom
  }
}

const getStyle = computed(() => {
  return Object.assign(
    {},
    { width: `${props.width}px`, '-webkit-line-clamp': props.level },
    props.customStyle
  )
})
</script>

<template>
  <el-tooltip :content="content" placement="top" :disabled="!isEllipsis">
    <div ref="text" :class="['overlength-text-tooltip', customClass]" :style="getStyle">
      {{ content }}
    </div>
  </el-tooltip>
</template>

<style scoped lang="scss">
.overlength-text-tooltip {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>

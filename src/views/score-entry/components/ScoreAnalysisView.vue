<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataSourceStore } from '@/stores/data-source'

import { computed } from 'vue'

const store = useDataSourceStore()

const { data } = storeToRefs(store)

const percentage = computed(() => {
  const count = data.value.length
  const notEmptyCount = data.value.filter((item) => item.score !== null).length

  return Number((notEmptyCount / count).toFixed(2)) * 100
})

/**
 * 颜色
 * @param percentage
 */
const colorFun = (percentage: number) => {
  return `rgba(82, 155, 46,${percentage / 100})`
}

/**
 * 进度值
 * @param percentage
 */
const progressTextFormat = (percentage: number) => {
  return `完成率：${percentage}%`
}
</script>

<template>
  <div>
    <el-progress
      text-inside
      :stroke-width="26"
      :percentage="percentage"
      :format="progressTextFormat"
      :color="colorFun"
    />
  </div>
</template>

<style scoped lang="scss"></style>

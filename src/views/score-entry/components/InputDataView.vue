<script setup lang="ts">
import { ref } from 'vue'

import StatisticsCard from '@/views/score-entry/components/StatisticsCard.vue'
import InputCard from '@/views/score-entry/components/InputCard.vue'
import type { ListItemType } from '@/types/DataSource'

const inputCardRef = ref<InstanceType<typeof InputCard>>()

const emit = defineEmits(['scroll'])

/**
 * 自动聚焦
 */
const autoFocus = () => {
  inputCardRef.value?.autoFocus()
}

/**
 * 编辑数据
 * @param data
 */
const editData = (data: ListItemType) => {
  inputCardRef.value?.editData(data)
}

defineExpose({
  autoFocus,
  editData
})
</script>

<template>
  <div class="input-data-view__wrapper">
    <statistics-card />
    <div class="space"></div>
    <input-card ref="inputCardRef" @scroll="(index) => emit('scroll', index)" />
  </div>
</template>

<style scoped lang="scss">
.input-data-view__wrapper {
  height: calc(100vh - 60px - 55px - 20px);
  box-sizing: border-box;

  .space {
    height: 20px;
  }
}
</style>

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
    <input-card ref="inputCardRef" @scroll="(index) => emit('scroll', index)"/>
  </div>
</template>

<style scoped lang="scss">
.input-data-view__wrapper {
  padding: 0 12px 0 16px;
  box-sizing: border-box;
}
</style>

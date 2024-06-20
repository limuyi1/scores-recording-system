<script setup lang="ts">
import { ref } from 'vue'

import ConfigurationCard from '@/views/final-evaluation/components/ConfigurationCard.vue'
import InputCard from '@/views/score-entry/components/InputCard.vue'

import { InputEnum } from '@/types/Common'

const inputCardRef = ref<InstanceType<typeof InputCard>>()

/**
 * 自动聚焦
 */
const autoFocus = () => {
  inputCardRef.value?.autoFocus()
}

defineExpose({
  autoFocus
})
</script>

<template>
  <div class="tool-panel-view__wrapper">
    <configuration-card />
    <input-card ref="inputCardRef" :type="InputEnum.COMMENT" />
  </div>
</template>

<style scoped lang="scss">
.tool-panel-view__wrapper {
  padding: 0 20px 20px;
  box-sizing: border-box;
}
</style>

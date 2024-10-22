<script setup lang="ts">
import { ref, computed } from 'vue'

import ConfigurationCard from '@/views/final-evaluation/components/ConfigurationCard.vue'
import InputCard from '@/views/score-entry/components/InputCard.vue'

import { InputEnum } from '@/types/Common'
import { storeToRefs } from 'pinia'
import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const emit = defineEmits(['scroll'])

const { data } = storeToRefs(store)

const inputCardRef = ref<InstanceType<typeof InputCard>>()

const percentage = computed(() => {
  const count = data.value.length
  const notEmptyCount = data.value.filter((item) => item.comment !== null).length

  return Number((notEmptyCount / count).toFixed(2)) * 100
})

/**
 * 自动聚焦
 */
const autoFocus = () => {
  inputCardRef.value?.autoFocus()
}

/**
 * 颜色
 * @param percentage
 */
const colorFun = (percentage: number) => {
  return `rgba(82, 155, 46,${percentage / 100})`
}

defineExpose({
  autoFocus
})
</script>

<template>
  <div class="tool-panel-view__wrapper">
    <configuration-card />
    <el-row :gutter="20">
      <el-col :span="12">
        <input-card
          ref="inputCardRef"
          :type="InputEnum.COMMENT"
          @scroll="(index) => emit('scroll', index)"
        />
      </el-col>
      <el-col :span="12">
        <el-card class="tool-panel-view--progress__wrapper">
          <template #header>完成率</template>
          <el-progress type="dashboard" :percentage="percentage" :color="colorFun" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.tool-panel-view__wrapper {
  padding: 0 20px 20px;
  box-sizing: border-box;

  .tool-panel-view--progress__wrapper {
    height: 100%;
  }
}

.tool-panel-view--progress__wrapper :deep(.el-card__body) {
  height: calc(100% - 105px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

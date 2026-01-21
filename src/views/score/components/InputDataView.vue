<script setup lang="ts">
import { computed, ref } from 'vue'

import InputCard from '@/views/score/components/InputCard.vue'

import { useDataSourceStore } from '@/stores/data-source'
import { storeToRefs } from 'pinia'

import type { ListItemType } from '@/types/DataSource'

const store = useDataSourceStore()
const { data: originList } = storeToRefs(store)

const inputCardRef = ref<InstanceType<typeof InputCard>>()

const emit = defineEmits(['scroll'])

const percentage = computed(() => {
  const count = originList.value.length
  const notEmptyCount = originList.value.filter((item) => item.score !== null).length

  return Number((notEmptyCount / count).toFixed(2)) * 100
})

/**
 * 颜色
 * @param percentage
 */
const colorFun = (percentage: number) => {
  // return `rgba(82, 155, 46, ${percentage / 100})`
  return `rgba(82, 155, 46, 1)`
}

/**
 * 进度值
 * @param percentage
 */
const progressTextFormat = (percentage: number) => {
  return `完成率：${percentage.toFixed(2)}%`
}

/**
 * 获取未输入分数的列表
 */
const hasNullScoreList = computed(() => {
  const data = originList.value as Array<ListItemType>
  return data.filter((e: ListItemType) => e.score === null)
})

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
const editData = (data: any) => {
  inputCardRef.value?.editData(data)
}

defineExpose({
  autoFocus,
  editData
})
</script>

<template>
  <div class="input-data-view__wrapper">
    <el-card>
      <el-popover placement="top" :width="400" trigger="hover">
        <template #reference>
          <el-progress
            class="input-data-view--progress"
            text-inside
            :stroke-width="18"
            striped-flow
            :percentage="percentage"
            :format="progressTextFormat"
            :color="colorFun"
          />
        </template>
        <el-tag
          v-for="item in hasNullScoreList"
          :key="item.id"
          style="margin: 0 3px 3px 0"
          class="ml-2"
          type="info"
        >
          {{ item.name }}
        </el-tag>
      </el-popover>
    </el-card>
    <div class="space"></div>
    <input-card ref="inputCardRef" @scroll="(index) => emit('scroll', index)" />
  </div>
</template>

<style scoped lang="scss">
.input-data-view__wrapper {
  height: calc(100vh - 60px - 55px - 12px);
  box-sizing: border-box;

  .space {
    height: 12px;
  }

  .input-data-view--progress {
    :deep(.el-progress-bar__innerText) {
      line-height: 18px;
      margin-top: -5px;
    }
  }
}
</style>

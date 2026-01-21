<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ElScrollbar } from 'element-plus'

import EvaluationCard from '@/views/evaluation/components/EvaluationCard.vue'

import { useDataSourceStore } from '@/stores/data-source'
import { useConfigurationStore } from '@/stores/configuration'
import { mmToPixel, pageSizeInPixels } from '@/untils/pageSizeInPixelUntil'

const store = useDataSourceStore()
const { data: tableData } = storeToRefs(store)

const configurationStore = useConfigurationStore()
const { data: configuration } = storeToRefs(configurationStore)

const config = {
  width: 90,
  height: 69,
  margin: 12.7
}

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const dataSource = ref<any[][]>([])
const cellInfo = reactive({
  width: 0,
  height: 0
})

onMounted(() => {
  init()
})

const init = () => {
  const cellWidth = mmToPixel(config.width)
  const cellHeight = mmToPixel(config.height)
  cellInfo.width = cellWidth
  cellInfo.height = cellHeight

  // 根据下拉选择的类型，获取页面尺寸
  const { width, height } = pageSizeInPixels(configuration.value.pageType)
  // 先按照默认最小的margin计算出每行的列数
  const columnCount = Math.floor((width - config.margin * 2) / cellWidth)
  // 算出真实的margin值
  const margin = width - cellWidth * columnCount
  // 每页的层数
  const cellLevel = Math.floor((height - margin) / cellHeight)
  // 每页的数据进行分组
  dataSource.value = groupArray(tableData.value, cellLevel * columnCount)
}

const groupArray = (array: any[], groupSize: number) => {
  let groups = []
  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize))
  }
  return groups
}

/**
 * 滚动到指定行
 * @param index
 */
const scroll = (index: number) => {
  // TODO 情况过多，待优化
  /*// 在一页之内
  if (index <= 12) {
  }

  const topDistance = Math.floor(index / 2) * cellInfo.height
  scrollbarRef.value!.setScrollTop(topDistance)*/
}

defineExpose({ scroll })
</script>

<template>
  <el-scrollbar ref="scrollbarRef" height="calc(100vh - 60px - 55px - 20px)" always>
    <div class="evaluation-form-view__wrapper">
      <evaluation-card
        v-for="(data, index) in dataSource"
        :cell-info="cellInfo"
        :data="data"
        :key="index"
      />
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.evaluation-form-view__wrapper {
  height: 100%;
}
</style>

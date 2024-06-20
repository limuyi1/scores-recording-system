<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import EvaluationCard from '@/views/final-evaluation/components/EvaluationCard.vue'

import { useDataSourceStore } from '@/stores/data-source'
import { useConfigurationStore } from '@/stores/configuration'
import { pageSizeInPixels } from '@/untils/pageSizeInPixelUntil'

const store = useDataSourceStore()
const { data: tableData } = storeToRefs(store)

const configurationStore = useConfigurationStore()
const { data: configuration } = storeToRefs(configurationStore)

const dataSource = ref([])

const cellInfo = {
  width: 90,
  height: 69
}

onMounted(() => {
  init()
})

const init = () => {
  // 根据人数分各个page页面
  const { width, height } = pageSizeInPixels(configuration.value.pageType)
  const margin = width - cellInfo.width * 2
  // 每页的层数
  const cellLevel = Math.floor((height - margin) / cellInfo.height)

  console.info(height - margin, cellLevel, 'cellLevel')

  // 按每层两个为一组
  dataSource.value = groupArray(tableData.value, cellLevel * 2)
}

const groupArray = (array: any[], groupSize: number) => {
  let groups = []
  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize))
  }
  return groups
}
</script>

<template>
  <div class="evaluation-form-view__wrapper">
    <evaluation-card
      v-for="(data, index) in dataSource"
      :cell-info="cellInfo"
      :data="data"
      :key="index"
    />
  </div>
</template>

<style scoped lang="scss">
.evaluation-form-view__wrapper {
  height: 100%;
}
</style>

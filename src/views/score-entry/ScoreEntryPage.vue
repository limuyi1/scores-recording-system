<script setup lang="ts">
import { ref } from 'vue'

import ScoreTableView from '@/views/score-entry/components/ScoreTableView.vue'
import InputDataView from '@/views/score-entry/components/InputDataView.vue'
import ScoreAnalysisView from '@/views/score-entry/components/ScoreAnalysisView.vue'

const tableRef = ref<InstanceType<typeof ScoreTableView>>()
const inputDataRef = ref<InstanceType<typeof InputDataView>>()

const autoFocus = () => {
  inputDataRef.value?.autoFocus()
}

defineExpose({ autoFocus })
</script>

<template>
  <el-row class="score-entry-page__wrapper" :gutter="12">
    <el-col class="score-entry-page--col__wrapper" :span="6">
      <score-table-view ref="tableRef" @edit="(data) => inputDataRef?.editData(data)" />
    </el-col>
    <el-col class="score-entry-page--col__wrapper" :span="6">
      <input-data-view ref="inputDataRef" @scroll="(index) => tableRef?.scroll(index)" />
    </el-col>
    <el-col class="score-entry-page--col__wrapper" :span="12">
      <score-analysis-view />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.score-entry-page__wrapper {
  height: calc(100vh - 60px - 55px - 20px);

  .score-entry-page--col__wrapper {
    height: 100%;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

import ScoreTableView from '@/views/score/components/ScoreTableView.vue'
import InputDataView from '@/views/score/components/InputDataView.vue'
import ScoreAnalysisView from '@/views/score/components/ScoreAnalysisView.vue'

const tableRef = ref<InstanceType<typeof ScoreTableView>>()
const inputDataRef = ref<InstanceType<typeof InputDataView>>()

const autoFocus = () => {
  inputDataRef.value?.autoFocus()
}

defineExpose({ autoFocus })
</script>

<template>
  <el-row class="h-full" :gutter="12">
    <el-col class="h-full" :span="6">
      <score-table-view ref="tableRef" @edit="(data) => inputDataRef?.editData(data)" />
    </el-col>
    <el-col class="h-full" :span="6">
      <input-data-view ref="inputDataRef" @scroll="(index) => tableRef?.scroll(index)" />
    </el-col>
    <el-col class="h-full" :span="12">
      <score-analysis-view />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>

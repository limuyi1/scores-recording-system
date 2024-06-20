<script setup lang="ts">
import { ref } from 'vue'

import ScoreTableView from '@/views/score-entry/components/ScoreTableView.vue'
import InputDataView from '@/views/score-entry/components/InputDataView.vue'

const tableRef = ref<InstanceType<typeof ScoreTableView>>()
const inputDataRef = ref<InstanceType<typeof InputDataView>>()

const autoFocus = () => {
  inputDataRef.value?.autoFocus()
}

defineExpose({ autoFocus })
</script>

<template>
  <el-container class="score-entry-page__wrapper">
    <el-aside width="calc(50%)">
      <score-table-view ref="tableRef" @edit="(data) => inputDataRef?.editData(data)" />
    </el-aside>
    <el-main class="score-entry-page--main__wrapper">
      <el-scrollbar>
        <input-data-view ref="inputDataRef" @scroll="(index) => tableRef?.scroll(index)" />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.score-entry-page__wrapper {
  height: calc(100vh - 60px - 55px - 20px);

  .score-entry-page--main__wrapper {
    padding: 0;
  }
}
</style>

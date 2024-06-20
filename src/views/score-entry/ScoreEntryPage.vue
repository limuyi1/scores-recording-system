<script setup lang="ts">
import { ref } from 'vue'

import ScoreTableView from '@/views/score-entry/components/ScoreTableView.vue'
import InputScoreView from '@/views/score-entry/components/InputScoreView.vue'

const tableRef = ref<InstanceType<typeof ScoreTableView>>()
const inputScoreRef = ref<InstanceType<typeof InputScoreView>>()

const inputFocus = () => {
  inputScoreRef.value?.autoFocus()
}

defineExpose({ inputFocus })
</script>

<template>
  <el-container class="score-entry-page__wrapper">
    <el-aside width="calc(50%)">
      <score-table-view ref="tableRef" @edit="(data) => inputScoreRef?.editData(data)" />
    </el-aside>
    <el-main class="score-entry-page--main__wrapper">
      <el-scrollbar>
        <input-score-view
          ref="inputScoreRef"
          @scroll="(index) => tableRef?.scroll(index)"
          @submit="(data) => tableRef?.setScore(data)"
        />
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

<script setup lang="ts">
import { ref } from 'vue'

import ScoreTableView from '@/views/score-entry/ScoreTableView.vue'
import InputScoreView from '@/views/score-entry/InputScoreView.vue'

const tableRef = ref()
const inputScoreRef = ref()
</script>

<template>
  <el-container class="score-entry-page__wrapper">
    <el-aside width="calc(50%)">
      <score-table-view ref="tableRef" @edit="(data) => inputScoreRef?.editScore(data)" />
    </el-aside>
    <el-main class="score-entry-page--main__wrapper">
      <el-scrollbar>
        <div class="score-entry-page--body__wrapper">
          <input-score-view
            ref="inputScoreRef"
            @scroll="(index) => tableRef?.scroll(index)"
            @submit="(data) => tableRef?.setScore(data)"
          />
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.score-entry-page__wrapper {
  height: calc(100vh - 60px - 55px - 20px);

  .score-entry-page--main__wrapper {
    padding: 0;

    .score-entry-page--body__wrapper {
      padding: 0 12px 0 16px;
      box-sizing: border-box;

      .tools-btn {
        margin-bottom: 15px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

import HomeView from '@/views/HomeView.vue'
import InputScore from '@/views/InputScore.vue'
import EmptyTableView from '@/views/EmptyTableView.vue'

import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const homeRef = ref()
const inputScoreRef = ref()
const emptyTableViewRef = ref()
</script>

<template>
  <el-container>
    <el-header class="app-header__wrapper">
      <span>成绩录入系统</span>
      <el-button-group v-if="store.data?.length">
        <el-button type="primary" icon="Upload" @click="store.$reset()">重新上传</el-button>
        <el-button type="primary" icon="Refresh" @click="homeRef?.resetScore()">重置分数</el-button>
      </el-button-group>
    </el-header>
    <el-container class="app-main__wrapper">
      <template v-if="store.data?.length">
        <el-aside width="calc(50vw)">
          <home-view ref="homeRef" @edit="(data) => inputScoreRef?.editScore(data)" />
        </el-aside>
        <el-scrollbar>
          <el-main style="padding: 0 16px 16px">
            <input-score
              ref="inputScoreRef"
              @scroll="(index) => homeRef?.scroll(index)"
              @submit="(data) => homeRef?.setScore(data)"
            />
          </el-main>
        </el-scrollbar>
      </template>
      <el-main v-else class="app-body--empty__wrapper">
        <empty-table-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.app-header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  color: #303133;
  background-color: #d9ecff;
}

.app-main__wrapper {
  height: calc(100vh - 60px);
  background-color: #f4f4f5;

  .app-body--empty__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

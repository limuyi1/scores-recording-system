<script setup lang="ts">
import { ref, computed } from 'vue'

import TableView from '@/views/components/TableView.vue'
import InputScoreView from '@/views/components/InputScoreView.vue'
import EmptyTableView from '@/views/components/EmptyTableView.vue'

import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const tableRef = ref()
const inputScoreRef = ref()

const isNotEmpty = computed(() => store.data?.length)
</script>

<template>
  <el-container>
    <el-header class="home-view-header__wrapper">
      <span>成绩录入系统</span>
      <el-button-group v-if="isNotEmpty">
        <el-button type="primary" icon="Upload" @click="store.$reset()">重新上传</el-button>
        <el-button type="primary" icon="Refresh" @click="tableRef?.resetScore()"
          >重置分数</el-button
        >
      </el-button-group>
    </el-header>
    <el-container class="home-view-main__wrapper">
      <template v-if="isNotEmpty">
        <el-aside width="calc(50vw)">
          <table-view ref="tableRef" @edit="(data) => inputScoreRef?.editScore(data)" />
        </el-aside>
        <el-scrollbar>
          <el-main style="padding: 0 16px 16px">
            <input-score-view
              ref="inputScoreRef"
              @scroll="(index) => tableRef?.scroll(index)"
              @submit="(data) => tableRef?.setScore(data)"
            />
          </el-main>
        </el-scrollbar>
      </template>
      <el-main v-else class="home-view-body--empty__wrapper">
        <empty-table-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.home-view-header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  color: #303133;
  background-color: #d9ecff;
}

.home-view-main__wrapper {
  height: calc(100vh - 60px);
  background-color: #f4f4f5;

  .home-view-body--empty__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

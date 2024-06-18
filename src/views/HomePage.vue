<script setup lang="ts">
import { ref, computed } from 'vue'

import EmptyTableView from '@/views/components/EmptyTableView.vue'
import ScoreEntryPage from '@/views/score-entry/ScoreEntryPage.vue'
import FinalEvaluationPage from '@/views/final-evaluation/FinalEvaluationPage.vue'

import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const isNotEmpty = computed(() => store.data?.length)
const title = ref(import.meta.env.VITE_GLOB_APP_TITLE)
const activeName = ref('ScoreEntry')
const tabData = [
  { label: '成绩录入', name: 'ScoreEntry', component: ScoreEntryPage },
  { label: '期末评语', name: 'FinalEvaluation', component: FinalEvaluationPage }
]
</script>

<template>
  <el-container>
    <el-header class="home-view-header__wrapper">
      <span>{{ title }}</span>
      <el-button v-if="isNotEmpty" type="primary" icon="Upload" @click="store.$reset()"
        >重新上传
      </el-button>
    </el-header>
    <el-main class="home-view-main__wrapper">
      <el-tabs v-if="isNotEmpty" v-model="activeName" class="home-view-tabs">
        <el-tab-pane v-for="item in tabData" :key="item.name" :label="item.label" :name="item.name">
          <component :is="item.component" />
        </el-tab-pane>
      </el-tabs>
      <empty-table-view v-else />
    </el-main>
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
  padding: 0 20px 20px;
  box-sizing: border-box;

  .home-view-tabs {
    width: 100%;
    height: 100%;
  }
}
</style>

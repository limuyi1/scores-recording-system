<script setup lang="ts">
import { ref, computed } from 'vue'

import { ElMessageBox } from 'element-plus'

import EmptyTableView from '@/views/components/EmptyTableView.vue'
import ScoreEntryPage from '@/views/score-entry/ScoreEntryPage.vue'
import FinalEvaluationPage from '@/views/final-evaluation/FinalEvaluationPage.vue'

import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const tabData = [
  { label: '成绩录入', name: 'ScoreEntry', component: ScoreEntryPage },
  {
    label: '期末评语',
    name: 'FinalEvaluation',
    component: FinalEvaluationPage
  }
]

const title = ref(import.meta.env.VITE_GLOB_APP_TITLE)

const isNotEmpty = computed(() => store.data?.length)
const activeName = ref(tabData[0].name)
const compRef = ref()

const resetStuInfo = () => {
  ElMessageBox.confirm('确定要重置学生信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 重置tab页签
    activeName.value = tabData[0].name
    // 重置数据
    store.$reset()
  })
}

const handleTabChange = (tabName: string) => {
  compRef.value[tabName === tabData[0].name ? 0 : 1]?.autoFocus()
}
</script>

<template>
  <el-container>
    <el-header class="home-view-header__wrapper">
      <span>{{ title }}</span>
      <el-button v-if="isNotEmpty" type="primary" icon="Upload" @click="resetStuInfo"
        >重置信息
      </el-button>
    </el-header>
    <el-main class="home-view-main__wrapper">
      <el-tabs
        v-if="isNotEmpty"
        v-model="activeName"
        class="home-view-tabs"
        @tab-change="handleTabChange"
      >
        <el-tab-pane v-for="item in tabData" :key="item.name" :label="item.label" :name="item.name">
          <component ref="compRef" :is="item.component" />
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

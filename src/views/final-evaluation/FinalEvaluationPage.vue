<script setup lang="ts">
import { ref } from 'vue'

import EvaluationTableView from '@/views/final-evaluation/components/EvaluationTableView.vue'
import ToolPanelView from '@/views/final-evaluation/components/ToolPanelView.vue'

const evaluationTableViewRef = ref<InstanceType<typeof EvaluationTableView>>()
const toolPanelViewRef = ref<InstanceType<typeof ToolPanelView>>()

const autoFocus = () => {
  toolPanelViewRef.value?.autoFocus()
}

defineExpose({ autoFocus })
</script>

<template>
  <div class="final-evaluation-page__wrapper">
    <div class="final-evaluation-page--left">
      <el-scrollbar>
        <evaluation-table-view ref="evaluationTableViewRef" />
      </el-scrollbar>
    </div>
    <div class="final-evaluation-page--right">
      <tool-panel-view
        ref="toolPanelViewRef"
        @scroll="(index) => evaluationTableViewRef?.scroll(index)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.final-evaluation-page__wrapper {
  height: calc(100vh - 60px - 55px - 20px);
  width: 100%;
  display: flex;

  .final-evaluation-page--left {
    height: 100%;
    max-width: 70%;
  }

  .final-evaluation-page--right {
    height: 100%;
    flex: 1;
  }
}
</style>

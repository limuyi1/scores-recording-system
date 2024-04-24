<script setup lang="ts">
import { ref } from 'vue'

import { ListItemType } from './types'
import { storeToRefs } from 'pinia'
import { useDataSourceStore } from '@/stores/data-source'

const emit = defineEmits(['edit'])

const store = useDataSourceStore()

const { data: tableData } = storeToRefs(store)
const table = ref()
const loading = ref(false)

/**
 * 表格行样式
 * @param row
 * @param rowIndex
 */
const tableRowClassName = ({ row, rowIndex }: { row: ListItemType; rowIndex: number }) => {
  if (!row.score) {
    return ''
  }

  if (row.score >= 90) {
    return 'success-row'
  } else if (row.score >= 80) {
    return 'primary-row'
  } else if (row.score >= 60) {
    return 'warning-row'
  } else {
    return 'danger-row'
  }
}

/**
 * 滚动到指定行
 * @param index
 */
const scroll = (index: number) => {
  table.value.scrollTo(0, 47.72 * (index - 1))
}

/**
 * 设置分数
 * @param data
 */
const setScore = (data: ListItemType) => {
  tableData.value[Number(data.id) - 1].score = data.score
}

/**
 * 重置分数
 */
const resetScore = () => {
  tableData.value.forEach((e) => (e.score = null))
}

/**
 * 编辑信息
 * @param data
 */
const handleEdit = (data: ListItemType) => {
  emit('edit', data)
}

defineExpose({ scroll, setScore, resetScore })
</script>

<template>
  <el-table
    ref="table"
    v-loading="loading"
    :data="tableData"
    size="large"
    height="calc(100vh - 60px)"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="id" label="序号" width="60" align="center" />
    <el-table-column prop="name" label="姓名" width="300" />
    <el-table-column prop="score" label="分数" />
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
        <el-button
          v-if="scope.row.score"
          size="small"
          type="primary"
          circle
          @click="handleEdit(scope.row)"
        >
          <Edit style="width: 14px; height: 14px" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-table :deep(.success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-table :deep(.primary-row) {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}

.el-table :deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table :deep(.danger-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>

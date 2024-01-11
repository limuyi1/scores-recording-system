<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import { exportExcel } from '@/untils/xlsxUntil'

import stuData from '@/assets/stuData'

import { ListItem } from './types'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['edit'])

const tableData = ref<ListItem[]>([])
const table = ref()
const loading = ref(false)

onMounted(() => {
  // 初始化表格
  tableData.value = stuData.map((e, i) => {
    return {
      id: i + 1,
      name: e,
      score: null
    }
  })
})

/**
 * 表格行样式
 * @param row
 * @param rowIndex
 */
const tableRowClassName = ({ row, rowIndex }: { row: ListItem; rowIndex: number }) => {
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
 * 获取未输入分数的列表
 */
const nullScoreTableList = computed(() => {
  return tableData.value.filter((e) => e.score !== null)
})

/**
 * 获取已输入分数的列表
 */
const hasScoreTableList = computed(() => {
  return tableData.value.filter((e) => e.score === null)
})

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
const setScore = (data: ListItem) => {
  tableData.value[Number(data.id) - 1].score = data.score
}

/**
 * 编辑信息
 * @param data
 */
const handleEdit = (data: ListItem) => {
  emit('edit', data)
}

/**
 * 导出完成数据的 Excel
 */
const exportExcelAll = () => {
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[] = []
  tableData.value.forEach((e) => {
    bodyData.push([String(e.id), e.name, String(e.score || '')])
  })

  exportExcel(loading, headerData, bodyData, `全部分数-${new Date().toLocaleString()}.xlsx`)
}

const exportExcelLe60 = () => {
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[] = []
  tableData.value.forEach((e) => {
    if (e.score && e.score <= 60) {
      bodyData.push([String(e.id), e.name, String(e.score || '')])
    }
  })

  if (!bodyData.length) {
    ElMessage.error('没有不及格的同学')
    return
  }

  exportExcel(loading, headerData, bodyData, `不及格的同学-${new Date().toLocaleString()}.xlsx`)
}

const exportEvent = (command: string) => {
  if (command === 'all') {
    exportExcelAll()
  } else {
    exportExcelLe60()
  }
}

defineExpose({ scroll, setScore })
</script>

<template>
  <el-table
    ref="table"
    v-loading="loading"
    :data="tableData"
    size="large"
    height="calc(100vh - 76px)"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="id" label="序号" width="60" align="center" />
    <el-table-column prop="name" label="姓名" width="300">
      <template #header>
        <div style="display: flex; align-items: center">
          <div>姓名：</div>
          <el-popover placement="bottom" :width="400" trigger="click">
            <template #reference>
              <el-link tag="ins" type="primary">
                {{ tableData.length }} / {{ nullScoreTableList.length }}
              </el-link>
            </template>
            <el-tag
              v-for="item in hasScoreTableList"
              :key="item.id"
              style="margin: 0 3px 3px 0"
              class="ml-2"
              type="success"
            >
              {{ item.name }}
            </el-tag>
          </el-popover>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="分数" />
    <el-table-column label="操作" width="180" align="center">
      <template #header>
        <el-dropdown
          style="margin-left: 16px"
          split-button
          type="primary"
          @click="exportExcelAll"
          @command="exportEvent"
        >
          <Download style="width: 16px; height: 16px; margin: -3px 2px 0 0" /> 导出
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="all">全部</el-dropdown-item>
              <el-dropdown-item command="le60">60及以下</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
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

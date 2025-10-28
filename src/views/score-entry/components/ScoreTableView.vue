<script setup lang="ts">
import { ref } from 'vue'

import { ElMessageBox } from 'element-plus'

import { storeToRefs } from 'pinia'
import { useDataSourceStore } from '@/stores/data-source'
import { useConfigurationStore } from '@/stores/configuration'

import type { ListItemType } from '@/types/DataSource'

const emit = defineEmits(['edit'])

const store = useDataSourceStore()
const configuration = useConfigurationStore()

const { tagTypeList, data: tableData } = storeToRefs(store)
const { data: config } = storeToRefs(configuration)
const tableRef = ref()
const loading = ref(false)

/**
 * 表格行样式
 * @param row
 * @param rowIndex
 */
const tableRowClassName = ({ row }: { row: ListItemType }) => {
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
  tableRef.value?.scrollTo(0, 50 * (index - 1))

  rowBlink(index)
}

/**
 * 行闪烁
 * @param index
 */
const rowBlink = async (index: number) => {
  // 滚动到此行上后颜色闪烁
  const elems = document.querySelectorAll('.el-table__row')
  const ele: any = elems[index - 1]
  const classList = ele.classList

  // 行颜色已存在的闪烁
  if (classList.length > 1) {
    const backupClass = classList[1]

    for (let i = 0; i < 6; i++) {
      if (backupClass === classList[1]) {
        classList.remove(backupClass)
      } else {
        classList.add(backupClass)
      }
      await delay(300)
    }
  } else {
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        ele.style.backgroundColor = '#f5f7fa'
      } else {
        ele.style.backgroundColor = ''
      }
      await delay(300)
    }
  }
}

/**
 * 等待函数
 * @param ms
 */
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 重置分数
 */
const resetScore = () => {
  ElMessageBox.confirm('确定要重置分数吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    tableData.value.forEach((e) => (e.score = null))
  })
}

/**
 * 编辑信息
 * @param data
 */
const handleEdit = (data: any) => {
  emit('edit', data)
}

defineExpose({ scroll })
</script>

<template>
  <el-table
    ref="tableRef"
    v-loading="loading"
    :data="tableData"
    size="large"
    height="calc(100%)"
    :row-class-name="tableRowClassName"
    @row-click="handleEdit"
  >
    <el-table-column prop="序号" label="序号" width="60" align="center" />
    <el-table-column prop="姓名" label="姓名" width="200" />
    <el-table-column :prop="config.inputScoreTab" width="200">
      <template #header>
        <div class="operate-btn__wrapper">
          <el-select
            class="w-[100px]! mr-[8px]"
            v-model="config.inputScoreTab"
            placeholder="选择类型"
          >
            <el-option v-for="item in tagTypeList" :key="item" :label="item" :value="item" />
          </el-select>
          <el-tooltip effect="dark" placement="top" append-to="body" content="重置分数">
            <el-icon :size="18" color="var(--el-color-primary)">
              <Refresh style="cursor: pointer" @click="resetScore" />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
.operate-btn__wrapper {
  display: flex;
  align-items: center;
}

:deep(.el-table__row) {
  height: 50px;
}

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

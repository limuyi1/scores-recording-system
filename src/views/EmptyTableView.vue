<script setup lang="ts">
import { useDataSourceStore } from '@/stores/data-source'

import { ElMessage } from 'element-plus'

import { parseExcel } from '@/untils/xlsxUntil'
import type { ListItemType } from '@/views/types'

const store = useDataSourceStore()

const uploadFile = async (file: any) => {
  try {
    parseExcel(file).then(({ header, data }) => {
      const dataScore: Array<ListItemType> = data.map((e, i) => {
        return {
          id: i + 1,
          name: String(e[header[0]]),
          score: null
        }
      })

      store.data = dataScore

      ElMessage.success('导入成功！')
    })
  } catch (err) {
    ElMessage.error('导入失败！')
  }
}
</script>

<template>
  <div>
    <el-card class="empty-table-view__wrapper">
      <template #header>还没有学生信息</template>

      <el-upload
        action="#"
        :auto-upload="false"
        :on-change="uploadFile"
        :limit="1"
        :show-file-list="false"
        accept=".xls,.xlsx"
      >
        <el-button type="primary" size="large" style="width: 150px">
          立 即 导 入 <el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </el-upload>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.empty-table-view__wrapper {
  height: 220px;
  width: 360px;
}

:deep(.el-card__body) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>

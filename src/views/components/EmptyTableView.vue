<script setup lang="ts">
import { useDataSourceStore } from '@/stores/data-source'

import { ElMessage } from 'element-plus'

import { parseExcel } from '@/untils/xlsxUntil'

const store = useDataSourceStore()

const uploadFile = async (file: any) => {
  try {
    parseExcel(file).then(({ header, data }) => {
      if (!header.includes('姓名')) {
        ElMessage.error('表格中必须包含[姓名]列！')
        return
      }

      const headerObj = header.reduce((acc: any, cur: any) => {
        acc[cur] = null
        return acc
      }, {})

      const result = data.map((e: any) => {
        const _headerObj = Object.assign({}, headerObj)
        Object.keys(_headerObj).forEach((key: any) => {
          _headerObj[key] = e[key] || null
        })
        return _headerObj
      })

      store.header = header
      store.data = result

      // store.data = data.map((e: any, i) => {
      //   return {
      //     id: i + 1,
      //     name: String(e['姓名']),
      //     score: e['分数'] ? Number(e['分数']) : null,
      //     comment: e['评语'] ? String(e['评语']) : null
      //   }
      // })

      ElMessage.success('导入成功！')
    })
  } catch (err) {
    ElMessage.error('导入失败！')
  }
}
</script>

<template>
  <div class="empty-table-view__wrapper">
    <el-card class="empty-table-view-card__wrapper">
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
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty-table-view-card__wrapper {
    height: 220px;
    width: 360px;
  }
}

:deep(.el-card__body) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import stuData from '@/views/stu'

interface ListItem {
  id: number
  name: string
}

const tableData = ref<ListItem[]>([])

onMounted(() => {
  // 初始化表格
  tableData.value = stuData
})
</script>

<template>
  <el-table :data="tableData" stripe size="large" height="500" style="width: 100%">
    <el-table-column prop="id" label="序号" width="60" />
    <el-table-column prop="name" label="姓名" width="300" />
    <el-table-column prop="score" label="分数" />
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

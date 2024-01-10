<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import * as XLSX from 'xlsx'

import stuData from '@/views/stu'
import { ListItem } from './types'

const emit = defineEmits(['edit'])

const tableData = ref<ListItem[]>([])
const table = ref()

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

const nullScoreTableList = computed(() => {
  return tableData.value.filter((e) => e.score !== null)
})

const hasScoreTableList = computed(() => {
  return tableData.value.filter((e) => e.score === null)
})

const scroll = (index: number) => {
  table.value.setScrollTop((index - 1) * 49)
}

const setScore = (data: ListItem) => {
  tableData.value[Number(data.id) - 1].score = data.score
}

const handleEdit = (data: ListItem) => {
  emit('edit', data)
}

const exportExcel = () => {
  const data = [['序号', '姓名', '分数']]
  tableData.value.forEach((e) => {
    data.push([String(e.id), e.name, String(e.score || '')])
  })

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })

  const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' })
  const url = window.URL.createObjectURL(blobData)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', new Date().toLocaleString() + '.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

defineExpose({ scroll, setScore })
</script>

<template>
  <el-table ref="table" :data="tableData" stripe size="large" height="500" style="width: 100%">
    <el-table-column prop="id" label="序号" width="60" />
    <el-table-column prop="name" label="姓名" width="300" />
    <el-table-column prop="score" label="分数" />
    <el-table-column label="操作" width="180">
      <template #header>
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
        <el-tooltip effect="dark" content="导出" placement="top">
          <el-button style="margin-left: 16px" type="primary" circle @click="exportExcel">
            <Download style="width: 16px; height: 16px" />
          </el-button>
        </el-tooltip>
      </template>
      <template #default="scope">
        <el-button v-if="scope.row.score" type="primary" circle @click="handleEdit(scope.row)">
          <Edit style="width: 16px; height: 16px" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { parseExcel } from '@/untils/xlsxUntil'
import { ElMessage } from 'element-plus'

const uploadFile = async (file: any) => {
  try {
    parseExcel(file).then(({ header, data }) => {
      if (!header.includes('姓名')) {
        ElMessage.error('表格中不包含[姓名]列！')
        return
      }

      console.info(data)

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
  <div>
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

    <el-splitter>
      <el-splitter-panel size="30%">
        <div class="demo-panel">1</div>
      </el-splitter-panel>
      <el-splitter-panel :min="200">
        <div class="demo-panel">2</div>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import { onMounted, ref, reactive } from 'vue'
import stuData from '@/views/stu'

interface ListItem {
  id: number
  name: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])

const formLabelAlign = reactive({
  name: '',
  score: ''
})

onMounted(() => {
  list.value = stuData
})

const remoteMethod = (query: string) => {
  if (query) {
    options.value = list.value.filter(
      (item) => item.name.includes(query) || pinyin(item.name, { toneType: 'none' }).includes(query)
    )
  } else {
    options.value = []
  }
}

const selectChange = (query: string) => {
  //
  // tableData.value.push()
}
</script>

<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="姓名">
      <el-select
        style="width: 400px"
        v-model="formLabelAlign.name"
        size="large"
        placeholder="请输入学生姓名"
        filterable
        remote
        :remote-method="remoteMethod"
        @change="selectChange"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item label="分数">
      <el-input style="width: 400px" v-model="formLabelAlign.score" size="large" />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>

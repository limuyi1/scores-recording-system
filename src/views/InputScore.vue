<script setup lang="ts">
import { match } from 'pinyin-pro'
import { onMounted, ref, reactive } from 'vue'

import stuData from '@/views/stu'
import { ListItem } from './types'

const emit = defineEmits(['scroll', 'submit'])

const originList = ref<ListItem[]>([])
const options = ref<ListItem[]>([])

const select = ref()

onMounted(() => {
  // 姓名获取焦点
  select.value.focus()

  // 初始化数据
  originList.value = stuData.map((e, i) => {
    return {
      id: i + 1,
      name: e,
      score: null
    }
  })
})

const formData: ListItem = reactive({
  id: null,
  name: '',
  score: null
})

/**
 * 姓名搜索方法
 * @param query
 */
const remoteMethod = (query: string) => {
  if (query) {
    options.value = originList.value.filter(
      (item) => item.name.includes(query) || match(item.name, query)?.length
    )
  } else {
    options.value = []
  }
}

const selectChange = (index: number) => {
  if (index) {
    formData.name = originList.value[index - 1].name
    // 表格滚动到相应姓名的位置
    emit('scroll', index)
  }
}

const onSubmit = () => {
  // 添加分数
  emit('submit', formData)

  // 删除已选中的选项
  if (formData.id) {
    // originList.value.splice(formData.id - 1, 1)

    formData.id = null
    formData.name = ''
    formData.score = null
    options.value = []

    // 重新聚焦到姓名输入框
    select.value.focus()
  }
}

const editScore = (data: ListItem) => {
  remoteMethod(data.name)

  formData.id = data.id
  formData.name = data.name
  formData.score = data.score
}

defineExpose({ editScore })
</script>

<template>
  <el-form
    ref="form"
    label-position="top"
    label-width="100px"
    :model="formData"
    style="max-width: 460px"
  >
    <el-form-item label="姓名">
      <el-select
        ref="select"
        style="width: 400px"
        v-model="formData.id"
        size="large"
        placeholder="请输入学生姓名"
        filterable
        remote
        :remote-method="remoteMethod"
        @change="selectChange"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="分数">
      <el-input-number
        style="width: 400px"
        v-model="formData.score"
        size="large"
        :min="0"
        :max="100"
        :precision="1"
        :disabled="!formData.id"
        @keyup.enter="onSubmit"
      ></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 400px"
        type="primary"
        size="large"
        round
        :disabled="!formData.id"
        @click="onSubmit"
      >
        <Promotion style="width: 16px; height: 16px" />&nbsp;生成
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>

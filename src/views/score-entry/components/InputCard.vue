<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { match } from 'pinyin-pro'
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'

import type { ListItemType } from '@/types/DataSource'

const emit = defineEmits(['scroll', 'submit'])

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)
const options = ref<ListItemType[]>([])
const nameInputRef = ref()
const scoreInputRef = ref()
const formData: ListItemType = reactive({
  id: null,
  name: '',
  score: null
})

onMounted(() => {
  autoFocus()
})

/**
 * 姓名获取焦点
 */
const autoFocus = () => {
  nameInputRef.value.focus()
}

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

/**
 * 姓名选择方法
 * @param index
 */
const selectChange = (index: number) => {
  if (index) {
    const { id, name, score } = originList.value[index - 1]
    formData.id = id
    formData.name = name
    formData.score = score

    // 表格滚动到相应姓名的位置
    emit('scroll', index)

    setTimeout(() => {
      scoreInputRef.value.focus()
    }, 100)
  }
}

/**
 * 提交方法
 */
const onSubmit = () => {
  // 添加分数
  emit('submit', formData)

  // 设置分数
  originList.value[Number(formData.id) - 1].score = formData.score

  // 删除已选中的选项
  if (formData.id) {
    // originList.value.splice(formData.id - 1, 1)

    formData.id = null
    formData.name = ''
    formData.score = null
    options.value = []

    // 重新聚焦到姓名输入框
    nameInputRef.value.focus()
  }
}

/**
 * 编辑分数
 * @param data
 */
const editData = (data: ListItemType) => {
  remoteMethod(data.name)

  formData.id = data.id
  formData.name = data.name
  formData.score = data.score
}

defineExpose({ editData, autoFocus })
</script>

<template>
  <el-card style="max-width: 460px">
    <el-form ref="form" label-position="top" label-width="100px" :model="formData">
      <el-form-item label="姓名">
        <el-select
          ref="nameInputRef"
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
          ref="scoreInputRef"
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
  </el-card>
</template>

<style scoped lang="scss"></style>

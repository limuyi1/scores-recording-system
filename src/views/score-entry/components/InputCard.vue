<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { match } from 'pinyin-pro'
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'

import type { ListItemType } from '@/types/DataSource'
import { InputEnum } from '@/types/Common'

interface Props {
  type?: InputEnum
}
const props = withDefaults(defineProps<Props>(), {
  type: InputEnum.SCORE
})

const emit = defineEmits(['scroll'])

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)
const options = ref<ListItemType[]>([])
const nameInputRef = ref()
const scoreInputRef = ref()
const commentInputRef = ref()
const formData: ListItemType = reactive({
  id: null,
  name: '',
  score: null,
  comment: null
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
    const { id, name, score, comment } = originList.value[index - 1]
    formData.id = id
    formData.name = name
    formData.score = score
    formData.comment = comment

    // 表格滚动到相应姓名的位置
    emit('scroll', index)

    setTimeout(() => {
      scoreInputRef.value?.focus()
      commentInputRef.value?.focus()
    }, 100)
  }
}

/**
 * 提交方法
 */
const onSubmit = () => {
  // 设置分数
  if (props.type === InputEnum.SCORE) {
    originList.value[Number(formData.id) - 1].score = formData.score
  }

  // 设置评语
  if (props.type === InputEnum.COMMENT) {
    originList.value[Number(formData.id) - 1].comment =
      formData.comment === '' ? null : formData.comment
  }

  // 删除已选中的选项
  if (formData.id) {
    formData.id = null
    formData.name = ''
    formData.score = null
    formData.comment = null
    options.value = []

    // 重新聚焦到姓名输入框
    nameInputRef.value.focus()
  }
}

/**
 * 编辑数据
 * @param data
 */
const editData = (data: ListItemType) => {
  remoteMethod(data.name)

  formData.id = data.id
  formData.name = data.name
  formData.score = data.score
  formData.comment = data.comment

  // 重新聚焦到分数输入框
  scoreInputRef.value?.focus()
}

defineExpose({ editData, autoFocus })
</script>

<template>
  <el-card class="input-card__wrapper">
    <el-form ref="form" label-position="top" label-width="100px" :model="formData">
      <el-form-item label="姓名">
        <el-select
          ref="nameInputRef"
          style="width: 100%"
          v-model="formData.id"
          size="large"
          placeholder="请输入搜索学生姓名"
          filterable
          remote
          :remote-method="remoteMethod"
          @change="selectChange"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="props.type === InputEnum.SCORE" label="分数">
        <el-input-number
          ref="scoreInputRef"
          style="width: 100%"
          v-model.number="formData.score"
          size="large"
          :min="0"
          :max="100"
          :precision="1"
          :disabled="!formData.id"
          @keyup.enter="onSubmit"
        ></el-input-number>
      </el-form-item>
      <el-form-item v-if="props.type === InputEnum.COMMENT" label="评价">
        <el-input
          ref="commentInputRef"
          style="width: 100%"
          v-model.trim="formData.comment"
          size="large"
          type="textarea"
          maxlength="500"
          show-word-limit
          placeholder="请输入学生评价"
          :rows="3"
          :disabled="!formData.id"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          size="large"
          round
          :disabled="!formData.id"
          @click="onSubmit"
        >
          <Promotion style="width: 16px; height: 16px" />&nbsp;提 交
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.input-card__wrapper {
}
</style>

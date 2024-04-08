<script setup lang="ts">
import { match } from 'pinyin-pro'
import { onMounted, ref, reactive, computed } from 'vue'

import { Download } from '@element-plus/icons-vue'

import stuData from '@/assets/stuData'
import { ListItem } from './types'
import { exportExcel } from '@/untils/xlsxUntil'

const emit = defineEmits(['scroll', 'submit'])

const originList = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const select = ref()
const input = ref()

const formData: ListItem = reactive({
  id: null,
  name: '',
  score: null
})

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

/**
 * 获取非空输入分数的列表
 */
const nonNullScoreList = computed(() => {
  return originList.value.filter((e) => e.score !== null)
})

/**
 * 获取未输入分数的列表
 */
const hasNullScoreList = computed(() => {
  return originList.value.filter((e) => e.score === null)
})

/**
 * 获取对应分数的列表
 */
const gteScoreList = (score: number) => {
  return originList.value
    .filter((e) => e.score && e.score >= score)
    .sort((a, b) => b.score - a.score)
}

/**
 * 获取小于等于60分数的列表
 */
const le60ScoreList = () => {
  return originList.value.filter((e) => e.score && e.score < 60).sort((a, b) => b.score - a.score)
}

/**
 * 导出完成数据的 Excel
 * @param data
 * @param fileName
 */
const exportExcelFun = (data: ListItem[], fileName: string) => {
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[][] = []
  data.forEach((e, i) => {
    bodyData.push([String(i + 1), e.name, e.score !== null ? Number(e.score) : ''])
  })

  exportExcel(headerData, bodyData, `${fileName}-${new Date().toLocaleString()}.xlsx`)
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
    const { id, name } = originList.value[index - 1]
    formData.id = id
    formData.name = name

    // 表格滚动到相应姓名的位置
    emit('scroll', index)

    setTimeout(() => {
      input.value.focus()
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
    select.value.focus()
  }
}

/**
 * 编辑分数
 * @param data
 */
const editScore = (data: ListItem) => {
  remoteMethod(data.name)

  formData.id = data.id
  formData.name = data.name
  formData.score = data.score
}

defineExpose({ editScore })
</script>

<template>
  <el-card class="box-container">
    <div class="box-item">
      <div class="box-item--title">全部</div>
      <el-popover placement="bottom" :width="400" trigger="hover">
        <template #reference>
          <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary">
            {{ originList.length }} / {{ nonNullScoreList.length }}
          </el-text>
        </template>
        <el-tag
          v-for="item in hasNullScoreList"
          :key="item.id"
          style="margin: 0 3px 3px 0"
          class="ml-2"
          type="info"
        >
          {{ item.name }}
        </el-tag>
      </el-popover>
      <el-button
        v-if="nonNullScoreList.length"
        type="primary"
        size="small"
        :icon="Download"
        circle
        @click="exportExcelFun(originList, '全部')"
      />
    </div>
    <div class="box-item">
      <div class="box-item--title">≥90分</div>
      <template v-if="gteScoreList(90).length">
        <el-popover placement="bottom" :width="400" trigger="hover">
          <template #reference>
            <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary"
              >{{ gteScoreList(90).length }} 人</el-text
            >
          </template>
          <el-tag
            v-for="item in gteScoreList(90)"
            :key="item.id"
            style="margin: 0 3px 3px 0"
            class="ml-2"
            type="success"
          >
            {{ item.name }}
          </el-tag>
        </el-popover>
        <el-button
          type="primary"
          size="small"
          :icon="Download"
          circle
          @click="exportExcelFun(gteScoreList(90), '≥90分')"
        />
      </template>
      <template v-else>
        <el-text type="primary">/</el-text>
      </template>
    </div>
    <div class="box-item">
      <div class="box-item--title">≥80分</div>
      <template v-if="gteScoreList(80).length">
        <el-popover placement="bottom" :width="400" trigger="hover">
          <template #reference>
            <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary"
              >{{ gteScoreList(80).length }} 人</el-text
            >
          </template>
          <el-tag
            v-for="item in gteScoreList(80)"
            :key="item.id"
            style="margin: 0 3px 3px 0"
            class="ml-2"
          >
            {{ item.name }}
          </el-tag>
        </el-popover>
        <el-button
          type="primary"
          size="small"
          :icon="Download"
          circle
          @click="exportExcelFun(gteScoreList(80), '≥80分')"
        />
      </template>
      <template v-else>
        <el-text type="primary">/</el-text>
      </template>
    </div>
    <div class="box-item">
      <div class="box-item--title">≤60分</div>
      <template v-if="le60ScoreList().length">
        <el-popover placement="bottom" :width="400" trigger="hover">
          <template #reference>
            <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary"
              >{{ le60ScoreList().length }} 人</el-text
            >
            {{ le60ScoreList() + '12121212' }}
          </template>
          <el-tag
            v-for="item in le60ScoreList()"
            :key="item.id"
            style="margin: 0 3px 3px 0"
            class="ml-2"
            type="danger"
          >
            {{ item.name }}
          </el-tag>
        </el-popover>
        <el-button
          type="primary"
          size="small"
          :icon="Download"
          circle
          @click="exportExcelFun(le60ScoreList(), '≤60分')"
        />
      </template>
      <template v-else>
        <el-text type="primary">/</el-text>
      </template>
    </div>
  </el-card>
  <el-card style="max-width: 460px">
    <el-form ref="form" label-position="top" label-width="100px" :model="formData">
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
          ref="input"
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

<style scoped lang="scss">
.box-container {
  margin-bottom: 16px;
}

.box-item {
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  color: #606266;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.box-item--title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100px;
  border-radius: 4px 0 0 4px;
  border-right: 2px solid #ffffff;
  margin-right: 16px;
}

.box-item:nth-child(1) {
  background-color: var(--el-color-info-light-9);
  .box-item--title {
    background-color: var(--el-color-info-light-8);
  }
}

.box-item:nth-child(2) {
  background-color: var(--el-color-success-light-9);
  .box-item--title {
    background-color: var(--el-color-success-light-8);
  }
}

.box-item:nth-child(3) {
  background-color: var(--el-color-primary-light-9);
  .box-item--title {
    background-color: var(--el-color-primary-light-8);
  }
}

.box-item:nth-child(4) {
  margin-bottom: 0;
  background-color: var(--el-color-danger-light-9);
  .box-item--title {
    background-color: var(--el-color-danger-light-8);
  }
}
</style>

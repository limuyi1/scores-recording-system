<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'
import { exportExcel } from '@/untils/xlsxUntil'

import type { ListItemType } from '@/types/DataSource'

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)

interface Props {
  downloadFileName: string
  tagType: string // success/info/warning/danger
  condition: Function
}

const props = withDefaults(defineProps<Props>(), {
  condition: () => {}
})

/**
 * 获取数据
 */
const getList = () => {
  const data = originList.value as Array<ListItemType>
  return data
    .filter((e: ListItemType) => props.condition(e))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * 导出完成数据的 Excel
 * @param data
 * @param fileName
 */
const exportExcelFun = (data: ListItemType[], fileName: string) => {
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[][] = []
  data.forEach((e, i) => {
    bodyData.push([String(i + 1), e.name, e.score !== null ? Number(e.score) : ''])
  })

  exportExcel(headerData, bodyData, `${fileName}-${new Date().toLocaleString()}.xlsx`)
}
</script>

<template>
  <template v-if="getList().length">
    <el-popover placement="top" :width="400" trigger="hover">
      <template #reference>
        <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary">
          <slot :data="getList()">{{ getList().length }} 人</slot>
        </el-text>
      </template>

      <el-badge
        v-for="item in getList()"
        :key="item.id"
        style="margin: 0 12px 12px 0"
        :value="item.score"
        :type="props.tagType"
        :max="100"
      >
        <el-tag :type="props.tagType">
          {{ item.name }}
        </el-tag>
      </el-badge>
    </el-popover>
    <el-button
      type="primary"
      size="small"
      icon="Download"
      circle
      @click="exportExcelFun(getList(), props.downloadFileName)"
    />
  </template>
  <template v-else>
    <el-text type="primary">/</el-text>
  </template>
</template>

<style scoped lang="scss"></style>

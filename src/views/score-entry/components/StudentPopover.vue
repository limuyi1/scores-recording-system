<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'
import { xlsxToImage } from '@/untils/xlsxUntil'

import type { ListItemType } from '@/types/DataSource'

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)

interface Props {
  downloadFileName: string
  tagType: string // 'primary' | 'success' | 'warning' | 'danger' | 'info'
  condition: Function
}

const props = withDefaults(defineProps<Props>(), {
  condition: () => {}
})

/**
 * 导出图片
 * @param command
 */
const xlsxToImageCommand = (command: string) => {
  xlsxToImage(
    buildData(command === 'exist'),
    `${props.downloadFileName}-${new Date().toLocaleString()}.png`
  )
}

/**
 * 获取数据
 */
const getList = (): ListItemType[] => {
  return originList.value
    .filter((e) => e.score !== null)
    .filter((e: ListItemType) => props.condition(e))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * 构建数据
 * @param isScore
 */
const buildData = (isScore: boolean = true) => {
  const headerData = isScore ? ['序号', '姓名', '分数'] : ['序号', '姓名']
  const bodyData: any[][] = []

  const data = getList()
  data.forEach((e, i) => {
    if (isScore) {
      bodyData.push([String(i + 1), e.name, e.score])
    } else {
      bodyData.push([String(i + 1), e.name])
    }
  })

  return [headerData, ...bodyData]
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
    <el-dropdown placement="bottom" @command="xlsxToImageCommand">
      <el-button type="primary" size="small" icon="Picture" circle />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="exist">有分数</el-dropdown-item>
          <el-dropdown-item command="non">无分数</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  <template v-else>
    <el-text type="primary">/</el-text>
  </template>
</template>

<style scoped lang="scss"></style>

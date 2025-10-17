<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import * as XLSX from 'xlsx'

import { exportExcel } from '@/untils/xlsxUntil'

import { useDataSourceStore } from '@/stores/data-source'

import type { ListItemType } from '@/types/DataSource'

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)

/**
 * 获取非空输入分数的列表
 */
const nonNullScoreList = computed(() => {
  const data = originList.value as Array<ListItemType>
  return data.filter((e: ListItemType) => e.score !== null)
})

/**
 * 获取未输入分数的列表
 */
const hasNullScoreList = computed(() => {
  const data = originList.value as Array<ListItemType>
  return data.filter((e: ListItemType) => e.score === null)
})

/**
 * 导出完整数据的 Excel
 * @param data
 * @param fileName
 */
const exportExcelFun = (data: ListItemType[], fileName: string) => {
  // 分数页 Sheet
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[][] = []
  const footerData: any[][] = []
  data.forEach((e, i) => {
    bodyData.push([String(i + 1), e.name, e.score !== null ? Number(e.score) : ''])
  })

  // 统计数据
  footerData.push(['平均分', null, Number(store.average).toFixed(2)])
  footerData.push(['综合评比率', null, `${Number(store.comprehensiveRatingRate).toFixed(2)}%`])
  footerData.push(['及格率', null, `${Number(store.passRate).toFixed(2)}%`])
  footerData.push(['优秀率', null, `${Number(store.excellentRate).toFixed(2)}%`])
  footerData.push(['特优率', null, `${Number(store.optimumRate).toFixed(2)}%`])
  footerData.push(['低分率', null, Number(store.lowScoreRate).toFixed(2) + '%'])

  let index = bodyData.length + 1
  const merge = footerData.map((e, i) => {
    return { s: { r: index + i, c: 0 }, e: { r: index + i, c: 1 } }
  })

  const xlsxData = [headerData, ...bodyData, ...footerData]
  const sheet1 = XLSX.utils.aoa_to_sheet(xlsxData)
  const workbook = XLSX.utils.book_new()

  sheet1['!merges'] = merge
  XLSX.utils.book_append_sheet(workbook, sheet1, '总表')

  // ≥90分
  const sheet2 = generateSheet(getList((e: ListItemType) => Boolean(e.score && e.score >= 90)))
  XLSX.utils.book_append_sheet(workbook, sheet2, '≥90分')
  // ≥80分
  const sheet3 = generateSheet(getList((e: ListItemType) => Boolean(e.score && e.score >= 80)))
  XLSX.utils.book_append_sheet(workbook, sheet3, '≥80分')
  // ＜80分
  const sheet4 = generateSheet(getList((e: ListItemType) => Boolean(e.score && e.score < 80)))
  XLSX.utils.book_append_sheet(workbook, sheet4, '＜80分')
  // ＜60分
  const sheet5 = generateSheet(getList((e: ListItemType) => Boolean(e.score && e.score < 60)))
  XLSX.utils.book_append_sheet(workbook, sheet5, '＜60分')

  exportExcel(null, null, `${fileName}_${new Date().toLocaleString()}.xlsx`, workbook)
}

/**
 * 获取数据
 * @param condition
 */
const getList = (condition: (e: ListItemType) => boolean) => {
  const data = originList.value as Array<ListItemType>
  return data
    .filter((e: ListItemType) => condition(e))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * 生成单个sheet
 * @param data
 */
const generateSheet = (data: ListItemType[]) => {
  const headerData = ['序号', '姓名', '分数']
  const bodyData: any[][] = []
  data.forEach((e, i) => {
    bodyData.push([String(i + 1), e.name, e.score !== null ? Number(e.score) : ''])
  })
  const xlsxData = [headerData, ...bodyData]
  return XLSX.utils.aoa_to_sheet(xlsxData)
}
</script>

<template>
  <el-button
    type="primary"
    size="small"
    icon="Download"
    circle
    @click="exportExcelFun(originList, '全部')"
  />
</template>

<style scoped lang="scss"></style>

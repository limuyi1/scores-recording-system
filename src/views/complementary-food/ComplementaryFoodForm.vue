<script setup lang="ts">
import { dayjs } from 'element-plus'

import DataSource from './data.json'
import { exportExcel } from '@/untils/xlsxUntil'

const deal = () => {
  let result: any[] = []

  // 初始日期 2025-8-22
  const startDate: any = dayjs('2025-8-22')
  const day = startDate.day() || 7
  const dText = ['日', '一', '二', '三', '四', '五', '六']

  // 补齐初始日期前的填空日期
  for (const num of Array(day - 1).keys()) {
    const currentDate = startDate.subtract(num + 1, 'day')
    result.unshift({
      [`星期${dText[currentDate.day()]}`]: currentDate.format('M月D日')
    })
  }

  // 处理数据
  let index: number = 0
  let d: number = 1 // 第几天
  Object.entries(DataSource).forEach(([key, value]) => {
    value.forEach((item: any) => {
      const currentDate = startDate.add(index, 'day')
      result.push({
        [`星期${dText[currentDate.day()]}`]: `${currentDate.format(
          'M月D日'
        )}\n${key}第${d}天\n上午：${item.forenoon}\n下午：${item.afternoon}`
      })

      index++
      d++
    })

    // 每月重置参数
    d = 1
  })

  // 每个星期合并成一个行
  result = result.reduce((acc: any, cur: any, index: number) => {
    if (index % 7 === 0) {
      acc.push([])
    }

    acc[acc.length - 1].push(Object.values(cur)[0])
    return acc
  }, [])

  exportExcel(
    ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    result,
    '辅食表.xlsx'
  )
}
</script>

<template>
  <div class="complementary-food-form__wrapper">
    <el-button @click="deal">处理</el-button>
  </div>
</template>

<style scoped lang="scss">
.complementary-food-form__wrapper {
  height: 100%;

  .complementary-food-form--body__wrapper {
    background-color: rgba(121, 187, 255, 0.5);
  }
}
</style>

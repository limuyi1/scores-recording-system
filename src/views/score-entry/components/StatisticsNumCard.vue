<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import StudentPopover from '@/views/score-entry/components/StudentPopover.vue'

import { useDataSourceStore } from '@/stores/data-source'
import { exportExcel } from '@/untils/xlsxUntil'

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
  <el-card class="statistics-card__wrapper">
    <el-scrollbar>
      <!-- 大于等于90 -->
      <div class="box-item">
        <div class="box-item--title">≥90分</div>
        <student-popover
          download-file-name="≥90分"
          tag-type="success"
          :condition="(e: ListItemType) => e.score && e.score >= 90"
        />
      </div>
      <!-- 大于等于80 -->
      <div class="box-item">
        <div class="box-item--title">≥80分</div>
        <student-popover
          download-file-name="≥80分"
          tag-type="primary"
          :condition="(e: ListItemType) => e.score && e.score >= 80"
        />
      </div>
      <!-- 小于80分 -->
      <div class="box-item">
        <div class="box-item--title">＜80分</div>
        <student-popover
          download-file-name="＜80分"
          tag-type="warning"
          :condition="(e: ListItemType) => e.score && e.score < 80"
        />
      </div>
      <!-- 小于60 -->
      <div class="box-item">
        <div class="box-item--title">＜60分</div>
        <student-popover
          download-file-name="＜60分"
          tag-type="danger"
          :condition="(e: ListItemType) => e.score && e.score < 60"
        />
      </div>
    </el-scrollbar>
  </el-card>
</template>

<style scoped lang="scss">
.statistics-card__wrapper {
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

  //.box-item:nth-child(1) {
  //  background-color: var(--el-color-info-light-9);
  //
  //  .box-item--title {
  //    background-color: var(--el-color-info-light-8);
  //  }
  //}

  .box-item:nth-child(1) {
    background-color: var(--el-color-success-light-9);

    .box-item--title {
      background-color: var(--el-color-success-light-8);
    }
  }

  .box-item:nth-child(2) {
    background-color: var(--el-color-primary-light-9);

    .box-item--title {
      background-color: var(--el-color-primary-light-8);
    }
  }

  .box-item:nth-child(3) {
    background-color: var(--el-color-warning-light-9);

    .box-item--title {
      background-color: var(--el-color-warning-light-8);
    }
  }

  .box-item:nth-child(4) {
    margin-bottom: 0;
    background-color: var(--el-color-danger-light-9);

    .box-item--title {
      background-color: var(--el-color-danger-light-8);
    }
  }
}
</style>

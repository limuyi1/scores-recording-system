<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

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
 * 获取对应分数的列表
 */
const getScoreList = (score: number) => {
  const data = originList.value as Array<ListItemType>
  return data
    .filter((e: ListItemType) => e.score && e.score >= score)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * 获取小于等于60分数的列表
 */
const le60ScoreList = () => {
  const data = originList.value as Array<ListItemType>
  return data
    .filter((e: ListItemType) => e.score && e.score < 60)
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
  <el-card class="statistics-card__wrapper">
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
        icon="Download"
        circle
        @click="exportExcelFun(originList, '全部')"
      />
    </div>
    <div class="box-item">
      <div class="box-item--title">≥90分</div>
      <template v-if="getScoreList(90).length">
        <el-popover placement="bottom" :width="400" trigger="hover">
          <template #reference>
            <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary"
              >{{ getScoreList(90).length }} 人</el-text
            >
          </template>
          <el-tag
            v-for="item in getScoreList(90)"
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
          icon="Download"
          circle
          @click="exportExcelFun(getScoreList(90), '≥90分')"
        />
      </template>
      <template v-else>
        <el-text type="primary">/</el-text>
      </template>
    </div>
    <div class="box-item">
      <div class="box-item--title">≥80分</div>
      <template v-if="getScoreList(80).length">
        <el-popover placement="bottom" :width="400" trigger="hover">
          <template #reference>
            <el-text style="cursor: pointer; width: 60px" tag="ins" type="primary"
              >{{ getScoreList(80).length }} 人</el-text
            >
          </template>
          <el-tag
            v-for="item in getScoreList(80)"
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
          icon="Download"
          circle
          @click="exportExcelFun(getScoreList(80), '≥80分')"
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
          icon="Download"
          circle
          @click="exportExcelFun(le60ScoreList(), '≤60分')"
        />
      </template>
      <template v-else>
        <el-text type="primary">/</el-text>
      </template>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.statistics-card__wrapper {
  margin-bottom: 16px;

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
}
</style>

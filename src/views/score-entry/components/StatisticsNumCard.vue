<script setup lang="ts">
import StudentPopover from '@/views/score-entry/components/StudentPopover.vue'

import type { ListItemType } from '@/types/DataSource'
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

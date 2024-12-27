<script setup lang="ts">
import EmptyTableView from '@/views/components/EmptyTableView.vue'
import OverlengthTextTooltip from '@/components/OverlengthTextTooltip.vue'

import { generateUniqueExpressions } from '@/untils/generateExpressionsUtil'

const expressions = generateUniqueExpressions(10)

console.info(expressions)
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container v-if="1 === 1">
      <el-aside width="200px">菜单</el-aside>
      <el-main>
        <div style="width: 500px">
          <overlength-text-tooltip
            content="东哥获得国际大饭店房间号发给客户交付给客户接口规范和健康的减肥客观环境咖啡更健康健康通话费集约经营今天又哭姨妈会哭一哭"
            :level="2"
            custom-class="text-style"
            :custom-style="{
              color: 'blue'
            }"
          />
        </div>

        <!--        <router-view />-->
      </el-main>
    </el-container>
    <el-main v-else class="home-page-main__wrapper">
      <empty-table-view />
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
:deep(.text-style) {
  color: saddlebrown;
  font-size: 14px;
  line-height: 24px;
  width: 300px;
}
</style>

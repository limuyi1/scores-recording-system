<script setup lang="ts">
import EmptyTableView from '@/views/components/EmptyTableView.vue'
// import OverlengthTextTooltip from '@/components/OverlengthTextTooltip.vue'
import ComplementaryFoodForm from '@/views/complementary-food/ComplementaryFoodForm.vue'

// import { generateUniqueExpressions } from '@/untils/generateExpressionsUtil'

// const expressions = generateUniqueExpressions(10)

// console.info(expressions)
</script>

<template>
  <!--  <overlength-text-tooltip-->
  <!--    content="东哥获得国际大饭店房间号发给客户交付给客户接口规范和健康的减肥客观环境咖啡更健康健康通话费集约经营今天又哭姨妈会哭一哭"-->
  <!--    :level="3"-->
  <!--    custom-class="text-style"-->
  <!--    :custom-style="{-->
  <!--      color: 'blue'-->
  <!--    }"-->
  <!--  />-->

  <el-container class="home-page-container">
    <el-header>Header</el-header>
    <el-container v-if="1 === 1" class="home-page-main__wrapper">
      <el-aside width="200px">菜单</el-aside>
      <el-main>
        <complementary-food-form />

        <!--        <router-view />-->
      </el-main>
    </el-container>
    <el-main v-else class="home-page-main__wrapper">
      <empty-table-view />
    </el-main>
  </el-container>
</template>

<style lang="scss">
.home-page-container {
  height: 100vh;
}

.home-page-main__wrapper {
  height: 100%;
}

:deep(.text-style) {
  color: saddlebrown;
  font-size: 20px;
  line-height: 24px;
}

.text-style {
  color: saddlebrown;
  font-size: 24px;
  line-height: 24px;
}
</style>

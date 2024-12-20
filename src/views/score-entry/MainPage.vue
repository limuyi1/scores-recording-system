<script setup lang="ts">
import EmptyTableView from '@/views/components/EmptyTableView.vue'
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container v-if="1 === 1">
      <el-aside width="200px">菜单</el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-main v-else class="home-page-main__wrapper">
      <empty-table-view />
    </el-main>
  </el-container>
</template>

<style scoped lang="scss"></style>

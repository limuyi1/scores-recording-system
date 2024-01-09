<script setup lang="ts">
import HomeView from '@/views/HomeView.vue'
import InputScore from '@/views/InputScore.vue'
</script>

<template>
  <el-container>
    <el-header class="app--header">成绩录入系统</el-header>
    <el-container class="app-main">
      <el-aside width="800px"><home-view /></el-aside>
      <el-main>
        <input-score />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app--header {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #303133;
  background-color: #d9ecff;
}

.app-main {
  height: calc(100vh - 60px);
  background-color: #ecf5ff;
}
</style>

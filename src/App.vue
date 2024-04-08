<script setup lang="ts">
import { ref } from 'vue'

import HomeView from '@/views/HomeView.vue'
import InputScore from '@/views/InputScore.vue'

const home = ref()
const inputScore = ref()
</script>

<template>
  <el-container>
    <el-header class="app--header">成绩录入系统</el-header>
    <el-container class="app-main">
      <el-aside width="calc(50vw)">
        <home-view ref="home" @edit="(data) => inputScore?.editScore(data)" />
      </el-aside>
      <el-scrollbar>
        <el-main style="padding: 0 16px 16px">
          <input-score
            ref="inputScore"
            @scroll="(index) => home.scroll(index)"
            @submit="(data) => home.setScore(data)"
          />
        </el-main>
      </el-scrollbar>
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
  background-color: #f4f4f5;
}
</style>

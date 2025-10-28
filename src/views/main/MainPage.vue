<script setup lang="ts">
import { ref } from 'vue'

import LeftMenu from '@/views/main/components/LeftMenu.vue'

const title = ref(import.meta.env.VITE_GLOB_APP_TITLE)
</script>

<template>
  <el-container class="h-dvh">
    <el-header class="bg-primary text-white items-center" height="70px">
      <div class="h-full px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold">{{ title }}</h1>
      </div>
    </el-header>
    <el-container>
      <el-aside class="contents">
        <left-menu />
      </el-aside>
      <el-main class="flex-1! h-[calc(100vh-102px)] bg-(--el-color-info-light-9)">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
    <el-footer class="bg-dark text-white flex items-center justify-center" height="auto">
      <div>&copy; 2025 {{ title }} - 李木一版权所有</div>
    </el-footer>
  </el-container>
</template>

<style lang="scss"></style>

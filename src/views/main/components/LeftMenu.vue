<script setup lang="ts">
import { computed, type ComputedRef, onMounted, ref } from 'vue'

import data from '@/config/menu'
import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const isCollapse = ref(false)
const defaultActive = ref()

const menuData: ComputedRef<any[]> = computed(() => {
  const isEmpty = computed(() => store.data?.length)
  return data.map((item) => {
    if (item.path !== '/home') {
      item.disabled = !isEmpty.value
    }
    return item
  })
})

onMounted(() => {
  defaultActive.value = data[0].path
})
</script>

<template>
  <el-menu
    class="left-menu__wrapper h-full relative"
    :default-active="defaultActive"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <el-menu-item
      v-for="item in menuData"
      :key="item.name"
      :index="item.path"
      :disabled="item.disabled"
    >
      <el-icon><font-awesome-icon :icon="['solid', item.icon]" /></el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>

    <font-awesome-icon
      class="absolute z-10 -right-[12px] top-1/2 hover:cursor-pointer text-[rgba(24,26,27,0.20)] hover:text-[rgba(24,26,27,0.55)]"
      :icon="['solid', isCollapse ? 'circle-chevron-right' : 'circle-chevron-left']"
      @click="isCollapse = !isCollapse"
    />
  </el-menu>
</template>

<style scoped>
.left-menu__wrapper {
  border-right: 0;
}

.left-menu__wrapper:not(.el-menu--collapse) {
  width: 150px;
}
</style>

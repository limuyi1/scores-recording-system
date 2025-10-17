<script setup lang="tsx">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { ElMessageBox } from 'element-plus'

import EmptyTableView from '@/views/components/EmptyTableView.vue'

import { useDataSourceStore } from '@/stores/data-source'

import type { VxeTableEvents, VxeTablePropTypes } from 'vxe-table'

const store = useDataSourceStore()
const { header: headers, data: tableData } = storeToRefs(store)

const tableRef = ref()
const editConfig = ref<VxeTablePropTypes.EditConfig>({
  trigger: 'click',
  mode: 'cell',
  showIcon: false
})
const columnConfig = ref<VxeTablePropTypes.ColumnConfig>({
  drag: true
})
const menuConfig = ref<VxeTablePropTypes.MenuConfig>({
  header: {
    options: [
      [
        {
          prefixIcon: () => <font-awesome-icon icon={['solid', 'plus']} />,
          code: 'addLeft',
          name: '向左添加列'
        },
        {
          prefixIcon: () => <font-awesome-icon icon={['solid', 'plus']} />,
          code: 'addRight',
          name: '向右添加列'
        },
        {
          prefixIcon: () => <font-awesome-icon icon={['solid', 'trash-can']} />,
          code: 'remove',
          name: '删除列'
        }
      ]
    ]
  }
})

const isNotEmpty = computed(() => store.data?.length)
const nameIndex = computed(() => {
  return headers.value?.findIndex((e: string) => e === '姓名')
})

// 重置数据
const repeatIcon = () => <font-awesome-icon icon={['solid', 'repeat']} />

// 列拖拽结束
const columnDragendHandle = () => {
  const $table = tableRef.value
  if ($table) {
    const tableColumn = $table.getFullColumns()
    store.header = tableColumn.map((e: any) => e.field)
  }
}

// 菜单点击
const menuClickEvent: VxeTableEvents.MenuClick = ({ menu, column, columnIndex }) => {
  switch (menu.code) {
    case 'addRight':
      ElMessageBox.prompt('请输入列名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入列名'
      }).then(({ value }) => {
        if (value) {
          store.header?.splice(columnIndex + 1, 0, value)
        }
      })
      break
    case 'addLeft':
      ElMessageBox.prompt('请输入列名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入列名'
      }).then(({ value }) => {
        if (value) {
          store.header?.splice(columnIndex, 0, value)
        }
      })
      break
    case 'remove':
      ElMessageBox.confirm('确定要删除该列吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.header?.splice(columnIndex, 1)
        tableData.value.forEach((e) => {
          delete e[column.field]
        })
      })
      break
  }
}

// 重置信息
const resetStuInfo = () => {
  ElMessageBox.confirm('确定要重置学生信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 重置数据
    store.$reset()
  })
}
</script>

<template>
  <div class="overflow-hidden h-full w-full" v-if="isNotEmpty">
    <vxe-toolbar>
      <template #buttons>
        <div class="w-full px-4 flex justify-between">
          <el-button type="primary" :icon="repeatIcon" @click="resetStuInfo">上传信息</el-button>
        </div>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="tableRef"
      border
      show-overflow
      auto-resize
      height="auto"
      align="center"
      :edit-config="editConfig"
      :column-config="columnConfig"
      :menu-config="menuConfig"
      :data="tableData"
      @column-dragend="columnDragendHandle"
      @menu-click="menuClickEvent"
    >
      <vxe-column
        v-for="(item, index) in headers"
        :key="item"
        :field="item"
        :title="item"
        :fixed="index <= nameIndex ? 'left' : ''"
        sortable
        resizable
        :min-width="index <= nameIndex ? '100' : '150'"
        :edit-render="{ name: 'input' }"
      ></vxe-column>
    </vxe-table>
  </div>

  <empty-table-view v-else />
</template>

<style scoped lang="scss"></style>

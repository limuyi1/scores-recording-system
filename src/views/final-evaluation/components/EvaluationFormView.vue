<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'
import { Pages, pageSizeInPixels, mmToPixel } from '@/untils/pageSizeInPixelUntil'

const store = useDataSourceStore()
const { data: tableData } = storeToRefs(store)
const pageWidth = ref('0')
const cell = reactive({
  width: 0,
  height: 0
})

const cellInfo = {
  width: 90,
  height: 69
}

onMounted(() => {
  init()
})

const init = () => {
  const { width, height } = pageSizeInPixels(Pages.A4)
  pageWidth.value = width + 'px'

  const cellWidth = mmToPixel(cellInfo.width)
  const cellHeight = mmToPixel(cellInfo.height)
  cell.width = cellWidth
  cell.height = cellHeight
}
</script>

<template>
  <div class="evaluation-form-view__wrapper">
    <el-card class="evaluation-form-view--card" :style="{ width: pageWidth }" shadow="always">
      <el-scrollbar>
        <div class="evaluation-form-view--table__wrapper">
          <table class="evaluation-form-view--table" border="1" cellspacing="1">
            <template v-for="(item, index) in tableData">
              <tr v-if="index % 2 == 0" :key="index">
                <td
                  class="evaluation-form-view--table--cell"
                  :style="{ width: cell.width + 'px', height: cell.height + 'px' }"
                >
                  {{ item.name }}{{ item.comment }}
                </td>
                <td
                  class="evaluation-form-view--table--cell"
                  :style="{ width: cell.width + 'px', height: cell.height + 'px' }"
                >
                  {{ tableData[index + 1]?.name }}{{ tableData[index + 1]?.comment }}
                </td>
              </tr>
            </template>
          </table>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.evaluation-form-view__wrapper {
  height: 100%;

  .evaluation-form-view--card {
    height: 100%;

    .evaluation-form-view--table__wrapper {
      display: flex;
      justify-content: center;
      height: 100%;
      padding: 16px 0;
      box-sizing: border-box;
    }
  }

  .evaluation-form-view--table {
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border: 1px dashed #000000;
  }
}

.evaluation-form-view--card :deep(.el-card__body) {
  height: 100%;
  padding: 0;
}
</style>

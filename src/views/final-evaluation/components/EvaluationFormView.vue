<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useDataSourceStore } from '@/stores/data-source'
import { Pages, pageSizeInPixels, mmToPixel } from '@/untils/pageSizeInPixelUntil'

const store = useDataSourceStore()
const { data: tableData } = storeToRefs(store)
const pageWidth = ref(0)
const pagePadding = ref(0)
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
  pageWidth.value = width

  const cellWidth = mmToPixel(cellInfo.width)
  const cellHeight = mmToPixel(cellInfo.height)
  cell.width = cellWidth
  cell.height = cellHeight

  pagePadding.value = (pageWidth.value - cell.width * 2) / 2
}
</script>

<template>
  <div class="evaluation-form-view__wrapper">
    <el-card
      class="evaluation-form-view--card"
      :style="{ width: pageWidth + 'px' }"
      shadow="always"
    >
      <el-scrollbar>
        <div
          class="evaluation-form-view--table__wrapper"
          :style="{ padding: `${pagePadding}px 0px` }"
        >
          <table class="evaluation-form-view--table" border="1" cellspacing="1">
            <template v-for="(item, index) in tableData">
              <tr v-if="index % 2 == 0" :key="index">
                <td
                  :style="{ width: cell.width + 'px', height: cell.height + 'px' }"
                  v-for="e in 2"
                  :key="e"
                >
                  <div
                    v-if="tableData[index + e - 1]?.id"
                    class="evaluation-form-view--table--cell__wrapper"
                  >
                    <div class="table-td">{{ tableData[index + e - 1]?.name }}同学：</div>
                    <div class="table-td table-body">
                      {{ tableData[index + e - 1]?.comment }}
                    </div>
                    <div class="table-footer">
                      <span>学校：（章）</span>
                      <span>班主任：<span class="table-td">陈露</span></span>
                    </div>
                  </div>
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
      box-sizing: border-box;
    }
  }

  .evaluation-form-view--table {
    border-collapse: collapse;

    .evaluation-form-view--table--cell__wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      padding: 8px;
      box-sizing: border-box;

      .table-td {
        font-size: 18px;
        font-family: 'FYFont', sans-serif;
      }

      .table-body {
        flex: 1;
      }

      .table-footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        box-sizing: border-box;
      }
    }
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

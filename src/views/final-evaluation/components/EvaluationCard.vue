<script setup lang="ts">
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useConfigurationStore } from '@/stores/configuration'

import { mmToPixel, pageSizeInPixels } from '@/untils/pageSizeInPixelUntil'

import type { ListItemType } from '@/types/DataSource'

const store = useConfigurationStore()
const { data: configuration } = storeToRefs(store)

interface CellInfoType {
  width: number
  height: number
}
interface Props {
  cellInfo: CellInfoType
  data: Array<ListItemType>
}

const props = withDefaults(defineProps<Props>(), {
  cellInfo: () => {
    return {
      width: 0,
      height: 0
    } as CellInfoType
  }
})

const page = reactive({
  width: 0,
  height: 0,
  padding: 0
})

const init = (val) => {
  const { width, height } = pageSizeInPixels(val)
  page.width = width
  page.height = height

  page.padding = (width - props.cellInfo?.width * 2) / 2
}

watch(
  () => configuration.value.pageType,
  (val) => {
    init(val)
  },
  { immediate: true }
)
</script>

<template>
  <el-card class="evaluation-card__wrapper" :style="{ width: page.width + 'px' }" shadow="always">
    <div class="evaluation-card--table__wrapper" :style="{ padding: `${page.padding}px 0px` }">
      <table class="evaluation-card--table" border="1" cellspacing="1">
        <template v-for="(item, index) in props.data">
          <!-- 每行两个 -->
          <tr v-if="index % 2 == 0" :key="item.id">
            <td
              :style="{ width: props.cellInfo.width + 'px', height: props.cellInfo.height + 'px' }"
              v-for="e in 2"
              :key="e"
            >
              <div
                v-if="props.data[index + e - 1]?.id"
                class="evaluation-card--table--cell__wrapper"
              >
                <div class="table-td">{{ props.data[index + e - 1]?.name }}同学：</div>
                <div class="table-td table-body">
                  {{ props.data[index + e - 1]?.comment }}
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
  </el-card>
</template>

<style scoped lang="scss">
table,
th,
td {
  border: 1px dashed #000000;
}

.evaluation-card__wrapper {
  height: 100%;
  margin-bottom: 24px;

  .evaluation-card--table__wrapper {
    display: flex;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;

    .evaluation-card--table {
      border-collapse: collapse;

      .evaluation-card--table--cell__wrapper {
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
  }
}
</style>

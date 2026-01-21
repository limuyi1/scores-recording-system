<script setup lang="ts">
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useConfigurationStore } from '@/stores/configuration'

import { pageSizeInPixels } from '@/untils/pageSizeInPixelUntil'

import type { ListItemType } from '@/types/DataSource'
import { PagesEnum } from '@/types/Common'

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

const init = (val: PagesEnum) => {
  const { width, height } = pageSizeInPixels(val)
  page.width = width
  page.height = height

  page.padding = (width - props.cellInfo?.width * 2) / 2
}

watch(
  () => configuration.value.pageType,
  (val: PagesEnum) => {
    init(val)
  },
  { immediate: true }
)

const getEvaluationText = (str: string | undefined | null) => {
  if (str) {
    return (str as any).replaceAll('\n', '<br />')
  }

  return ''
}
</script>

<template>
  <el-card
    class="evaluation-card__wrapper"
    :style="{ width: page.width + 'px', height: page.height + 'px' }"
    shadow="always"
  >
    <div class="evaluation-card--table__wrapper" :style="{ padding: `${page.padding}px` }">
      <table class="evaluation-card--table" border="0" cellspacing="0">
        <template v-for="(item, index) in props.data">
          <!-- 每行n个 -->
          <tr v-if="index % 2 == 0" :key="`${item.id}_${index}`">
            <template v-for="e in 2">
              <td v-if="props.data[index + e - 1]?.id" :key="e">
                <div
                  :style="{
                    width: props.cellInfo.width + 'px',
                    height: props.cellInfo.height + 'px',
                    fontSize: configuration.fontSize + 'px'
                  }"
                  class="evaluation-card--table--cell__wrapper"
                >
                  <div
                    :style="{
                      fontSize: configuration.salutationFontSize + 'px'
                    }"
                    class="table-td"
                  >
                    {{ props.data[index + e - 1]?.name }}同学：
                  </div>
                  <div
                    :style="{
                      fontSize: configuration.textFontSize + 'px'
                    }"
                    class="table-td table-body"
                    v-html="getEvaluationText(props.data[index + e - 1]?.comment)"
                  ></div>
                  <div class="table-footer">
                    <span
                      :style="{
                        fontSize: configuration.sealFontSize + 'px'
                      }"
                      >学校：（章）</span
                    >
                    <span
                      :style="{
                        fontSize: configuration.classTeacherFontSize + 'px'
                      }"
                      >班主任：<span
                        :style="{
                          fontSize: configuration.inscribeFontSize + 'px'
                        }"
                        class="table-td font-fy"
                        >{{ configuration.inscribe }}</span
                      ></span
                    >
                  </div>
                </div>
              </td>
            </template>
          </tr>
        </template>
      </table>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
td {
  border-bottom: 1px dashed #000000;
  border-right: 1px dashed #000000;
}

.evaluation-card__wrapper {
  height: 100%;
  margin-bottom: 24px;

  .evaluation-card--table__wrapper {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    box-sizing: border-box;

    .evaluation-card--table {
      border-collapse: separate;
      border-top: 1px dashed #000000;
      border-left: 1px dashed #000000;

      .evaluation-card--table--cell__wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        padding: 8px;
        box-sizing: border-box;

        .table-td {
          font-size: 18px;
        }

        .table-body {
          flex: 1;
          text-indent: 2em;
          overflow: hidden;
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

.evaluation-card__wrapper :deep(.el-card__body) {
  padding: 0;
}
</style>

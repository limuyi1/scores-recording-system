<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTransition } from '@vueuse/core'

import { storeToRefs } from 'pinia'
import { useDataSourceStore } from '@/stores/data-source'

import type { ListItemType } from '@/types/DataSource'

const store = useDataSourceStore()

const { data: originList } = storeToRefs(store)

const average = ref(0)
// const statisticData = reactive({
//   average: 0
// })

const outputAverage = useTransition(average, {
  duration: 1500
})

store.$subscribe((mutate, state) => {
  exec(state.data)
})

const exec = (data: Array<ListItemType>) => {
  const nonNull = data.filter((e) => e.score !== null)

  // 统计总数
  const sum = nonNull.reduce((accumulator, currentValue) => accumulator + currentValue!.score, 0)

  const _avg = sum / data.length
  average.value = parseFloat(_avg.toFixed(2))
}

exec(originList.value)
</script>

<template>
  <el-card>
    <el-row style="margin-bottom: 8px">
      <el-col :span="6">
        <el-statistic title="平均分" :value="outputAverage" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="学科综合评比率" :value="268500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              学科综合评比率
              <el-tooltip
                effect="dark"
                content="平均分 * 40% + 及格率 * 30% + 优秀率 * 30% + 特优率 * 5% - 低分率 * 5%"
                placement="top"
              >
                <el-icon class="icon-wrapper" :size="12">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-statistic title="及格率" :value="268500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              及格率
              <el-tooltip effect="dark" content="≥60分 / 总人数" placement="top">
                <el-icon class="icon-wrapper" :size="12">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="优秀率" :value="268500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              优秀率
              <el-tooltip effect="dark" content="≥80分 / 总人数" placement="top">
                <el-icon class="icon-wrapper" :size="12">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="特优率" :value="268500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              特优率
              <el-tooltip effect="dark" content="≥95分 / 总人数" placement="top">
                <el-icon class="icon-wrapper" :size="12">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="低分率" :value="268500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              低分率
              <el-tooltip effect="dark" content="<40分 / 总人数" placement="top">
                <el-icon class="icon-wrapper" :size="12">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
.icon-wrapper {
  margin-left: 4px;
  cursor: pointer;
}
</style>

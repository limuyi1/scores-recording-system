<script setup lang="ts">
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import DownloadBtn from '@/views/score-entry/components/DownloadBtn.vue'

import { useDataSourceStore } from '@/stores/data-source'

const store = useDataSourceStore()

const comprehensiveRatingRate = ref(0)
const average = ref(0) // 平均分
const passRate = ref(0) // 及格率
const excellentRate = ref(0) // 优秀率
const optimumRate = ref(0) // 特优率
const lowScoreRate = ref(0) // 低分率

const outputComprehensiveRatingRate = useTransition(comprehensiveRatingRate, {
  duration: 1500
})
const outputAverage = useTransition(average, {
  duration: 1500
})
const outputPassRate = useTransition(passRate, {
  duration: 1500
})
const outputExcellentRate = useTransition(excellentRate, {
  duration: 1500
})
const outputOptimumRate = useTransition(optimumRate, {
  duration: 1500
})
const outputLowScoreRate = useTransition(lowScoreRate, {
  duration: 1500
})

store.$subscribe(() => {
  exec()
})

const exec = () => {
  average.value = store.average
  passRate.value = store.passRate
  excellentRate.value = store.excellentRate
  optimumRate.value = store.optimumRate
  lowScoreRate.value = store.lowScoreRate
  comprehensiveRatingRate.value = store.comprehensiveRatingRate
}

exec()
</script>

<template>
  <el-card class="statistics-rate__wrapper">
    <div class="download-btn__wrapper">
      <download-btn />
    </div>
    <el-row style="margin-bottom: 8px">
      <el-col :span="6">
        <el-statistic title="平均分" :value="outputAverage.toFixed(2)" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="综合评比率" :value="outputComprehensiveRatingRate.toFixed(2)">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              综合评比率
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
          <template #suffix>%</template>
        </el-statistic>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-statistic title="及格率" :value="outputPassRate.toFixed(2)">
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
          <template #suffix>%</template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="优秀率" :value="outputExcellentRate.toFixed(2)">
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
          <template #suffix>%</template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="特优率" :value="outputOptimumRate.toFixed(2)">
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
          <template #suffix>%</template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="低分率" :value="outputLowScoreRate.toFixed(2)">
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
          <template #suffix>%</template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
.statistics-rate__wrapper {
  position: relative;

  .download-btn__wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .icon-wrapper {
    margin-left: 4px;
    cursor: pointer;
  }
}
</style>

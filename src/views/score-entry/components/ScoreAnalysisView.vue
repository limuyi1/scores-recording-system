<script setup lang="ts">
import StatisticsRateCard from '@/views/score-entry/components/StatisticsRateCard.vue'
import StatisticsNumCard from '@/views/score-entry/components/StatisticsNumCard.vue'
</script>

<template>
  <div class="score-analysis-view__wrapper">
    <statistics-rate-card />
    <div class="space"></div>
    <!--    <statistics-num-card />-->
  </div>
</template>

<style scoped lang="scss">
.score-analysis-view__wrapper {
  .space {
    height: 12px;
  }
}
</style>

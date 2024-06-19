<script setup lang="ts">
import EvaluationFormView from '@/views/final-evaluation/components/EvaluationFormView.vue'
</script>

<template>
  <div class="final-evaluation-page__wrapper">
    <div class="final-evaluation-page--left">
      <evaluation-form-view />
    </div>
    <div class="final-evaluation-page--right">final-evaluation-page--right</div>
  </div>
</template>

<style scoped lang="scss">
.final-evaluation-page__wrapper {
  height: calc(100vh - 60px - 55px - 20px);
  width: 100%;
  display: flex;

  .final-evaluation-page--left {
    min-width: 50%;
  }

  .final-evaluation-page--right {
    flex: 1;
    padding: 0 20px 20px;
    box-sizing: border-box;
  }
}
</style>

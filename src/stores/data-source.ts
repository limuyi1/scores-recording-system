import { defineStore } from 'pinia'

export const useDataSourceStore = defineStore('dataSource', {
  state: () => {
    return {
      header: [] as Array<string>,
      data: [] as Array<any>
    }
  },
  getters: {
    average: (state) => {
      const sum = state.data.reduce((acc, cur) => acc + (cur.score || 0), 0)
      return state.data.length > 0 ? sum / state.data.length : 0
    },
    passRate: (state) => {
      return (
        (state.data.filter((item) => item.score !== null && item.score >= 60).length /
          state.data.length) *
        100
      )
    },
    excellentRate: (state) => {
      return (
        (state.data.filter((item) => item.score !== null && item.score >= 80).length /
          state.data.length) *
        100
      )
    },
    optimumRate: (state) => {
      return (
        (state.data.filter((item) => item.score !== null && item.score >= 95).length /
          state.data.length) *
        100
      )
    },
    lowScoreRate: (state) => {
      return (
        (state.data.filter((item) => item.score !== null && item.score <= 40).length /
          state.data.length) *
        100
      )
    },
    comprehensiveRatingRate() {
      return (
        Number(this.average) * 0.4 +
        (Number(this.passRate) / 100) * 0.3 +
        (Number(this.excellentRate) / 100) * 0.3 +
        (Number(this.optimumRate) / 100) * 0.05 -
        (Number(this.lowScoreRate) / 100) * 0.05
      )
    },
    // 标签类型list
    tagTypeList: (state) => {
      // 表格删除前两列
      return state.header.slice(2)
    }
  },
  persist: true
})

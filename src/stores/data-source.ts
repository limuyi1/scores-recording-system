import { defineStore } from 'pinia'
import { ListItemType } from '@/types/DataSource'

export const useDataSourceStore = defineStore('dataSource', {
  state: () => {
    return {
      data: [] as Array<ListItemType>
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
        this.average * 0.4 +
        (this.passRate / 100) * 0.3 +
        (this.excellentRate / 100) * 0.3 +
        (this.optimumRate / 100) * 0.05 -
        (this.lowScoreRate / 100) * 0.05
      )
    }
  },
  persist: true
})

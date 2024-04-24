import { defineStore } from 'pinia'
import { ListItemType } from '@/views/types'

export const useDataSourceStore = defineStore('dataSource', {
  state: () => {
    return {
      data: [] as Array<ListItemType>
    }
  },
  persist: true
})

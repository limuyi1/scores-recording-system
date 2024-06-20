import { defineStore } from 'pinia'
import { ListItemType } from '@/types/DataSource'

export const useDataSourceStore = defineStore('dataSource', {
  state: () => {
    return {
      data: [] as Array<ListItemType>
    }
  },
  persist: true
})

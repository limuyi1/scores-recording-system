import { defineStore } from 'pinia'

import type { ConfigurationType } from '@/types/Configuration'

export const useConfigurationStore = defineStore('configuration', {
  state: () => {
    return {
      data: {
        fontSize: 18, // 整体字号
        salutationFontSize: 18, // 问候语字号
        textFontSize: 18, // 正文字号
        sealFontSize: 18, // 印章字号
        classTeacherFontSize: 18, // 班主任字号
        inscribeFontSize: 18, // 落款字号
        inscribe: '' // 签名名称
      } as ConfigurationType
    }
  },
  persist: true
})

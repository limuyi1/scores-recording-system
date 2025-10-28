import { defineStore } from 'pinia'

import { PagesEnum } from '@/types/Common'
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
        inscribe: '', // 签名名称
        pageType: PagesEnum.A4, // 页面类型
        pageTypeList: [PagesEnum.A3, PagesEnum.A4, PagesEnum.B3, PagesEnum.B4],
        inputScoreTab: null // 录入成绩页签
      } as ConfigurationType
    }
  },
  actions: {
    fontSizeChange(fontSize: number) {
      this.data.salutationFontSize = fontSize // 问候语字号
      this.data.textFontSize = fontSize // 正文字号
      this.data.sealFontSize = fontSize // 印章字号
      this.data.classTeacherFontSize = fontSize // 班主任字号
      this.data.inscribeFontSize = fontSize // 落款字号
    }
  },
  persist: true
})

import { PagesEnum } from '@/types/Common'

export interface ConfigurationType {
  fontSize: number // 整体字号
  salutationFontSize: number // 问候语字号
  textFontSize: number // 正文字号
  sealFontSize: number // 印章字号
  classTeacherFontSize: number // 班主任字号
  inscribeFontSize: number // 落款字号
  inscribe: string // 签名名称
  pageType: PagesEnum // 页面类型
  pageTypeList: Array<PagesEnum> // 页面类型列表
  inputScoreTab: string // 录入成绩页签
}

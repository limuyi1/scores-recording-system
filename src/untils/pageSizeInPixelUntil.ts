import type { PagesEnum } from '@/types/Common'
import { useConfigurationStore } from '@/stores/configuration'
import { storeToRefs } from 'pinia'

const getDPI = () => {
  const tempDiv = document.createElement('div')
  tempDiv.style.width = '1in'
  tempDiv.style.visibility = 'hidden'
  document.body.appendChild(tempDiv)
  const dpi = tempDiv.offsetWidth
  document.body.removeChild(tempDiv)
  return dpi
}

const mmToPixel = (mm: number) => {
  const dpi = getDPI()

  // 1 inch = 25.4 mm
  const inches = mm / 25.4
  const pixels = inches * dpi
  return Math.round(pixels)
}

/**
 * 获取页面尺寸
 * @param pageSize
 */
const pageSizeInPixels = (pageSize: PagesEnum): { width: number; height: number } => {
  const pageSizeMap = {
    A3: { width: 297, height: 420 },
    A4: { width: 210, height: 297 },
    B3: { width: 353, height: 500 },
    B4: { width: 250, height: 353 }
  }

  const width_px = mmToPixel(pageSizeMap[pageSize].width)
  const height_px = mmToPixel(pageSizeMap[pageSize].height)

  return { width: width_px, height: height_px }
}

export { pageSizeInPixels, mmToPixel, getDPI }

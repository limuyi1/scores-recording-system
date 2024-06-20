import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { getDPI, pageSizeInPixels } from '@/untils/pageSizeInPixelUntil'

import { PagesEnum } from '@/types/Common'
import { ElLoading } from 'element-plus'

/**
 * 导出pdf
 * @param refs 元素集合
 * @param pageType pdf页面类型
 * @param scale 缩放
 * @param fileName 文件名
 */
const exportPDF = async (
  refs: any,
  pageType: PagesEnum = PagesEnum.A4,
  scale: number = 2,
  fileName: string = new Date().toLocaleString() + '.pdf'
) => {
  const loading = ElLoading.service({
    lock: true
  })
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: pageType
  })

  for (const ref of refs) {
    const canvas = await html2canvas(ref, {
      scale: scale
    })
    const imgData = canvas.toDataURL('image/png')
    const imgProps = doc.getImageProperties(imgData)
    const pdfWidth = doc.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    doc.addPage()
  }

  doc.save(fileName)

  loading.close()
}

export { exportPDF }

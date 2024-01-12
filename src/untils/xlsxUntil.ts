import * as XLSX from 'xlsx'
import { WorkBook } from 'xlsx'

/**
 * 导出excel
 * @param headerData
 * @param bodyData
 * @param fileName
 * @param file
 */
const exportExcel = (
  headerData: string[],
  bodyData: string[][],
  fileName: string = new Date().toLocaleString() + '.xlsx',
  file?: WorkBook
) => {
  const data = [headerData, ...bodyData]

  let workbook
  if (!file) {
    workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  } else {
    workbook = file
  }

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })

  const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' })
  const url = window.URL.createObjectURL(blobData)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export { exportExcel }

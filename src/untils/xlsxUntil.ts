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
  headerData?: string[],
  bodyData?: any[][],
  fileName: string = new Date().toLocaleString() + '.xlsx',
  file?: WorkBook
) => {
  let workbook
  if (!file && headerData && bodyData) {
    workbook = XLSX.utils.book_new()
    const data = [headerData, ...bodyData]
    const worksheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  } else {
    workbook = file
  }

  if (!workbook) {
    return
  }

  const excelBuffer = XLSX.write(workbook!, {
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

/**
 * 解析表格数据
 * @param file 文件
 */
const parseExcel = async (file: any) => {
  const dataBinary = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file.raw)
    reader.onload = (ev: any) => {
      resolve(ev.target.result)
    }
  })

  const workBook = XLSX.read(dataBinary, { type: 'binary', cellDates: true })
  const firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]]

  // 分为第一行的数据，和第一行下方的数据
  const header = getRow(firstWorkSheet)
  const data = XLSX.utils.sheet_to_json(firstWorkSheet)

  return { header, data }
}

/**
 * 获得行数据
 * @param sheet
 * @param row
 */
const getRow = (sheet: any, row?: number) => {
  const headers = [] // 定义数组，用于存放解析好的数据
  const range = XLSX.utils.decode_range(sheet['!ref']) // 读取sheet的单元格数据
  let C
  // 表格范围的起始行索引赋值给R
  const R = row ? row : range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) {
    // 使用encode_cell方法根据列索引C和行索引R获取对应单元格的数据。
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    // 初始化hdr为默认值"UNKNOWN " + 列索引C，表示未知的表头数据。
    let hdr = 'UNKNOWN ' + C
    // 如果单元格存在且有数据类型（t表示数据类型），则使用format_cell方法格式化单元格数据，并将结果赋值给hdr。
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers // 经过上方一波操作遍历，得到最终的第一行头数据
}

export { exportExcel, parseExcel }

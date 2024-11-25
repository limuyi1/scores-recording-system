import * as XLSX from 'xlsx'
import domtoimage from 'dom-to-image'
import { ElLoading } from 'element-plus'

/**
 * 导出图片
 * @param data 表格数据
 * @param imageName 图片名称
 * @param scale 放大倍数
 */
const xlsxToImage = (data: any[][], imageName: string = 'image.png', scale: number = 2) => {
  const loading = ElLoading.service({
    fullscreen: true,
    text: '正在导出图片，请稍后...'
  })

  const element = document.createElement('div')
  element.id = 'sheet'
  element.setAttribute('style', 'position: absolute;top: 0;z-index: -1000;')
  document.body.appendChild(element)

  const worksheet = XLSX.utils.aoa_to_sheet(data)
  element.innerHTML = XLSX.utils.sheet_to_html(worksheet)

  // 设置表格样式
  const selectorTable = element.querySelector('table')
  selectorTable?.setAttribute('border', '1')
  selectorTable?.setAttribute('cellspacing', '0')

  domtoimage
    .toJpeg(element, {
      quality: 1,
      width: element?.offsetWidth * scale,
      height: element?.offsetHeight * scale,
      bgcolor: '#FFFFFF',
      style: {
        transform: `scale(${scale})`, // 放大元素倍数，提高清晰度
        transformOrigin: '0 0' // 指定变换的原点
      }
    })
    .then((dataUrl: string) => {
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = imageName
      link.click()
    })
    .finally(() => {
      element.remove()

      loading.close()
    })
}

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
  file?: XLSX.WorkBook
) => {
  const loading = ElLoading.service({
    fullscreen: true,
    text: '正在导出Excel，请稍后...'
  })

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
    loading.close()
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
  link.click()

  loading.close()
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

export { exportExcel, parseExcel, xlsxToImage }

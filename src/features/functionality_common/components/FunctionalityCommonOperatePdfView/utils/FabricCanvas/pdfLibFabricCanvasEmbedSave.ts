import * as fabric from 'fabric'
import { PDFDocument } from 'pdf-lib'
//file 是pdf，pdfPageNumber是pdf的页数，根据id绘制到pdf上，并保存下载

// file 是 pdf，pdfAllData 是所有需要绘制的 JSON 数据，根据 id 绘制到 pdf 上，并保存下载
export const pdfLibFabricCanvasEmbedSave = async (
  pdfDoc: PDFDocument,
  fabricAllData: string[],
) => {
  try {

    // 获取存在的数据索引
    const indexesToProcess = fabricAllData
      .map((data, index) => (data ? index : null))
      .filter((index) => index !== null)

    // 遍历存在的索引
    for (const index of indexesToProcess) {
      if (typeof index === 'number') {
        const page = pdfDoc.getPage(index)
        const jsonData = fabricAllData[index]

        // 创建 Fabric.js 画布
        const fabricCanvas = new fabric.Canvas(undefined)
        fabricCanvas.setDimensions({
          width: page.getSize().width * 2,
          height: page.getSize().height * 2,
        })

        // 从 JSON 加载对象到 Fabric.js 画布
        await fabricCanvas.loadFromJSON(
          jsonData,
          fabricCanvas.renderAll.bind(fabricCanvas),
        )
        // 生成 JPEG 或 PNG 图像
        const canvasImg = fabricCanvas.toDataURL({
          format: 'png', // 选择格式
          quality: 1, // 选择质量
          multiplier: 2, // 选择分辨率
        })

        const pdfPageSize = page.getSize()
        const pngImage = await pdfDoc.embedPng(canvasImg)
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pdfPageSize.width,
          height: pdfPageSize.height,
        })
      }
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

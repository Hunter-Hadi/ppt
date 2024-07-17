import { PDFDocument } from 'pdf-lib'

//file 是pdf，pdfPageNumber是pdf的页数，根据id绘制到pdf上，并保存下载
export const pdfAddSignCanvasViewReturnUint8Array = async (
  file: File,
  pdfPageNumber: number,
) => {
  try {
    let pdfDoc: PDFDocument | null = null
    try {
      const fileBuffer = await file.arrayBuffer()
      pdfDoc = await PDFDocument.load(fileBuffer)
    } catch (error) {
      console.error('Error loading PDF Document:', error)
      return
    }

    for (let i = 0; i < pdfPageNumber; i++) {
      // 1. 获取必要的元素和数据
      const page = pdfDoc.getPage(i)
      const canvasWrap = document.querySelector(
        `.sample-canvas-wrap-${i + 1}`,
      ) as HTMLDivElement
      const canvas = document.querySelector(
        `.sample-canvas-${i + 1} .lower-canvas`,
      ) as HTMLCanvasElement

      if (canvas && canvasWrap) {
        // 2. 计算裁剪区的大小和偏移
        const canvasWrapRect = canvasWrap.getBoundingClientRect()
        const canvasRect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / canvasRect.width
        const scaleY = canvas.height / canvasRect.height

        const cropX = (canvasWrapRect.left - canvasRect.left) * scaleX
        const cropY = (canvasWrapRect.top - canvasRect.top) * scaleY
        const cropWidth = canvasWrapRect.width * scaleX
        const cropHeight = canvasWrapRect.height * scaleY

        // 3. 创建一个新的 canvas 用于裁剪
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = cropWidth
        tempCanvas.height = cropHeight
        const ctx = tempCanvas.getContext('2d')
        if (!ctx) {
          continue
        }
        // 4. 裁剪并绘制图像到新 canvas 上
        ctx.drawImage(
          canvas,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight,
        )

        // 5. 将裁剪后的图像转换为 DataURL 并嵌入到 PDF 页面
        const image = tempCanvas.toDataURL('image/png')
        const pdfPageSize = page.getSize()
        const pngImage = await pdfDoc.embedPng(image)

        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pdfPageSize.width,
          height: pdfPageSize.height,
        })
      }
    }

    return await pdfDoc.save()
  } catch (e) {
    console.log(e)
  }
}

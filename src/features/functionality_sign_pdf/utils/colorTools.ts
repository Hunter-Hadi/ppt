export const findFirstNonTransparentPixel = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas?.getContext('2d')
  if (!ctx) return ''
  ctx.drawImage(image, 0, 0)
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      // 取得一个像素点的数据
      const imgData = ctx.getImageData(x, y, 1, 1)
      const red = imgData.data[0]
      const green = imgData.data[1]
      const blue = imgData.data[2]
      const alpha = imgData.data[3]

      // 排除透明色
      if (alpha !== 0) {
        // 对找到的第一个非透明像素点颜色进行判断
        if (red === 0 && green === 0 && blue === 0) {
          console.log('图片是黑色')
          return 'black'
        } else if (red === 255 && green === 255 && blue === 255) {
          console.log('图片是白色')
          return 'white'
        } else if (red > green && red > blue) {
          console.log('图片是红色')
          return 'red'
        } else if (blue > red && blue > green) {
          console.log('图片是蓝色')
          return 'blue'
        } else {
          console.log('无法识别的颜色')
        }
        return // 找到第一个非透明的像素后返回
      }
    }
  }
}

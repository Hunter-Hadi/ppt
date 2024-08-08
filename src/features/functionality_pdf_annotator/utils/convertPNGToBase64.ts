import heic2any from 'heic2any'
export const convertToPNGBase64 = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = async () => {
      try {
        if (file?.type === 'image/heic') {
          const heicResult = await heic2any({
            blob: file,
            toType: 'image/png',
            quality: 0.5,
          })
          const pngBlob = new Blob([heicResult as BlobPart], {
            type: 'image/png',
          })
          const pngReader = new FileReader()

          pngReader.onloadend = () => {
            const base64String = pngReader.result as string
            resolve(base64String)
          }

          pngReader.onerror = reject
          pngReader.readAsDataURL(pngBlob)
        } else {
          const base64String = reader.result as string
          resolve(base64String)
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = reject

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      reader.readAsDataURL(file)
    } else if (file.type === 'image/heic') {
      // HEIC文件的处理在`onloadend`中进行。
      reader.readAsArrayBuffer(file) // Read the HEIC file as an ArrayBuffer
    } else {
      reject(new Error('Unsupported file type.'))
    }
  })
}

const adjustImageDimensions = (width: number, height: number) => {
  const maxWidth = 200
  const maxHeight = 300

  if (width <= maxWidth && height <= maxHeight) {
    // 图片原尺寸足够小
    return { width, height }
  }

  // 比例缩放
  const ratio = Math.min(maxWidth / width, maxHeight / height)
  return { width: width * ratio, height: height * ratio }
}

export const convertFileToBase64Png = async (file: File) => {
  return new Promise<{
    base64String: string
    width: number
    height: number
  }>((resolve, reject) => {
    convertToPNGBase64(file).then((base64String) => {
      const image = new Image()

      image.src = base64String

      image.onload = () => {
        const { width, height } = adjustImageDimensions(
          image.width,
          image.height,
        )
        resolve({
          base64String,
          width,
          height,
        })
      }

      image.onerror = (err) => console.error('Image load error', err)
    })
  })
}

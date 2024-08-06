import dayjs from 'dayjs'
import * as fabric from 'fabric'
import { v4 as uuidV4 } from 'uuid'

import { ICanvasObjectData } from '../../types'

const SIGN_TEXT_FONT_FAMILY_LIST = [
  'Concert One',
  'Roboto',
  'Courier Prime',
  'Noto Serif',
  'EB Garamond',
  'Ma Shan Zheng',
  'Oswald',
  'Playfair Display',
  'Roboto Slab',
  'Embed code',
  'Teko',
  'Pacifico',
  'Lobster',
  'Permanent Marker',
  'Zeyada',
  'Orbitron',
]
const findFirstNonTransparentPixel = (image: HTMLImageElement) => {
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

// 初始化fabricCanvas的操作
export const fabricInitStyleSet = (fabricCanvas) => {
  fabricCanvas.Object.prototype.set({
    borderColor: '#9065B0',
    cornerColor: '#9065B0', //激活状态角落图标的填充颜色
    cornerStrokeColor: '', //激活状态角落图标的边框颜色
    borderScaleFactor: 1,
    cornerSize: 20,
    transparentCorners: false, //激活状态角落的图标是否透明
    selectionDashArray: [20, 20],
  })

  // 设置旋转按钮控制点的可见性
  fabricCanvas.Object.prototype._controlsVisibility = {
    tl: true,
    tr: true,
    br: true,
    bl: true,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: false,
  }
  // 设置多选旋转按钮控制点的可见性
  fabricCanvas.Group.prototype._controlsVisibility = {
    tl: true,
    tr: true,
    br: true,
    bl: true,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: false,
  }
}

/* eslint-disable no-debugger */
/* eslint-disable no-extra-semi */

//自动的检查top是否超出画布范围
const autoCheckTopIsAbnormal = (
  fabricCanvas,
  top: number,
  canvasObject: fabric.Object,
  isAutoObjectSizePosition?: boolean,
) => {
  const zoom = fabricCanvas.current.getZoom() || 1
  const canvasHeight = fabricCanvas.current.height / zoom
  const canvasObjectHeight = (canvasObject.height * canvasObject.scaleX) / zoom
  let currentTop = top
  if (isAutoObjectSizePosition) {
    currentTop = currentTop - canvasObjectHeight / 2
  }
  if (currentTop < 0) {
    return 0
  } else if (currentTop + canvasObjectHeight > canvasHeight) {
    return fabricCanvas.current.height - canvasObjectHeight
  }
  return currentTop
}
export type IFabricAddObjectType = 'image' | 'text-box' | 'text' | 'i-text'
//根据位置/信息添加Fabric对象
export const onFabricAddObject = async (
  fabricCanvas,
  canvasObject: ICanvasObjectData,
  isAutoObjectSizePosition?: boolean,
  isMobile: boolean = false,
) => {
  try {
    const zoom = fabricCanvas.current.getZoom();

    const centerX = fabricCanvas.current.width / zoom / 2;
    const centerY = fabricCanvas.current.height / zoom / 2;
    // 计算当前缩放的比例
    const topPositionData = {
      left: canvasObject.x ? canvasObject.x / zoom : centerX,
      top: canvasObject.y ? canvasObject.y / zoom : centerY,
    };
    if (!fabricCanvas) return null
    let createObjectData: fabric.Object | null = null
    const positionData = {
      left: topPositionData.left,
      top: topPositionData.top,
      hasRotatingPoint: false, // 禁用旋转控制点
    }
    const defaultTextFontFamily = SIGN_TEXT_FONT_FAMILY_LIST[0]
    if (canvasObject.type === 'image') {
      const imgScale = isMobile ? 1 : 3 //移动端不需要缩放,因为屏幕已经很小了
      const image = new Image()
      image.src = canvasObject.value
      await new Promise<void>((resolve) => {
        image.onload = function () {
          // 将图片绘制到画布上
          const imgColor = findFirstNonTransparentPixel(image)
          const zoom = fabricCanvas.current.getZoom()
          const fabricImage = new fabric.Image(image, positionData)

          let scaleRatioWidth = 1
          let scaleRatioHeight = 1

          // 判断图片宽度是否过大
          if (
            fabricImage.width >
            (fabricCanvas.current.width * zoom) / imgScale
          ) {
            scaleRatioWidth =
              (fabricCanvas.current.width * zoom) / imgScale / fabricImage.width
          }

          // 判断图片高度是否过高
          if (
            fabricImage.height >
            (fabricCanvas.current.height * zoom) / imgScale
          ) {
            scaleRatioHeight =
              (fabricCanvas.current.height * zoom) /
              imgScale /
              fabricImage.height
          }

          // 选择最小的比例，以确保图片整体被缩小，且不会超出画布的宽度或高度
          const scaleRatio = Math.min(scaleRatioWidth, scaleRatioHeight)

          if (scaleRatio < 1) {
            //只有当需要缩放时才执行
            fabricImage.scaleX = parseFloat(scaleRatio.toFixed(2))
            fabricImage.scaleY = parseFloat(scaleRatio.toFixed(2))

            // 调整位置到鼠标中心，同时应用缩放比例
            fabricImage.left =
              positionData.left - fabricImage.getScaledWidth() / 2
            fabricImage.top =
              positionData.top - fabricImage.getScaledHeight() / 2
          } else {
            // 如果不需要缩放, 则只调整位置到鼠标中心
            fabricImage.left = positionData.left - fabricImage.width / 2
            fabricImage.top = positionData.top - fabricImage.height / 2
          }
          console.log('simply fabricImage', fabricImage)
            ; (fabricImage as any).imgColor = imgColor
          createObjectData = fabricImage
          resolve()
        }
      })
    } else if (canvasObject.type === 'text-box') {
      positionData.left = positionData.left - 300 / 2
      const text = new fabric.Textbox(fabricCanvas.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
        width: 300,
      })
      text.fontFamily = defaultTextFontFamily
      createObjectData = text
    } else if (canvasObject.type === 'text') {
      positionData.left = positionData.left - 50 / 2

      const text = new fabric.Text(fabricCanvas.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      })
      text.fontFamily = defaultTextFontFamily
      createObjectData = text
    } else if (canvasObject.type === 'i-text') {
      positionData.left = positionData.left - 200 / 2
      const isDateValid = dayjs(fabricCanvas.value).isValid()
      const text = new fabric.IText(fabricCanvas.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      })
      text.fontFamily = defaultTextFontFamily
        ; (text as any).isDateValid = isDateValid
      createObjectData = text
    }
    if (createObjectData) {
      ; (createObjectData as any).mtr = false
        ; (createObjectData as any).id = uuidV4()
      createObjectData.top = autoCheckTopIsAbnormal(
        fabricCanvas,
        positionData.top,
        createObjectData,
        isAutoObjectSizePosition,
      )
      createObjectData.setControlsVisibility({ mtr: false })
      fabricCanvas.current.add(createObjectData)
      fabricCanvas.current.setActiveObject(createObjectData) // 设置复制的对象为当前活动对象
      fabricCanvas?.current?.requestRenderAll() // 刷新画布以显示更改
      fabricCanvas?.current?.renderAll() // 确保变化被渲染
      return createObjectData
    } else {
      return null
    }
  } catch (e) {
    console.error('simply error', e)
  }
}
//复制操作
export const copyFabricSelectedObject = (editor) => {
  try {
    const canvas = editor
    const activeObject = canvas.getActiveObject()
    if (!activeObject) {
      console.log('没有选中的对象来复制')
      return
    }

    // 使用clone函数复制对象
    // 注意：对于某些特定类型的对象（如images），你可能需要使用activeObject.clone(function (clone) {...})
    activeObject.clone().then(function (clonedObj) {
      canvas.discardActiveObject() // 取消当前对象的选中状态
      clonedObj.setControlsVisibility({ mtr: false })
      // 设置对象的某些属性，以便复制的对象呈现在稍微不同的位置
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        hasRotatingPoint: false, // 禁用旋转控制点
      })

      // 如果复制的是一个组，我们需要逐一添加组内对象
      if (clonedObj.type === 'activeSelection') {
        // 对组内每个对象进行处理
        clonedObj.canvas = canvas
        clonedObj.forEachObject(function (objectInfo) {
          canvas.add(objectInfo)
        })

        // 根据复制的选择设置新的活动选择
        clonedObj.setCoords()
      } else {
        canvas.add(clonedObj) // 将复制的对象添加到画布上
      }

      canvas.setActiveObject(clonedObj) // 设置复制的对象为当前活动对象
      canvas?.requestRenderAll() // 请求重绘画布以显示更改
    })
  } catch (e) {
    console.log(e)
  }
}
//变更图片颜色
export const onChangeFabricColor = (editor: any, color) => {
  try {
    const fabricCanvas = editor
    const activeObject = fabricCanvas.getActiveObject()
    console.log('activeObject', activeObject, activeObject?.type)
    if (!activeObject) {
      console.log('没有选中的对象来复制')
      return
    }
    if (activeObject && activeObject.type === 'image') {
      ; (activeObject as any).getElement().onload = () => {
        // Access the internal _element where the actual HTMLImageElement resides
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = activeObject.width
        canvas.height = activeObject.height
        if (!ctx) return
        ctx.drawImage(
          activeObject.getElement(),
          0,
          0,
          activeObject.width,
          activeObject.height,
        )

        // Get the imageData
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          data[i + 1] = 0
          switch (color) {
            case 'black':
              data[i] = 0 // Red
              data[i + 2] = 0 // Blue
              break
            case 'red':
              data[i] = 255 // Red
              data[i + 2] = 0 // Blue
              break
            case 'blue':
              data[i] = 0 // Red
              data[i + 2] = 255 // Blue
              break
          }
        }

        // Put the manipulated data back to the context
        ctx.putImageData(imageData, 0, 0)

        // Update the Fabric.js image object with the new canvas
        const newImgElement = canvas.toDataURL()
        activeObject.setSrc(newImgElement)
        setTimeout(() => {
          fabricCanvas.renderAll()
        }, 50)
      }
      activeObject.imgColor = color
      if (!activeObject.getElement().complete) {
        // If the image has not been loaded yet, set the src to trigger loading
        activeObject.setSrc(activeObject.getSrc())
      } else {
        // Manually trigger the onload if the image is already loaded
        activeObject.getElement().onload()
      }
    } else {
      // 处理文本颜色变更
      activeObject.set('fill', color)
      fabricCanvas.renderAll() // 更新画布以显示颜色变更
    }
  } catch (e) {
    console.log(e)
  }
}
//变更文字颜色
export const onChangeFabricFontStyle = (
  editor,
  type,
  value?: number | string,
) => {
  try {
    const canvas = editor
    const activeObject = canvas.getActiveObject()
    console.log('activeObject', activeObject, activeObject.type)
    if (!activeObject) {
      console.log('没有选中的对象来复制')
      return
    }

    // 根据类型切换样式
    switch (type) {
      case 'fontWeightBold': {
        const currentWeight = activeObject.get('fontWeight')
        activeObject.set('fontWeight', currentWeight === 'bold' ? '' : 'bold')
        break
      }
      case 'underline': {
        const isUnderline = activeObject.get('underline')
        activeObject.set('underline', !isUnderline)
        break
      }
      case 'line_through': {
        const isLineThrough = activeObject.get('linethrough')
        activeObject.set('linethrough', !isLineThrough)
        break
      }
      case 'italic': {
        const currentStyle = activeObject.get('fontStyle')
        activeObject.set('fontStyle', currentStyle === 'italic' ? '' : 'italic')
        break
      }
      case 'textAlign':
        activeObject.set({ textAlign: value })
        break
      case 'opacity':
        activeObject.set({ opacity: value })
        break
      case 'fontFamily':
        activeObject.set('fontFamily', value)
        break
      case 'fontSize':
        activeObject.set('fontSize', value)
        break
      case 'backgroundColor':
        activeObject.set('backgroundColor', value)
        break
      case 'text':
        activeObject.set('text', value)
        break
      default:
        console.log('未知的样式类型:', type)
    }

    // 重新渲染画布
    canvas.renderAll()
  } catch (e) {
    console.log(e)
  }
}

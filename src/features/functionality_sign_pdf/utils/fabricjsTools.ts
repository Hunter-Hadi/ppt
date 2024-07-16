/* eslint-disable no-extra-semi */
import dayjs from 'dayjs'
import * as fabric from 'fabric'
import { FabricJSEditor } from 'fabricjs-react'
import { v4 as uuidV4 } from 'uuid'

import { SIGN_TEXT_FONT_FAMILY_LIST } from '../constant'
import { findFirstNonTransparentPixel } from './colorTools'

//自动的检查top是否超出画布范围
const autoCheckTopIsAbnormal = (
  editor,
  top: number,
  canvasObject: fabric.Object,
  isAutoObjectSizePosition?: boolean,
) => {
  let currentTop = top
  if (isAutoObjectSizePosition) {
    currentTop = top - (canvasObject.height * canvasObject.scaleX) / 2
  }
  if (currentTop < 0) {
    return 0
  } else if (currentTop + canvasObject.height > editor.current.height) {
    return editor.current.height - canvasObject.height
  }
  return currentTop
}
export type IFabricAddObjectType = 'image' | 'text-box' | 'text' | 'i-text'
//根据位置/信息添加Fabric对象
export const onFabricAddObject = async (
  editor,
  position: {
    left: number
    top: number
  },
  type: 'image' | 'text-box' | 'text' | 'i-text',
  value: string,
  isAutoObjectSizePosition?: boolean,
) => {
  try {
    console.log('editor', editor)
    if (!editor) return null
    let createObjectData: fabric.Object | null = null
    const positionData = {
      left: position.left,
      top: position.top,
      hasRotatingPoint: false, // 禁用旋转控制点
      lockRotation: true, // 锁定旋转
    }
    const defaultTextFontFamily = SIGN_TEXT_FONT_FAMILY_LIST[0]
    if (type === 'image') {
      const image = new Image()
      image.src = value
      await new Promise<void>((resolve) => {
        image.onload = function () {
          // 将图片绘制到画布上
          const imgColor = findFirstNonTransparentPixel(image)

          const fabricImage = new fabric.Image(image, positionData)

          let scaleRatioWidth = 1
          let scaleRatioHeight = 1

          // 判断图片宽度是否过大
          if (fabricImage.width > editor.current.width / 3) {
            scaleRatioWidth = editor.current.width / 3 / fabricImage.width
          }

          // 判断图片高度是否过高
          if (fabricImage.height > editor.current.height / 3) {
            scaleRatioHeight = editor.current.height / 3 / fabricImage.height
          }

          // 选择最小的比例，以确保图片整体被缩小，且不会超出画布的宽度或高度
          const scaleRatio = Math.min(scaleRatioWidth, scaleRatioHeight)
          console.log('simply scaleRatio', scaleRatio)
          if (scaleRatio < 1) {
            //只有当需要缩放时才执行
            fabricImage.scaleX = scaleRatio
            fabricImage.scaleY = scaleRatio

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

          ;(fabricImage as any).imgColor = imgColor
          createObjectData = fabricImage
          resolve()
        }
      })
    } else if (type === 'text-box') {
      positionData.left = positionData.left - 300 / 2
      const text = new fabric.Textbox(value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
        width: 300,
      })
      text.fontFamily = defaultTextFontFamily
      createObjectData = text
    } else if (type === 'text') {
      positionData.left = positionData.left - 50 / 2

      const text = new fabric.Text(value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      })
      text.fontFamily = defaultTextFontFamily
      createObjectData = text
    } else if (type === 'i-text') {
      positionData.left = positionData.left - 200 / 2
      const isDateValid = dayjs(value).isValid()
      const text = new fabric.IText(value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      })
      text.fontFamily = defaultTextFontFamily
      ;(text as any).isDateValid = isDateValid
      createObjectData = text
    }
    if (createObjectData) {
      ;(createObjectData as any).mtr = false
      ;(createObjectData as any).id = uuidV4()
      createObjectData.top = autoCheckTopIsAbnormal(
        editor,
        positionData.top,
        createObjectData,
        isAutoObjectSizePosition,
      )
      editor.current.add(createObjectData)
      editor.current.setActiveObject(createObjectData) // 设置复制的对象为当前活动对象
      editor?.canvas.requestRenderAll() // 刷新画布以显示更改
      editor?.canvas.renderAll() // 确保变化被渲染
      return createObjectData
    } else {
      return null
    }
  } catch (e) {
    console.error('simply error', e)
  }
}
//复制操作
export const copyFabricSelectedObject = (editor: FabricJSEditor) => {
  try {
    const canvas = editor?.canvas
    const activeObject = canvas.getActiveObject()
    if (!activeObject) {
      console.log('没有选中的对象来复制')
      return
    }

    // 使用clone函数复制对象
    // 注意：对于某些特定类型的对象（如images），你可能需要使用activeObject.clone(function (clone) {...})
    activeObject.clone(function (clonedObj) {
      canvas.discardActiveObject() // 取消当前对象的选中状态

      // 设置对象的某些属性，以便复制的对象呈现在稍微不同的位置
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        hasRotatingPoint: false, // 禁用旋转控制点
        lockRotation: true, // 锁定旋转
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
      canvas.requestRenderAll() // 请求重绘画布以显示更改
    })
  } catch (e) {
    console.log(e)
  }
}
//变更图片颜色
export const onChangeFabricColor = (editor: FabricJSEditor, color) => {
  try {
    const canvas = editor?.canvas
    const activeObject = canvas.getActiveObject()
    console.log('activeObject', activeObject, activeObject.type)
    if (!activeObject) {
      console.log('没有选中的对象来复制')
      return
    }
    if (activeObject && activeObject.type === 'image') {
      activeObject.getElement().onload = () => {
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
        activeObject.setSrc(newImgElement, () => {
          activeObject.canvas.renderAll()
        })
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
      canvas.renderAll() // 更新画布以显示颜色变更
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
    const canvas = editor?.canvas
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

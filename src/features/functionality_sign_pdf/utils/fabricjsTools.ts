import { fabric } from 'fabric';
import { FabricJSEditor } from "fabricjs-react";
import { v4 as uuidV4 } from 'uuid';

import { findFirstNonTransparentPixel } from "./colorTools";

export const onFabricAddObject = (editor, position: {
    left: number,
    top: number
}, type: string, value: string) => {
    try {
        if (!editor) return;
        const positionData = {
            left: position.left,
            top: position.top,
            hasRotatingPoint: false, // 禁用旋转控制点
            lockRotation: true, // 锁定旋转
        };
        const id = uuidV4();
        if (type === 'image') {
            const image = new Image();
            image.src = value;

            image.onload = function () {
                // 将图片绘制到画布上
                const imgColor = findFirstNonTransparentPixel(image);
                const fabricImage = new fabric.Image(image, positionData);
                fabricImage.imgColor = imgColor;

                fabricImage.uniqueKey = id;
                // 移除旋转控制点
                fabricImage.set('mtr', false);
                editor.canvas.add(fabricImage);
                editor.canvas.setActiveObject(fabricImage); // 设置复制的对象为当前活动对象
            };
        } else if (type === 'textbox') {
            positionData.left = positionData.left - 300 / 2;
            const text = new fabric.Textbox(value, {
                ...positionData,
                minScaleLimit: 1,
                maxScaleLimit: 1,
                width: 300,
            });
            text.uniqueKey = id;
            editor.canvas.add(text);
            editor.canvas.setActiveObject(text); // 设置复制的对象为当前活动对象
        } else if (type === 'text') {
            positionData.left = positionData.left - 50 / 2;
            const text = new fabric.Text(value, {
                ...positionData,
                minScaleLimit: 1,
                maxScaleLimit: 1,
            });
            text.uniqueKey = id;
            editor.canvas.add(text);
            editor.canvas.setActiveObject(text); // 设置复制的对象为当前活动对象
        } else if (type === 'i-text') {
            positionData.left = positionData.left - 200 / 2;
            const text = new fabric.IText(value, {
                ...positionData,
                minScaleLimit: 1,
                maxScaleLimit: 1,
            });
            text.uniqueKey = id;
            editor.canvas.add(text);
            editor.canvas.setActiveObject(text); // 设置复制的对象为当前活动对象
        }
        editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
        editor?.canvas.renderAll(); // 确保变化被渲染
    } catch (e) {
        console.error('simply error', e);
    }
};
//复制操作
export const copyFabricSelectedObject = (editor: FabricJSEditor) => {

    try {
        const canvas = editor?.canvas;
        const activeObject = canvas.getActiveObject();
        if (!activeObject) {
            console.log('没有选中的对象来复制');
            return;
        }

        // 使用clone函数复制对象
        // 注意：对于某些特定类型的对象（如images），你可能需要使用activeObject.clone(function (clone) {...})
        activeObject.clone(function (clonedObj) {
            canvas.discardActiveObject(); // 取消当前对象的选中状态

            // 设置对象的某些属性，以便复制的对象呈现在稍微不同的位置
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                hasRotatingPoint: false, // 禁用旋转控制点
                lockRotation: true, // 锁定旋转
            });

            // 如果复制的是一个组，我们需要逐一添加组内对象
            if (clonedObj.type === 'activeSelection') {
                // 对组内每个对象进行处理
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function (obj) {
                    canvas.add(obj);
                });

                // 根据复制的选择设置新的活动选择
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj); // 将复制的对象添加到画布上
            }

            canvas.setActiveObject(clonedObj); // 设置复制的对象为当前活动对象
            canvas.requestRenderAll(); // 请求重绘画布以显示更改
        });
    } catch (e) {
        console.log(e)
    }
};
//变更图片颜色
export const onChangeFabricColor = (editor: FabricJSEditor, color) => {
    try {
        const canvas = editor?.canvas;
        const activeObject = canvas.getActiveObject();
        console.log('activeObject', activeObject, activeObject.type)
        if (!activeObject) {
            console.log('没有选中的对象来复制');
            return;
        }
        if (activeObject && activeObject.type === 'image') {
            activeObject.getElement().onload = () => {
                // Access the internal _element where the actual HTMLImageElement resides
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = activeObject.width;
                canvas.height = activeObject.height;
                if (!ctx) return;
                ctx.drawImage(
                    activeObject.getElement(),
                    0,
                    0,
                    activeObject.width,
                    activeObject.height,
                );

                // Get the imageData
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    data[i + 1] = 0;
                    switch (color) {
                        case 'black':
                            data[i] = 0; // Red
                            data[i + 2] = 0; // Blue
                            break;
                        case 'red':
                            data[i] = 255; // Red
                            data[i + 2] = 0; // Blue
                            break;
                        case 'blue':
                            data[i] = 0; // Red
                            data[i + 2] = 255; // Blue
                            break;
                    }
                }

                // Put the manipulated data back to the context
                ctx.putImageData(imageData, 0, 0);

                // Update the Fabric.js image object with the new canvas
                const newImgElement = canvas.toDataURL();
                activeObject.setSrc(newImgElement, () => {
                    activeObject.canvas.renderAll();
                });
            };
            activeObject.imgColor = color
            if (!activeObject.getElement().complete) {
                // If the image has not been loaded yet, set the src to trigger loading
                activeObject.setSrc(activeObject.getSrc());
            } else {
                // Manually trigger the onload if the image is already loaded
                activeObject.getElement().onload();
            }
        } else {
            // 处理文本颜色变更
            activeObject.set('fill', color);
            canvas.renderAll(); // 更新画布以显示颜色变更

        }
    } catch (e) {
        console.log(e)
    }
};
//变更文字颜色
export const onChangeFabricFontStyle = (editor, type) => {
    try {
        const canvas = editor?.canvas;
        const activeObject = canvas.getActiveObject();
        console.log('activeObject', activeObject, activeObject.type);
        if (!activeObject) {
            console.log('没有选中的对象来复制');
            return;
        }

        // 根据类型切换样式
        switch (type) {
            case 'fontWeightBold':
                const currentWeight = activeObject.get('fontWeight');
                activeObject.set('fontWeight', currentWeight === 'bold' ? '' : 'bold');
                break;
            case 'underline':
                const isUnderline = activeObject.get('underline');
                activeObject.set('underline', !isUnderline);
                break;
            case 'line_through':
                const isLinethrough = activeObject.get('linethrough');
                activeObject.set('linethrough', !isLinethrough);
                break;
            case 'italic':
                const currentStyle = activeObject.get('fontStyle');
                activeObject.set('fontStyle', currentStyle === 'italic' ? '' : 'italic');
                break;
            case 'textAlignCenter':
                activeObject.set({ textAlign: 'center' });
                break;
            case 'textAlignLeft':
                activeObject.set({ textAlign: 'left' });
                break;
            case 'textAlignRight':
                activeObject.set({ textAlign: 'right' });
                break;
            default:
                console.log('未知的样式类型:', type);
        }

        // 重新渲染画布
        canvas.renderAll();
    } catch (e) {
        console.log(e);
    }
};
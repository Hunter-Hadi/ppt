import { Box } from '@mui/material';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { FC, useEffect, useRef, useState } from 'react';

import { ISignData } from '../../FunctionalitySignPdfDetail';

interface IFunctionalitySignPdfShowPdfCanvasProps {
  signaturePositions: ISignData[];
}
export const FunctionalitySignPdfShowPdfCanvas: FC<
  IFunctionalitySignPdfShowPdfCanvasProps
> = ({ signaturePositions }) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const divRef = useRef<any>(null);
  const [scaleFactor, setScaleFactor] = useState(1); // Current scale factor
  const [width, setWidth] = useState(1); // Current scale factor
  const [height, setHeight] = useState(1); // Current scale factor
  useEffect(() => {
    // 键盘事件监听器
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        editor?.deleteSelected();
      }
    };
    // 添加事件监听
    window.addEventListener('keydown', handleKeyDown);

    // 清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event) => {
    console.log('用户按下了回车键', event);
  };
  useEffect(() => {
    try {
      //初始化画布高度宽度
      if (!editor?.canvas || !divRef.current) return;
      let originalWidth = divRef.current.clientWidth; // Get initial canvas width
      let originalHeight = divRef.current.clientHeight; // Get initial canvas width

      editor.canvas.setDimensions({
        width: originalWidth,
        height: originalHeight,
      });
      setWidth(originalWidth);
      setHeight(divRef.current.clientHeight);
      let scaleFactor = 1; // Current scale factor
      const resizeCanvas = () => {
        //自适应缩放
        let newWidth = divRef.current.clientWidth;
        scaleFactor = newWidth / originalWidth; // Calculate new scale factor
        console.log('simply scaleFactor', originalWidth, newWidth, scaleFactor);
        setScaleFactor(parseFloat(scaleFactor.toFixed(3)));
      };
      const resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(divRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    } catch (e) {
      console.error('simply error', e);
    }
  }, [divRef, editor]);

  useEffect(() => {
    console.log('simply selectedObjects', selectedObjects);
    console.log('simply editor', editor?.canvas);
  }, [selectedObjects]);
  useEffect(() => {
    if (signaturePositions.length > 0 && editor) {
      /**
       * Unique key to identify text object instances.
       * @type {String}
       */
      //添加，这里应该加个是否已经存在的判断
      signaturePositions.forEach((signaturePosition) => {
        if (signaturePosition.data.type === 'base64') {
          const image = new Image();
          image.src = signaturePosition.data.value;
          var text = new fabric.IText('这里是可编辑的文字', {
            left: 50, // 设置文字的起始位置
            top: 50, // 设置文字的起始顶部位置
            fontSize: 20, // 设置字体大小
            fill: '#333', // 设置文字颜色
          });
          text.uniqueKey = 'unique_key_' + fabric.Object.__uid++;

          editor.canvas.add(text); // 将文字添加到 canvas 中
          image.onload = function () {
            const fabricImage = new fabric.Image(image);
            fabricImage.set({
              left: signaturePosition.x / scaleFactor,
              top: signaturePosition.y / scaleFactor,
            });
            fabricImage.uniqueKey = 'unique_key_' + fabric.Object.__uid++;
            editor.canvas.add(fabricImage);
          };
        } else if (signaturePosition.data.type === 'text') {
          const text = new fabric.IText(signaturePosition.data.value, {
            left: signaturePosition.x / scaleFactor,
            top: signaturePosition.y / scaleFactor,
          });
          text.uniqueKey = 'unique_key_' + fabric.Object.__uid++;
          editor.canvas.add(text);
        }
      });
    }
  }, [signaturePositions, editor]);
  return (
    <Box
      onKeyDown={handleKeyDown}
      sx={{
        width: '100%',
        height: '100%',
      }}
      ref={divRef}
    >
      <Box
        sx={{
          width: width || '100%',
          height: height || '100%',
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '2px solid red',
        }}
      >
        <FabricJSCanvas className='sample-canvas-1' onReady={onReady} />
      </Box>
    </Box>
  );
};

import { Box } from '@mui/material';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { FC, useEffect } from 'react';

import { ISignData } from '../../components/FunctionalitySignPdfDetail';

interface IFunctionalitySignPdfShowPdfCanvasProps {
  signaturePositions: ISignData[];
}

export const FunctionalitySignPdfShowPdfCanvas: FC<
  IFunctionalitySignPdfShowPdfCanvasProps
> = ({ signaturePositions }) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();

  const handleKeyDown = (event) => {
    console.log('用户按下了回车键', event);
  };
  useEffect(() => {
    console.log('simply selectedObjects', selectedObjects);
    console.log('simply editor', editor?.canvas);
  }, [selectedObjects]);
  useEffect(() => {
    if (signaturePositions.length > 0 && editor) {
      editor.canvas?.setWidth(1080);
      editor.canvas?.setHeight(698);
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
          editor.canvas.add(text); // 将文字添加到 canvas 中
          image.onload = function () {
            const fabricImage = new fabric.Image(image);
            fabricImage.set({
              left: signaturePosition.x,
              top: signaturePosition.y,
            });
            editor.canvas.add(fabricImage);
          };
        } else if (signaturePosition.data.type === 'text') {
          const text = new fabric.IText(signaturePosition.data.value, {
            left: signaturePosition.x,
            top: signaturePosition.y,
          });
          editor.canvas.add(text);
        }
      });
    }
  }, [signaturePositions, editor]);
  return (
    <Box onKeyDown={handleKeyDown}>
      <FabricJSCanvas className='sample-canvas-1' onReady={onReady} />
    </Box>
  );
};

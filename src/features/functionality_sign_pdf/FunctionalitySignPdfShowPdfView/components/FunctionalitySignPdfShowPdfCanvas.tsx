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
  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };
  useEffect(() => {
    if (signaturePositions.length > 0 && editor) {
      editor.canvas?.setWidth(1080);
      editor.canvas?.setHeight(600);
      signaturePositions.forEach((signaturePosition) => {
        if (signaturePosition.data.type === 'base64') {
          const image = new Image();
          image.src = signaturePosition.data.value;
          var text = new fabric.IText('这里是可编辑的文字', {
            left: 100, // 设置文字的起始位置
            top: 100, // 设置文字的起始顶部位置
            fontSize: 20, // 设置字体大小
            fill: '#333', // 设置文字颜色
          });
          editor.canvas.Add(text); // 将文字添加到 canvas 中
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
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className='sample-canvas' onReady={onReady} />
    </div>
  );
};

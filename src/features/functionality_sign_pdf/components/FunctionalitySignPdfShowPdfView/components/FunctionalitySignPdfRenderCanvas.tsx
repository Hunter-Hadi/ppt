import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
  copySelectedObject,
  onChangeImageColor,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools';

import { ISignData } from '../../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
import FunctionalitySignPdfColorButtonPopover from '../../FunctionalitySignPdfOperationView/components/FunctionalitySignPdfColorButtonPopover';

interface IFunctionalitySignPdfShowPdfCanvasProps {
  renderList: ISignData[];
  canvasIndex: number;
  sizeInfo: {
    width: number;
    height: number;
  };
}
const FunctionalitySignPdfRenderCanvas: FC<
  IFunctionalitySignPdfShowPdfCanvasProps
> = ({ renderList, canvasIndex, sizeInfo }) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const divRef = useRef<any>(null);
  const [scaleFactor, setScaleFactor] = useState(1); // Current scale factor
  const [canvasRenderList, serCanvasRenderList] = useState<string[]>([]);
  const [controlDiv, setControlDiv] = useState({
    display: 'none',
    left: 0,
    top: 0,
  });
  const newRenderList = useMemo(() => {
    return renderList.filter((signaturePosition) => {
      return !canvasRenderList.find((item) => item === signaturePosition.id);
    });
  }, [canvasRenderList, renderList]);
  useEffect(() => {
    // 键盘事件监听器
    if (editor) {
      const handleKeyDown = (event) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
          var activeObjects = editor?.canvas.getActiveObjects();
          if (activeObjects.length) {
            // 循环并逐个移除
            activeObjects.forEach(function (object) {
              editor?.canvas.remove(object);
            });
          }
          editor?.canvas.discardActiveObject(); // 取消选中状态
          editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
        }
      };
      // 添加事件监听
      window.addEventListener('keydown', handleKeyDown);
      // 清理函数
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [editor]);
  // 当对象被选中或移动时调用
  const handleObjectSelected = (object?: any) => {
    try {
      if (object) {
        setControlDiv({
          display: 'block',
          left: object.left,
          top: object.top - 45,
        });
      } else {
        setControlDiv({
          display: 'none',
          left: 0,
          top: 0,
        });
      }
    } catch (e) {
      console.log('simply error', e);
    }
  };
  useEffect(() => {
    console.log('simply editor', editor);
    if (editor) {
      // 对象选中监听
      editor.canvas.on('selection:created', function (event) {
        // console.log('simply before:selection', event);
        if (event.selected.length === 1) {
          handleObjectSelected(event.selected[0]);
        }
      });

      // 对象移动监听 - 保证操作div跟随移动
      editor.canvas.on('object:moving', function (e) {
        // console.log('simply object:moving', e);
        handleObjectSelected(e.target);

        let padding = 0; // 内容距离画布的空白宽度，主动设置
        var obj = e.target;
        if (
          obj.currentHeight > obj.canvas.height - padding * 2 ||
          obj.currentWidth > obj.canvas.width - padding * 2
        ) {
          return;
        }
        obj.setCoords();
        if (
          obj.getBoundingRect().top < padding ||
          obj.getBoundingRect().left < padding
        ) {
          obj.top = Math.max(
            obj.top,
            obj.top - obj.getBoundingRect().top + padding,
          );
          obj.left = Math.max(
            obj.left,
            obj.left - obj.getBoundingRect().left + padding,
          );
        }
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height >
            obj.canvas.height - padding ||
          obj.getBoundingRect().left + obj.getBoundingRect().width >
            obj.canvas.width - padding
        ) {
          obj.top = Math.min(
            obj.top,
            obj.canvas.height -
              obj.getBoundingRect().height +
              obj.top -
              obj.getBoundingRect().top -
              padding,
          );
          obj.left = Math.min(
            obj.left,
            obj.canvas.width -
              obj.getBoundingRect().width +
              obj.left -
              obj.getBoundingRect().left -
              padding,
          );
        }
      });
      // 对象移动监听 - 保证操作div跟随移动
      editor.canvas.on('object:scaling', function (e) {
        // console.log('simply object:scaling', e);
        handleObjectSelected(e.target);
      });

      // 确保再次选择时移动操作div
      editor.canvas.on('selection:updated', function (event) {
        // console.log('simply object:updated', event);
        if (event.selected.length === 1) {
          handleObjectSelected(event.selected[0]);
        }
      });
      // 确保再次选择时移动操作div
      editor.canvas.on('selection:cleared', function (event) {
        console.log('simply object:updated', event);
        handleObjectSelected();
      });
    }
  }, [editor]);
  useEffect(() => {
    try {
      //初始化画布高度宽度
      if (!editor?.canvas || !divRef.current) return;
      editor.canvas.setDimensions({
        width: sizeInfo.width,
        height: sizeInfo.height,
      });
      let scaleFactor = 1; // Current scale factor
      const resizeCanvas = () => {
        //自适应缩放
        let newWidth = divRef.current.clientWidth;
        scaleFactor = newWidth / sizeInfo.width; // Calculate new scale factor
        setScaleFactor(parseFloat(scaleFactor.toFixed(3)));
      };
      const resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(divRef.current);
      resizeCanvas();
      return () => {
        resizeObserver.disconnect();
      };
    } catch (e) {
      console.error('simply error', e);
    }
  }, [divRef, editor, sizeInfo]);

  useEffect(() => {
    if (newRenderList.length > 0 && editor) {
      /**
       * Unique key to identify text object instances.
       * @type {String}
       */
      //添加，这里应该加个是否已经存在的判断
      newRenderList.forEach((signaturePosition) => {
        const existingImage = editor.canvas
          .getObjects()
          .find((obj) => obj.uniqueKey === signaturePosition.id);
        if (existingImage) return;
        serCanvasRenderList((list) => [...list, signaturePosition.id]);
        const positionData = {
          left: signaturePosition.x / scaleFactor,
          top: Math.max(signaturePosition.y / scaleFactor, 0),
          hasRotatingPoint: false, // 禁用旋转控制点
          lockRotation: true, // 锁定旋转
        };
        if (signaturePosition.data.type === 'base64') {
          const image = new Image();
          image.src = signaturePosition.data.value;

          image.onload = function () {
            const fabricImage = new fabric.Image(image, positionData);
            // 检查图像宽度，如果需要则调整大小
            if (fabricImage.width > sizeInfo.width / 2) {
              // 调整尺寸，使用 scale 代替直接设置 width 和 height
              let scaleRatio = sizeInfo.width / 2 / fabricImage.width;
              fabricImage.scaleX = scaleRatio;
              fabricImage.scaleY = scaleRatio;
            }
            fabricImage.uniqueKey = signaturePosition.id;
            editor.canvas.add(fabricImage);
          };
        } else if (signaturePosition.data.type === 'text') {
          const text = new fabric.IText(
            signaturePosition.data.value,
            positionData,
          );
          text.uniqueKey = signaturePosition.id;
          editor.canvas.add(text);
        }
      });
    }
  }, [newRenderList, editor]);
  const onChangeColor = (color) => {
    if (editor) {
      onChangeImageColor(editor, color);
    }
  };
  const onCopySelectedObject = () => {
    if (editor) {
      copySelectedObject(editor);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
      ref={divRef}
    >
      <Box
        sx={{
          width: sizeInfo.width || '100%',
          height: sizeInfo.height || '100%',
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
          position: 'relative',
        }}
      >
        <FabricJSCanvas
          className={`sample-canvas-${canvasIndex}`}
          onReady={onReady}
        />
        {selectedObjects?.length === 1 && (
          <Stack
            sx={{
              position: 'absolute',
              width: 200,
              display: controlDiv.display,
              left: controlDiv.left,
              top: controlDiv.top,
            }}
          >
            <ButtonGroup
              variant='outlined'
              sx={{
                bgcolor: '#fafafa',
              }}
              aria-label='Basic button group'
            >
              <FunctionalitySignPdfColorButtonPopover
                onSelectedColor={onChangeColor}
              />
              <Button onClick={onCopySelectedObject}>
                <FunctionalitySignPdfIcon name='ContentCopy' />
              </Button>
              <Button onClick={() => editor?.deleteSelected()}>
                <FunctionalitySignPdfIcon name='DeleteForeverOutlined' />
              </Button>
            </ButtonGroup>
          </Stack>
        )}
      </Box>
    </Box>
  );
};
export default FunctionalitySignPdfRenderCanvas;

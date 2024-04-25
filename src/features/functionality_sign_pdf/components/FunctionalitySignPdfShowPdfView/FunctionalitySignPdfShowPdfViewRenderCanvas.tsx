import { Box } from '@mui/material';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { findFirstNonTransparentPixel } from '../../utils/colorTools';
import FunctionalitySignPdfShowPdfViewObjectTools from './FunctionalitySignPdfShowPdfViewObjectTools';
export interface IControlDiv {
  left: number;
  top: number;
  windowLeft: number;
  windowTop: number;
}
export type ICanvasObjectData = {
  x?: number;
  y?: number;
  id: string;
  type: string;
  value: string;
};
export interface IFunctionalitySignPdfShowPdfCanvasHandles {
  onAddObject?: (canvasObject: ICanvasObjectData) => void;
}
interface IFunctionalitySignPdfShowPdfCanvasProps {
  renderList?: ICanvasObjectData[];
  canvasIndex: number;
  sizeInfo: {
    width: number;
    height: number;
  };
}
/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalitySignPdfShowPdfViewRenderCanvas: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfCanvasHandles,
  IFunctionalitySignPdfShowPdfCanvasProps
> = ({ canvasIndex, sizeInfo }, handleRef) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const topWrapRef = useRef<HTMLElement | null>(null);
  const [scaleFactor, setScaleFactor] = useState(1); // Current scale factor
  const [controlDiv, setControlDiv] = useState<IControlDiv | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null); // 当前选中对象
  useImperativeHandle(
    handleRef,
    () => ({
      onAddObject: onAddObject,
    }),
    [],
  );
  useEffect(() => {
    // 键盘事件监听器
    if (editor) {
      const handleKeyDown = (event) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
          var activeObjects = editor?.canvas.getActiveObjects();
          if (activeObjects.length !== 1) {
            // 循环并逐个移除
            activeObjects.forEach(function (object) {
              editor?.canvas.remove(object);
            });
            editor?.canvas.discardActiveObject(); // 取消选中状态
            editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
          }
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
  const onAddObject = (canvasObject: ICanvasObjectData) => {
    console.log('simply canvasObject', canvasObject);
    if (!editor) return;
    const centerX = sizeInfo && sizeInfo?.width / 2; //没有就默认居中
    const centerY = sizeInfo && sizeInfo?.height / 2;
    const positionData = {
      left: canvasObject.x ? canvasObject.x / scaleFactor : centerX,
      top: canvasObject.y ? Math.max(canvasObject.y / scaleFactor, 0) : centerY,
      hasRotatingPoint: false, // 禁用旋转控制点
      lockRotation: true, // 锁定旋转
    };
    if (canvasObject.type === 'image') {
      const image = new Image();
      image.src = canvasObject.value;

      image.onload = function () {
        // 将图片绘制到画布上
        const imgColor = findFirstNonTransparentPixel(image);

        const fabricImage = new fabric.Image(image, positionData);
        if (fabricImage.width > sizeInfo.width / 2) {
          // 过大进行 调整尺寸，使用 scale 代替直接设置 width 和 height
          let scaleRatio = sizeInfo.width / 2 / fabricImage.width;
          fabricImage.scaleX = scaleRatio;
          fabricImage.scaleY = scaleRatio;
          fabricImage.left =
            positionData.left - (fabricImage.width * scaleRatio) / 2;
          fabricImage.top =
            positionData.top - (fabricImage.height * scaleRatio) / 2; //调整位置到鼠标中心
        } else {
          fabricImage.left = positionData.left - fabricImage.width / 2; //调整位置到鼠标中心
        }
        fabricImage.imgColor = imgColor;

        fabricImage.uniqueKey = canvasObject.id;
        editor.canvas.add(fabricImage);
      };
    } else if (canvasObject.type === 'textbox') {
      positionData.left = positionData.left - 300 / 2;
      const text = new fabric.Textbox(canvasObject.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
        width: 300,
      });
      text.uniqueKey = canvasObject.id;
      editor.canvas.add(text);
    } else if (canvasObject.type === 'text') {
      positionData.left = positionData.left - 50 / 2;
      const text = new fabric.Text(canvasObject.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      });
      text.uniqueKey = canvasObject.id;
      editor.canvas.add(text);
    } else if (canvasObject.type === 'i-text') {
      positionData.left = positionData.left - 200 / 2;
      const text = new fabric.IText(canvasObject.value, {
        ...positionData,
        minScaleLimit: 1,
        maxScaleLimit: 1,
      });
      text.uniqueKey = canvasObject.id;
      editor.canvas.add(text);
    }
    editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
  };
  const handleObjectSelected = (object?: fabric.Object) => {
    try {
      setActiveObject(object);
      if (object) {
        const topWrapRefRect = topWrapRef.current?.getBoundingClientRect();

        setControlDiv({
          left: object.left,
          top: object.top,
          windowLeft: topWrapRefRect?.x || 0,
          windowTop: topWrapRefRect?.y || 0,
        });
      } else {
        setControlDiv(null);
      }
    } catch (e) {
      console.log('simply error', e);
    }
  };
  useEffect(() => {
    if (editor) {
      // 对象选中监听
      editor.canvas.on('selection:created', function (event) {
        console.log('simply before:selection', event);
        if (event.selected.length === 1) {
          handleObjectSelected(event.selected[0]);
        }
      });

      editor.canvas.on('object:moving', function (e) {
        // 对象移动监听 - 保证操作div跟随移动

        handleObjectSelected(e.target);
        //保持移动不出画布
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
        handleObjectSelected(e.target);
      });

      // 确保再次选择时移动操作div
      editor.canvas.on('selection:updated', function (event) {
        if (event.selected.length === 1) {
          handleObjectSelected(event.selected[0]);
        }
      });
      // 确保再次选择时移动操作div
      editor.canvas.on('selection:cleared', function (event) {
        handleObjectSelected();
      });
    }
  }, [editor]);
  useEffect(() => {
    try {
      //初始化画布高度宽度
      if (!editor?.canvas || !topWrapRef.current) return;
      editor.canvas.setDimensions({
        width: sizeInfo.width,
        height: sizeInfo.height,
      });
      let scaleFactor = 1; // Current scale factor
      const resizeCanvas = () => {
        //自适应缩放
        let newWidth = topWrapRef.current?.clientWidth;
        if (newWidth) {
          scaleFactor = newWidth / sizeInfo.width; // Calculate new scale factor
          setScaleFactor(parseFloat(scaleFactor.toFixed(3)));
        }
      };
      const resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(topWrapRef.current);
      resizeCanvas();
      return () => {
        resizeObserver.disconnect();
      };
    } catch (e) {
      console.error('simply error', e);
    }
  }, [topWrapRef, editor, sizeInfo]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
      ref={topWrapRef}
    >
      <Box
        sx={{
          width: sizeInfo?.width || '100%',
          height: sizeInfo?.height || '100%',
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
        }}
      >
        <FabricJSCanvas
          className={`sample-canvas-${canvasIndex}`}
          onReady={onReady}
        />
      </Box>
      {selectedObjects?.length === 1 && controlDiv && (
        <FunctionalitySignPdfShowPdfViewObjectTools
          key={activeObject.uniqueKey}
          controlDiv={{ ...controlDiv }}
          scaleFactor={scaleFactor}
          editor={editor}
        />
      )}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfShowPdfViewRenderCanvas);

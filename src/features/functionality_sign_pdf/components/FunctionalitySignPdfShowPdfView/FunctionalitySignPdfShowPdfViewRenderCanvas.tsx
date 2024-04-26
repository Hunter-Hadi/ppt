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

import { onFabricAddObject } from '../../utils/fabricjsTools';
import FunctionalitySignPdfShowPdfViewAddToolsPopup from './FunctionalitySignPdfShowPdfViewAddToolsPopup';
import FunctionalitySignPdfShowPdfViewObjectToolsPopup from './FunctionalitySignPdfShowPdfViewObjectToolsPopup';
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
  onDiscardActiveObject: () => void;
  onAddObject?: (canvasObject: ICanvasObjectData) => void;
}
interface IFunctionalitySignPdfShowPdfCanvasProps {
  renderList?: ICanvasObjectData[];
  canvasIndex: number;
  sizeInfo: {
    width: number;
    height: number;
  };
  topScrollKey: number;
}
/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalitySignPdfShowPdfViewRenderCanvas: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfCanvasHandles,
  IFunctionalitySignPdfShowPdfCanvasProps
> = ({ canvasIndex, sizeInfo, topScrollKey }, handleRef) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const topWrapRef = useRef<HTMLElement | null>(null);
  const previousIsSelection = useRef<boolean>(false); //上一次点击是否是选中
  const [windowScrollKey, setWindowScrollKey] = useState(0); // Current scale factor

  const [scaleFactor, setScaleFactor] = useState(1); // Current scale factor
  const [controlDiv, setControlDiv] = useState<IControlDiv | null>(null); // 当前选中对象的位置
  const [controlAddNewDiv, setControlAddNewDiv] = useState<IControlDiv | null>(
    null,
  ); // 当前选中对象的位置

  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null); // 当前选中对象信息

  useEffect(() => {
    const handleScroll = () => {
      setWindowScrollKey(new Date().valueOf());
    };
    window.addEventListener('scroll', handleScroll);
    // 键盘事件监听器
    if (editor) {
      const handleKeyDown = (event) => {
        // 检查当前焦点元素
        const activeElement = document.activeElement;
        const isInputFocused =
          activeElement &&
          (activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA');

        // 如果当前焦点在输入框内，退出函数，不执行后续的删除逻辑
        if (isInputFocused) {
          return;
        }

        // 您原有的删除逻辑
        if (event.key === 'Delete' || event.key === 'Backspace') {
          const activeObjects = editor?.canvas.getActiveObjects();
          if (activeObjects.length !== 0) {
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
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [editor]);
  useEffect(() => {
    //滚动后取消一些事件
    if (activeObject) {
      setControlDiv(null);
      editor?.canvas.discardActiveObject(); // 取消选中状态
      editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
    }
    previousIsSelection.current = false;
    setControlAddNewDiv(null);
  }, [topScrollKey, windowScrollKey]);
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
    try {
      if (editor) {
        fabric.Object.prototype.set({
          borderColor: '#9065B0',
          cornerColor: '#9065B0', //激活状态角落图标的填充颜色
          cornerStrokeColor: '', //激活状态角落图标的边框颜色
          borderScaleFactor: 1,
          cornerSize: 8,
          transparentCorners: false, //激活状态角落的图标是否透明
          selectionDashArray: [5, 5],
        });
        // 对象选中监听
        editor.canvas.on('mouse:up', function (event) {
          const canvas = editor?.canvas;
          const activeObject = canvas.getActiveObject();
          console.log('simply activeObject', !!activeObject);
          if (activeObject) {
            previousIsSelection.current = true;
            setControlAddNewDiv(null);
            return;
          }
          if (previousIsSelection.current) {
            previousIsSelection.current = false;
            setControlAddNewDiv(null);
            return;
          }
          previousIsSelection.current = true;
          const topWrapRefRect = topWrapRef.current?.getBoundingClientRect();
          setControlAddNewDiv((data) => {
            if (data) return null;
            return {
              left: event.pointer.x,
              top: event.pointer.y,
              windowLeft: topWrapRefRect?.x || 0,
              windowTop: topWrapRefRect?.y || 0,
            };
          });
        });
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
          const obj = e.target;
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
    } catch (e) {
      console.log('error', e);
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
  // 当对象被选中或移动时调用
  const onAddObject = (canvasObject: ICanvasObjectData) => {
    try {
      console.log('simply canvasObject', canvasObject);
      if (!editor) return;
      setControlAddNewDiv(null);
      const centerX = sizeInfo && sizeInfo?.width / 2; //没有就默认居中
      const centerY = sizeInfo && sizeInfo?.height / 2;
      const positionData = {
        left: canvasObject.x ? canvasObject.x / scaleFactor : centerX,
        top: canvasObject.y
          ? Math.max(canvasObject.y / scaleFactor, 0)
          : centerY,
      };
      onFabricAddObject(
        editor,
        positionData,
        canvasObject.type,
        canvasObject.value,
      );
    } catch (e) {
      console.error('simply error', e);
    }
  };
  useImperativeHandle(
    handleRef,
    () => ({
      onDiscardActiveObject: () => {
        editor?.canvas.discardActiveObject(); // 取消选中状态
        editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
      },
      onAddObject: onAddObject,
    }),
    [],
  );
  const onCloseAddToolsPopup = (type: string, value: string) => {
    setControlAddNewDiv(null);
  };
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
        <FunctionalitySignPdfShowPdfViewObjectToolsPopup
          key={activeObject.uniqueKey}
          controlDiv={controlDiv}
          scaleFactor={scaleFactor}
          editor={editor}
        />
      )}
      {controlAddNewDiv && (
        <FunctionalitySignPdfShowPdfViewAddToolsPopup
          controlDiv={controlAddNewDiv}
          scaleFactor={scaleFactor}
          editor={editor}
          onClose={onCloseAddToolsPopup}
        />
      )}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfShowPdfViewRenderCanvas);

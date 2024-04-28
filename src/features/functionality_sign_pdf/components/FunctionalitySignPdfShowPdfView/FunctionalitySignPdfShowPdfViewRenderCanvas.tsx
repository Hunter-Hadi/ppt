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
import { v4 as uuidV4 } from 'uuid';

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
  onAddObject?: (
    canvasObject?: ICanvasObjectData,
    object?: fabric.Object,
  ) => void;
}
interface IFunctionalitySignPdfShowPdfCanvasProps {
  renderList?: ICanvasObjectData[];
  canvasIndex: number;
  canvasNumber: number;
  sizeInfo: {
    width: number;
    height: number;
  };
  topScrollKey: number;
  addIndexObject?: (object: fabric.Object, index: number) => void; //通知父级添加对象
}
/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalitySignPdfShowPdfViewRenderCanvas: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfCanvasHandles,
  IFunctionalitySignPdfShowPdfCanvasProps
> = (
  { canvasIndex, sizeInfo, topScrollKey, addIndexObject, canvasNumber },
  handleRef,
) => {
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
  const deleteObjectKey = useRef<string[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      //监听窗口滚动，关闭菜单
      //因为做跟随窗口滚动的菜单，功能比较复杂，目前没有必要
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
    //选中对象时调用，更新操作div位置
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
  //检查是否移动到另一个画布
  const checkAndMoveToAnotherCanvas = (obj) => {
    // 假定canvasIndex和fabricList已经定义并可用
    if (deleteObjectKey.current.includes(obj.uniqueKey)) return;

    const canvasBounds = {
      height: editor?.canvas.height,
    };
    const objBounds = obj.getBoundingRect();
    console.log('canvasBounds', canvasBounds, objBounds);

    let addPositionType: null | 'top' | 'bottom' = null;
    // 检查是否移动到了上面的边缘
    if (objBounds.top < -50 && canvasIndex !== 0) {
      addPositionType = 'top';
    }
    // 检查是否移动到了下面的边缘
    else if (
      objBounds.top + objBounds.height > canvasBounds.height + 50 &&
      canvasIndex !== canvasNumber - 1
    ) {
      addPositionType = 'bottom';
    }
    // 如果确定要移动到另一个画布
    if (addPositionType !== null) {
      moveToAnotherCanvas(obj, addPositionType);
    }
  };
  //移动到另一个画布
  const moveToAnotherCanvas = (
    obj,
    addPositionType: 'top' | 'bottom' = 'top',
  ) => {
    // 从当前画布删除对象
    console.log(
      'simply moveToAnotherCanvas',
      canvasIndex,
      addPositionType,
      obj,
    );

    if (deleteObjectKey.current.includes(obj.uniqueKey)) return; //已经删除的对象不再处理
    deleteObjectKey.current.push(obj.uniqueKey);
    obj.canvas.remove(obj);
    // 获取目标画布
    setWindowScrollKey(new Date().valueOf());
    if (addPositionType === 'bottom') {
      obj.set('top', 0);
      obj.top = 0;
      console.log('simply ------------', addPositionType, obj);
      // 现在，克隆这个对象
      obj.clone(function (clone) {
        // 设置克隆对象的一些属性，以便可以区分原对象和克隆对象
        clone.set({
          top: 0,
        });
        console.log('simply ------------', addPositionType, clone);

        addIndexObject && addIndexObject(clone, canvasIndex + 1);
      });
    } else if (addPositionType === 'top') {
      obj.clone(function (clone) {
        // 设置克隆对象的一些属性，以便可以区分原对象和克隆对象
        clone.set({
          top: editor?.canvas.height - obj.height * obj.scaleY,
        });
        console.log('simply ------------', addPositionType, clone);

        addIndexObject && addIndexObject(clone, canvasIndex - 1);
      });
    }
  };

  //控制边界，不超过画布
  const constrainWithinCanvas = (obj, padding = 0) => {
    if (!obj.canvas) return;
    if (
      obj.currentHeight > obj.canvas.height - padding * 2 ||
      obj.currentWidth > obj.canvas.width - padding * 2
    ) {
      return;
    }
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
  };
  useEffect(() => {
    //初始化画布
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
          console.log('simply mouse:up', event);
          if (event.target) {
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
          setControlAddNewDiv(() => {
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
          console.log('simply before:created', event);
          if (event.selected.length === 1) {
            handleObjectSelected(event.selected[0]);
          }
        });

        editor.canvas.on('object:moving', function (e) {
          console.log('simply object:moving-----', e);
          // 对象移动监听 - 保证操作div跟随移动
          handleObjectSelected(e.target);
          const obj = e.target;
          obj.setCoords();
          constrainWithinCanvas(obj);

          checkAndMoveToAnotherCanvas(obj);
        });
        // 对象移动监听 - 保证操作div跟随移动
        editor.canvas.on('object:scaling', function (e) {
          console.log('simply object:scaling');

          handleObjectSelected(e.target);
        });

        // 确保再次选择时移动操作div
        editor.canvas.on('selection:updated', function (event) {
          console.log('simply selection:updated', event);

          if (event.selected.length === 1) {
            handleObjectSelected(event.selected[0]);
          }
        });
        // 确保再次选择时移动操作div
        editor.canvas.on('selection:cleared', function (event) {
          console.log('simply selection:cleared', event);

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
  // 添加签名对象
  const onAddObject = async (
    canvasObject?: ICanvasObjectData,
    object?: fabric.Object,
  ) => {
    try {
      console.log('simply canvasObject', canvasIndex, canvasObject, object);
      if (!editor) return;
      if (object) {
        topWrapRef.current?.focus();
        if (topWrapRef.current) {
          object.uniqueKey = uuidV4();
          object.set('mtr', false);
          await editor.canvas.add(object);
          await editor.canvas.requestRenderAll(); // 刷新画布以显示更改

          const canvas = topWrapRef.current?.querySelector(
            `.canvas-container .upper-canvas`,
          );
          console.log('simply----- canvas', canvas);

          if (canvas) {
            const topWrapRefRect = topWrapRef.current?.getBoundingClientRect();

            // console.log(
            //   'simply MouseEventMouseEvent xxxx',
            //   object.left,
            //   scaleFactor,
            //   topWrapRefRect.x,
            //   object.height,
            // );
            // console.log(
            //   'simply MouseEventMouseEvent yyy',
            //   object.top,
            //   scaleFactor,
            //   topWrapRefRect.y,
            //   object.height,
            // );
            //TODO:第二次移动有问题，第一次没问题，待解决
            const position = {
              clientX:
                (object.left + object.width / 2) * scaleFactor +
                topWrapRefRect.x,
              clientY:
                (object.top + object.height / 2) * scaleFactor +
                topWrapRefRect.y,
            };
            editor.canvas.setActiveObject(object); // 刷新画布以显示更改

            console.log('simply MouseEventMouseEvent position', position);
            editor.canvas.setActiveObject(object); // 刷新画布以显示更改
            canvas?.dispatchEvent(new MouseEvent('mouseup', position));
            canvas?.dispatchEvent(new MouseEvent('mousedown', position));
          }
        }
        return;
      }
      if (canvasObject) {
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
        return;
      }
    } catch (e) {
      console.error('simply error', e);
    }
  };
  // 通过useImperativeHandle暴露给父组件的方法
  useImperativeHandle(
    handleRef,
    () => ({
      getFabric: () => editor?.canvas,
      onDiscardActiveObject: () => {
        editor?.canvas.discardActiveObject(); // 取消选中状态
        editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
      },
      onAddObject: onAddObject,
    }),
    [editor?.canvas],
  );
  //关闭弹窗
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
          className={`sample-canvas-${canvasIndex + 1}`}
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

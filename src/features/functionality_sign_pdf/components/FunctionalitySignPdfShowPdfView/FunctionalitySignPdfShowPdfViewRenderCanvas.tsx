import { Box } from '@mui/material';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { without } from 'lodash-es';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  IFabricAddObjectType,
  onFabricAddObject,
} from '../../utils/fabricjsTools';
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
  type: IFabricAddObjectType;
  value: string;
};
export interface IFunctionalitySignPdfShowPdfCanvasHandles {
  discardActiveObject: () => void;
  onAddObject?: (
    canvasObject?: ICanvasObjectData,
    object?: fabric.Object,
    isAutoObjectSizePosition?: boolean,
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
  addIndexObject?: (object: fabric.Object, index: number) => void; //通知父级给上下添加对象
  onChangeObjectNumber?: (objectNumber: number) => void; //通知父级canvas的idList
}
/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalitySignPdfShowPdfViewRenderCanvas: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfCanvasHandles,
  IFunctionalitySignPdfShowPdfCanvasProps
> = (
  {
    canvasIndex,
    sizeInfo,
    topScrollKey,
    addIndexObject,
    canvasNumber,
    onChangeObjectNumber,
  },
  handleRef,
) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const topWrapRef = useRef<HTMLElement | null>(null);
  const previousIsSelectionObject = useRef<boolean>(false); //上一次点击是否是选中对象状态
  const [objectIdList, setObjectIdList] = useState<string[]>([]);
  const [
    updateTriggerCloseOpenAllPopupNum,
    setUpdateTriggerCloseOpenAllPopupNum,
  ] = useState<number>(0);
  const [scaleFactor, setScaleFactor] = useState(1); // Current scale factor
  const [controlDiv, setControlDiv] = useState<IControlDiv | null>(null); // 当前选中对象的位置
  const [controlAddNewDiv, setControlAddNewDiv] = useState<IControlDiv | null>(
    null,
  ); // 当前选中对象的位置

  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null); // 当前选中对象信息
  const deleteObjectKey = useRef<string[]>([]);
  useEffect(() => {
    onChangeObjectNumber && onChangeObjectNumber(objectIdList.length);
  }, [objectIdList]);

  useEffect(() => {
    // 检测点击事件的函数，用来判断点击是否在Box外部
    const handleClickOutside = (event) => {
      if (topWrapRef.current && !topWrapRef.current.contains(event.target)) {
        // 点击发生在Box组件外部
        console.log('simply click outside');
        setUpdateTriggerCloseOpenAllPopupNum((num) => num + 1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    const handleScroll = () => {
      //监听窗口滚动，关闭菜单
      //因为做跟随窗口滚动的菜单，功能比较复杂，目前还没有必要
      setUpdateTriggerCloseOpenAllPopupNum((num) => num + 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    // 键盘事件监听器
    if (editor) {
      const handleKeyDown = (event) => {
        try {
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
        } catch (e) {
          console.log('simply error', e);
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
  const closeOpenAllPopup = () => {
    //滚动后取消一些事件
    setControlDiv(null);
    console.log('simply editor', editor?.canvas);
    editor?.canvas.discardActiveObject(); // 取消选中状态
    editor?.canvas.requestRenderAll(); // 刷新画布以显示更改
    const activeObjects = editor?.canvas?.getActiveObjects();
    if (activeObjects) {
      previousIsSelectionObject.current = false;
    }
    setControlAddNewDiv(null);
  };
  useEffect(() => {
    closeOpenAllPopup();
  }, [topScrollKey, updateTriggerCloseOpenAllPopupNum]);

  const changObjectToList = (object: fabric.Object, type: 'add' | 'del') => {
    if (object.type !== 'image') return; //只有图片才算正式签名对象
    setObjectIdList((prevObjectIdList) => {
      if (type === 'add') {
        return [...prevObjectIdList, object.id];
      } else {
        return without(prevObjectIdList, object.id);
      }
    });
  };

  const handleObjectSelected = (object?: fabric.Object) => {
    //选中对象时调用，更新操作div位置
    try {
      previousIsSelectionObject.current = true;

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
  const checkAndMoveToAnotherCanvas = (event) => {
    const targetObject = event.target;
    const pointerY = event.pointer.y;
    // 假定canvasIndex和fabricList已经定义并可用
    if (deleteObjectKey.current.includes(targetObject.id)) return;

    const canvasBounds = {
      height: editor?.canvas.height,
    };
    const objBounds = targetObject.getBoundingRect();
    let addPositionType: null | 'top' | 'bottom' = null;
    // 检查是否移动到了上面的边缘
    const intervalTriggerDistance = 100; //触发间隔距离
    if (objBounds.top < -intervalTriggerDistance && canvasIndex !== 0) {
      addPositionType = 'top';
    }
    // 检查是否移动到了下面的边缘
    else if (
      pointerY > canvasBounds.height + intervalTriggerDistance &&
      objBounds.top + objBounds.height >
        canvasBounds.height + intervalTriggerDistance &&
      canvasIndex !== canvasNumber - 1
    ) {
      addPositionType = 'bottom';
    }
    // 如果确定要移动到另一个画布;
    if (addPositionType !== null) {
      moveToAnotherCanvas(targetObject, addPositionType);
    }
  };
  //移动到另一个画布
  const moveToAnotherCanvas = (
    targetObject,
    addPositionType: 'top' | 'bottom' = 'top',
  ) => {
    if (deleteObjectKey.current.includes(targetObject.id)) return; //已经删除的对象不再处理
    deleteObjectKey.current.push(targetObject.id); //防止重复删除，因为事件拖动会多次触发
    // 获取目标画布
    setUpdateTriggerCloseOpenAllPopupNum((num) => num + 1);
    targetObject.canvas.remove(targetObject);
    if (addPositionType === 'bottom') {
      targetObject.set('top', 0);
      targetObject.top = 0;
      // 现在，克隆这个对象
      targetObject.clone(function (clone) {
        // 设置克隆对象的一些属性，以便可以区分原对象和克隆对象
        clone.set({
          top: 0,
        });
        addIndexObject && addIndexObject(clone, canvasIndex + 1);
      });
    } else if (addPositionType === 'top') {
      targetObject.clone(function (clone) {
        // 设置克隆对象的一些属性，以便可以区分原对象和克隆对象
        clone.set({
          top:
            editor?.canvas.height - targetObject.height * targetObject.scaleY,
        });

        addIndexObject && addIndexObject(clone, canvasIndex - 1);
      });
    }
  };

  //控制边界，不超过画布
  const constrainWithinCanvas = (targetObject, padding = 0) => {
    if (!targetObject.canvas) return;
    if (
      targetObject.currentHeight > targetObject.canvas.height - padding * 2 ||
      targetObject.currentWidth > targetObject.canvas.width - padding * 2
    ) {
      return;
    }
    if (
      targetObject.getBoundingRect().top < padding ||
      targetObject.getBoundingRect().left < padding
    ) {
      targetObject.top = Math.max(
        targetObject.top,
        targetObject.top - targetObject.getBoundingRect().top + padding,
      );
      targetObject.left = Math.max(
        targetObject.left,
        targetObject.left - targetObject.getBoundingRect().left + padding,
      );
    }
    if (
      targetObject.getBoundingRect().top +
        targetObject.getBoundingRect().height >
        targetObject.canvas.height - padding ||
      targetObject.getBoundingRect().left +
        targetObject.getBoundingRect().width >
        targetObject.canvas.width - padding
    ) {
      targetObject.top = Math.min(
        targetObject.top,
        targetObject.canvas.height -
          targetObject.getBoundingRect().height +
          targetObject.top -
          targetObject.getBoundingRect().top -
          padding,
      );
      targetObject.left = Math.min(
        targetObject.left,
        targetObject.canvas.width -
          targetObject.getBoundingRect().width +
          targetObject.left -
          targetObject.getBoundingRect().left -
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
        // 对象添加
        editor.canvas.on('object:added', function (options) {
          console.log('一个对象被添加', options.target);
          changObjectToList(options.target, 'add');
        });
        // 对象删除
        editor.canvas.on('object:removed', function (options) {
          console.log('一个对象被移除', options.target);
          changObjectToList(options.target, 'del');
        });
        //鼠标抬起事件
        editor.canvas.on('mouse:up', function (event) {
          console.log('simply mouse:up', event);
          if (event.target) {
            //当前选中了对象，不打开ControlAddNewDiv
            previousIsSelectionObject.current = true;
            setControlAddNewDiv(null);
            return;
          }
          if (previousIsSelectionObject.current) {
            //上一个是选中对象，不打开ControlAddNewDiv
            previousIsSelectionObject.current = false;
            setControlAddNewDiv(null);
            return;
          }
          previousIsSelectionObject.current = true;
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
          if (event.selected.length > 0) {
            previousIsSelectionObject.current = true;
          }
          if (event.selected.length === 1) {
            handleObjectSelected(event.selected[0]);
          }
        });

        editor.canvas.on('object:moving', function (e) {
          console.log('simply object:moving-----', e);
          // 对象移动监听 - 保证操作div跟随移动
          const targetObject = e.target;
          targetObject.setCoords();
          constrainWithinCanvas(targetObject);
          handleObjectSelected(e.target);
          checkAndMoveToAnotherCanvas(e);
        });
        // 对象移动监听 - 保证操作div跟随移动
        editor.canvas.on('object:scaling', function (e) {
          console.log('simply object:scaling');

          handleObjectSelected(e.target);
        });

        // 确保再次选择时移动操作div
        editor.canvas.on('selection:updated', function (event) {
          console.log('simply selection:updated', event);
          if (event.selected.length > 0) {
            previousIsSelectionObject.current = true;
          }
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
        const newWidth = topWrapRef.current?.clientWidth;
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
    newObject?: fabric.Object,
    isAutoObjectPosition?: boolean, //是否自动优化对象位置
    isAutoObjectDragPosition: boolean = true, //是否自动拖动对象位置
  ) => {
    try {
      if (!editor) return;
      if (newObject) {
        topWrapRef.current?.focus();
        if (topWrapRef.current) {
          //直接添加object，会以object的top left添加上去
          newObject.id = uuidV4();
          newObject.set('mtr', false);
          await editor.canvas.add(newObject);
          await editor.canvas.requestRenderAll(); // 刷新画布以显示更改
          if (isAutoObjectDragPosition) {
            const canvasElement = editor.canvas.upperCanvasEl;
            if (canvasElement) {
              //这是拖动过来，代表需要自动js触发鼠标事件
              const topWrapRefRect =
                topWrapRef.current?.getBoundingClientRect();
              const position = {
                clientX:
                  topWrapRefRect.x +
                  newObject.left * scaleFactor +
                  (newObject.width * newObject.scaleX * scaleFactor) / 2,
                clientY:
                  topWrapRefRect.y +
                  newObject.top * scaleFactor +
                  (newObject.height * newObject.scaleY * scaleFactor) / 2,
                bubbles: true,
              };
              editor.canvas.setActiveObject(newObject); // 刷新画布以显示更改
              canvasElement?.dispatchEvent(new MouseEvent('mouseup', position));
              canvasElement?.dispatchEvent(
                new MouseEvent('mousedown', position),
              );
            }
          }
        }
        return;
      }
      if (canvasObject) {
        setControlAddNewDiv(null);
        const centerX = sizeInfo && sizeInfo?.width / 2; //没有就默认居中
        const centerY = sizeInfo && sizeInfo?.height / 2;
        console.log('simply add ', canvasObject);
        const positionData = {
          left: canvasObject.x ? canvasObject.x / scaleFactor : centerX,
          top: canvasObject.y ? canvasObject.y / scaleFactor : centerY,
        };
        await onFabricAddObject(
          editor,
          positionData,
          canvasObject.type,
          canvasObject.value,
          isAutoObjectPosition,
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
      discardActiveObject: () => {
        closeOpenAllPopup();
      },
      onAddObject: onAddObject,
    }),
    [editor?.canvas],
  );
  //关闭弹窗
  const onCloseAddToolsPopup = () => {
    setControlAddNewDiv(null);
  };
  const handlePopupClick = (event) => {
    //因为写了点击其它区域关闭，所以这里做了阻止冒泡
    event.stopPropagation();
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
        <Box onMouseDown={handlePopupClick}>
          <FunctionalitySignPdfShowPdfViewObjectToolsPopup
            key={activeObject.id}
            controlDiv={controlDiv}
            scaleFactor={scaleFactor}
            editor={editor}
          />
        </Box>
      )}
      {controlAddNewDiv && (
        <Box onMouseDown={handlePopupClick}>
          <FunctionalitySignPdfShowPdfViewAddToolsPopup
            controlDivPosition={controlAddNewDiv}
            scaleFactor={scaleFactor}
            editor={editor}
            onClose={onCloseAddToolsPopup}
          />
        </Box>
      )}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfShowPdfViewRenderCanvas);

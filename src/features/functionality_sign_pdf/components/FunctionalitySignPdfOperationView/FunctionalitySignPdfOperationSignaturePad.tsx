import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import SmoothSignature from 'smooth-signature';

import { changeImageColor } from '../../utils/colorTools';
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';

// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignaturePadHandles {
  getPngBase64: () => string;
}
interface IFunctionalitySignPdfOperationSignaturePadProps {
  bottomView: (isInput: boolean) => React.ReactNode;
}
/**
 * 签名手绘板
 */
const FunctionalitySignPdfOperationSignaturePad: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignaturePadHandles,
  IFunctionalitySignPdfOperationSignaturePadProps
> = ({ bottomView }, ref) => {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SmoothSignature | null>(null);
  const [historyCanvasList, setHistoryCanvasList] = useState<
    {
      color: string;
      value: string;
    }[]
  >([]); //操作的历史记录
  const [refreshIndex, setRefreshIndex] = useState<number | null>(null); //当前回归操作的历史记录索引
  const [isStartSign, setIsStartSign] = useState<boolean>(false); //是否开始签名

  const currentColor = useRef<string>('block');
  useImperativeHandle(ref, () => ({
    getPngBase64: () => {
      if (historyCanvasList.length) {
        return saveSignature() || '';
      } else {
        return '';
      }
    },
  }));
  useEffect(() => {
    try {
      if (canvasRef.current === null || signaturePadRef.current) return;
      const signaturePad = (signaturePadRef.current = new SmoothSignature(
        canvasRef.current,
        {
          scale: 3,
          width: 600,
          height: 200,
          onStart: () => {
            console.log('onStart');
            setIsStartSign(true);
          },
          onEnd: () => {
            console.log('onEnd');
            let currentRefreshIndex: number | null = null;
            setRefreshIndex((refreshIndex) => {
              currentRefreshIndex = refreshIndex;
              return refreshIndex;
            });
            setHistoryCanvasList((canvasList) => {
              if (currentRefreshIndex !== null) {
                canvasList.splice((currentRefreshIndex || 0) + 1);
              }
              return [
                ...canvasList,
                {
                  color: currentColor.current,
                  value: canvasRef.current?.toDataURL() || '',
                },
              ];
            });

            setRefreshIndex(null);
          },
        },
      ));
      console.log('signaturePad', signaturePad);
    } catch (e) {
      console.log(e);
    }
  }, [canvasRef]);
  // 获取签名的边界框
  const getSignatureBounds = () => {
    if (!canvasRef.current) return false;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return false;
    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
    const data = imageData.data;

    let minX = canvasRef.current.width,
      minY = canvasRef.current.height,
      maxX = 0,
      maxY = 0;

    for (let x = 0; x < canvasRef.current.width; x++) {
      for (let y = 0; y < canvasRef.current.height; y++) {
        const alpha = data[(canvasRef.current.width * y + x) * 4 + 3];
        if (alpha > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    return { minX, minY, maxX, maxY };
  };

  // 根据签名的边界框裁剪并保存画布
  const saveSignature = () => {
    const data = getSignatureBounds();
    if (!data || !canvasRef.current) return;
    const { minX, minY, maxX, maxY } = data;
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    // 创建一个新的canvas用于裁剪画布
    const clippedCanvas = document.createElement('canvas');
    clippedCanvas.width = width;
    clippedCanvas.height = height;
    const clippedCtx = clippedCanvas.getContext('2d');
    if (clippedCtx) {
      // 将签名的部分绘制到新的画布上
      clippedCtx.drawImage(
        canvasRef.current,
        minX,
        minY,
        width,
        height,
        0,
        0,
        width,
        height,
      );

      // 返回裁剪后的画布的DataURL
      return clippedCanvas.toDataURL();
    }
  };
  const onSelectedColor = (color: string) => {
    currentColor.current = color;
    onChangeCanvasColor(color);
  };
  const onChangeCanvasColor = (color: string) => {
    try {
      if (signaturePadRef.current && canvasRef.current) {
        let ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          let imageData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          imageData = changeImageColor(imageData, color);

          ctx.putImageData(imageData, 0, 0);
        }

        // signaturePadRef.current.penColor = color;
      }
    } catch (e) {}
  };
  const onReplay = async () => {
    try {
      if (signaturePadRef.current && canvasRef.current) {
        signaturePadRef.current.clear();
        let index =
          refreshIndex !== null
            ? refreshIndex - 1
            : historyCanvasList.length - 2;
        if (historyCanvasList[index]) {
          const currentCanvas = historyCanvasList[index].value;
          if (currentCanvas) {
            await signaturePadRef.current.drawByImageUrl(currentCanvas);
          }

          if (historyCanvasList[index].color !== currentColor.current) {
            onChangeCanvasColor(currentColor.current);
          }
        }
        setRefreshIndex(index);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onRefresh = async () => {
    try {
      let index = refreshIndex === null ? 0 : refreshIndex + 1;
      if (historyCanvasList[index] && signaturePadRef.current) {
        await signaturePadRef.current.drawByImageUrl(
          historyCanvasList[index].value,
        );
        if (historyCanvasList[index].color !== currentColor.current) {
          onChangeCanvasColor(currentColor.current);
        }
        setRefreshIndex(index);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const clearCanvas = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setHistoryCanvasList([]);
      setRefreshIndex(null);
    }
  };
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onSelectedColor}
        />
        <Stack direction='row' gap={1}>
          <Button
            disabled={historyCanvasList.length === 0 || refreshIndex === -1}
            onClick={onReplay}
            variant='outlined'
          >
            <FunctionalitySignPdfIcon name='UndoOutlined' />
          </Button>
          <Button
            disabled={
              historyCanvasList.length === 0 ||
              refreshIndex === null ||
              refreshIndex === historyCanvasList.length - 1
            }
            variant='outlined'
            onClick={onRefresh}
          >
            <FunctionalitySignPdfIcon name='RedoOutlined' />
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          bgcolor: '#fafafa',
          position: 'relative',
        }}
      >
        <canvas
          id='functionality-sign-pdf-signature-pad'
          ref={canvasRef}
          width='600'
          height='200'
        />
        <Stack
          sx={{
            borderTop: '1px solid #e8e8e8',
            p: 1,
          }}
          direction='row-reverse'
        >
          <Button
            disabled={historyCanvasList.length === 0}
            onClick={clearCanvas}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__clear',
            )}
          </Button>
        </Stack>
        {historyCanvasList.length === 0 && !isStartSign && (
          <Typography
            color='text.secondary'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__draw__here',
            )}
          </Typography>
        )}
      </Box>
      {bottomView(historyCanvasList.length === 0)}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfOperationSignaturePad);

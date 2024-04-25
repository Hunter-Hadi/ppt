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
import SignaturePad from 'signature_pad';

import { changeImageColor } from '../../utils/colorTools';
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';

// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignaturePadHandles {
  getPngBase64: () => string;
}

/**
 * 签名手绘板
 */
const FunctionalitySignPdfOperationSignaturePad: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignaturePadHandles
> = (props, ref) => {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
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
    getPngBase64: () => signaturePadRef.current?.toDataURL() || '',
  }));
  useEffect(() => {
    if (canvasRef.current === null || signaturePadRef.current) return;
    const signaturePad = (signaturePadRef.current = new SignaturePad(
      canvasRef.current,
      {
        throttle: 0,
        minWidth: 1, // 设置线条的最小宽度为2
        maxWidth: 2, // 设置线条的最大宽度为5
        velocityFilterWeight: 0.1,
      },
    ));
    signaturePad.addEventListener('beginStroke', () => {
      setIsStartSign(true);
    });
    signaturePad.addEventListener('endStroke', () => {
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
    });
  }, [canvasRef]);
  const onSelectedColor = (color: string) => {
    currentColor.current = color;
    onChangeCanvasColor(color);
  };
  const onChangeCanvasColor = (color: string) => {
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

      signaturePadRef.current.penColor = color;
    }
  };
  const onReplay = async () => {
    if (signaturePadRef.current && canvasRef.current) {
      signaturePadRef.current.clear();
      let index =
        refreshIndex !== null ? refreshIndex - 1 : historyCanvasList.length - 2;
      if (historyCanvasList[index]) {
        await signaturePadRef.current.fromDataURL(
          historyCanvasList[index].value,
          {
            width: 600,
            height: 200,
          },
        );
        if (historyCanvasList[index].color !== currentColor.current) {
          onChangeCanvasColor(currentColor.current);
        }
      }
      setRefreshIndex(index);
    }
  };
  const onRefresh = async () => {
    let index = refreshIndex === null ? 0 : refreshIndex + 1;
    if (historyCanvasList[index] && signaturePadRef.current) {
      await signaturePadRef.current.fromDataURL(
        historyCanvasList[index].value,
        {
          width: 600,
          height: 200,
        },
      );
      if (historyCanvasList[index].color !== currentColor.current) {
        onChangeCanvasColor(currentColor.current);
      }
      setRefreshIndex(index);
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
            <FunctionalitySignPdfIcon name='Replay' />
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
            <FunctionalitySignPdfIcon name='Refresh' />
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
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfOperationSignaturePad);

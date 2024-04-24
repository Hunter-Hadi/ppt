import { Box, Button, Stack, Typography } from '@mui/material';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import SignaturePad from 'signature_pad';

import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';

// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignaturePadHandles {
  getPngBase64: () => string;
}

const FunctionalitySignPdfSignaturePad: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignaturePadHandles
> = (props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [historyCanvasList, setHistoryCanvasList] = useState<
    {
      color: string;
      value: string;
    }[]
  >([]);
  const [refreshIndex, setRefreshIndex] = useState<number | null>(null);
  const [isStartSign, setIsStartSign] = useState<boolean>(false);

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
      var ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        var imageData = ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          data[i + 1] = 0;
          switch (color) {
            case 'black':
              data[i] = 0;
              data[i + 2] = 0;
              break;
            case 'red':
              data[i] = 255;
              data[i + 2] = 0;
              break;
            case 'blue':
              data[i] = 0;
              data[i + 2] = 255;
              break;
          }
        }
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
      //index===-1时，清空画布
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
            Clear
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
            Draw here
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfSignaturePad);

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { useFunctionalitySignElementWidth } from '../../hooks/useFunctionalitySignElementWidth';
import { useFunctionalitySignScrollPagination } from '../../hooks/useFunctionalitySignScrollPagination';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfShowPdfViewDroppable from './FunctionalitySignPdfDroppable';
import FunctionalitySignPdfShowPdfViewRenderCanvas, {
  ICanvasObjectData,
  IFunctionalitySignPdfShowPdfCanvasHandles,
} from './FunctionalitySignPdfShowPdfViewRenderCanvas';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export interface IFunctionalitySignPdfShowPdfViewHandles {
  onDiscardActiveObject: () => void;
  getNumPages: () => number;
  onAddObject?: (
    canvasObject: ICanvasObjectData & { pdfIndex?: number },
  ) => void;
}

interface IFunctionalitySignPdfShowPdfViewProps {
  file: File;
}
/**
 * 签名PDF处的视图
 */
export const FunctionalitySignPdfShowPdfViewPdfViewMain: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfViewHandles,
  IFunctionalitySignPdfShowPdfViewProps
> = ({ file }, handleRef) => {
  const { t } = useTranslation();
  const canvasHandlesRefs = useRef<IFunctionalitySignPdfShowPdfCanvasHandles[]>(
    [],
  );
  //PDF的页数
  const [numPages, setNumPages] = useState<number>(0);
  const defaultWidth = useRef(700); //TODO:应该是根据pdf宽度变更，但目前用着没问题，先这样，后续再调整

  const [selfAdaptionWidth, setSelfAdaptionWidth] = useState<number>(
    defaultWidth.current,
  ); //根据窗口调节宽度
  const [isSelfAdaption, setIsSelfAdaption] = useState<boolean>(true);
  const [isScrollShow, setIsScrollShow] = useState(false);

  const { ref: rollingRef, width: parentWidth } =
    useFunctionalitySignElementWidth();
  const {
    scrollTime,
    setPageRef,
    currentPage,
    scrollToPage,
    goToNextPage,
    goToPreviousPage,
  } = useFunctionalitySignScrollPagination(numPages || 0, rollingRef);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const checkScrollTime = () => {
      setIsScrollShow(scrollTime + 3000 > new Date().valueOf());
    };
    checkScrollTime();
    interval = setInterval(checkScrollTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [scrollTime]);
  const [pagesInitialSizeList, setPagesInitialSizeList] = useState<
    {
      width: number;
      height: number;
    }[]
  >([]); //pdf的初始页面宽度
  useImperativeHandle(
    handleRef,
    () => ({
      onDiscardActiveObject: () => {
        if (canvasHandlesRefs.current) {
          canvasHandlesRefs.current.forEach((canvasHandlesRef) => {
            canvasHandlesRef.onDiscardActiveObject();
          });
        }
      },
      getNumPages: () => numPages,
      onAddObject: (value) => {
        let currentNumber =
          value.pdfIndex !== undefined ? value.pdfIndex : currentPage;
        if (currentNumber !== undefined) {
          const onAddObject =
            canvasHandlesRefs.current[currentNumber]?.onAddObject;
          if (onAddObject) {
            onAddObject(value);
          }
        }
      },
    }),
    [canvasHandlesRefs.current, numPages, currentPage],
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  useEffect(() => {
    if (file) {
      getFilePdfInfoList();
    }
  }, [file]);
  const getFilePdfInfoList = async () => {
    try {
      const buff = await file.arrayBuffer(); // Uint8Array
      const pdfDocument = await pdfjs.getDocument(buff).promise;
      for (
        let pageNum = 1;
        pageNum <= pdfDocument._pdfInfo.numPages;
        pageNum++
      ) {
        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });
        setPagesInitialSizeList((list) => [
          ...list,
          { width: viewport.width, height: viewport.height },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSelfAdaption = () => {
    if (!isSelfAdaption) {
      setSelfAdaptionWidth(defaultWidth.current);
    }
    setIsSelfAdaption(!isSelfAdaption);
  };
  const onChangeSize = (type: 'reduce' | 'add') => {
    if (isSelfAdaption) {
      setSelfAdaptionWidth(parentWidth - 15);
      setIsSelfAdaption(false);
    }
    if (type === 'reduce') {
      setSelfAdaptionWidth((width) => Math.max(width - 50, 200));
    } else {
      setSelfAdaptionWidth((width) => width + 50);
    }
  };
  const onTextInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      const value = event.target.value;
      if (value) {
        const num = Number(value);
        if (num > 0 && num <= (numPages || 0)) {
          scrollToPage(num - 1);
        }
      }
    }
  };
  return (
    <Stack
      sx={{
        width: '100%',
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack
        ref={rollingRef}
        id='functionality-sign-pdf-rolling-view'
        sx={{
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{
            px: isSelfAdaption ? 0 : 4,
            py: isSelfAdaption ? 0 : 6,
            pb: 8,
            width: isSelfAdaption ? parentWidth - 15 : selfAdaptionWidth, //-15是因为滚动条导致的横向滚动条出现
            margin: '0 auto',
          }}
        >
          <Document
            file={file}
            externalLinkTarget='_blank'
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={index} ref={(el) => setPageRef(el, index)}>
                <FunctionalitySignPdfShowPdfViewDroppable index={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      marginBottom: 3,
                      '.react-pdf__Page__canvas': {
                        width: `100%!important`,
                        height: 'auto!important',
                      },
                    }}
                  >
                    <Page
                      key={`page_${index + 1}`}
                      renderTextLayer={true}
                      pageNumber={index + 1}
                      width={1080}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 9,
                      }}
                    >
                      <FunctionalitySignPdfShowPdfViewRenderCanvas
                        canvasIndex={index + 1}
                        topScrollKey={scrollTime}
                        ref={(el) => {
                          if (el) {
                            canvasHandlesRefs.current[index] = el;
                          }
                        }}
                        sizeInfo={pagesInitialSizeList[index]}
                      />
                    </Box>
                  </Box>
                </FunctionalitySignPdfShowPdfViewDroppable>
              </div>
            ))}
          </Document>
        </Box>
      </Stack>
      {/* 下面是底部分页工具 */}
      <Stack
        direction='row'
        justifyContent='center'
        sx={{
          position: 'absolute',
          margin: '0 auto',
          padding: 1,
          bottom: 10,
          left: 0,
          right: 0,
          p: 1,
          zIndex: 99,
          width: '100%',
          height: 60,
          '&:hover': {
            '>div': {
              display: 'flex',
            },
          },
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{
            bgcolor: '#ffffff',
            display: isScrollShow ? 'flex' : 'none',
            p: 1,
            borderRadius: 2,
          }}
        >
          <IconButton
            size='small'
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <FunctionalitySignPdfIcon name='ArrowBackIos' />
          </IconButton>
          <TextField
            onKeyDown={onTextInputKeyDown}
            sx={{
              width: 50,
              ' input': {
                textAlign: 'center',
              },
            }}
            hiddenLabel
            key={currentPage}
            defaultValue={currentPage + 1}
            variant='filled'
            size='small'
          />
          <IconButton
            disabled={currentPage === (numPages || 0) - 1}
            size='small'
            onClick={goToNextPage}
          >
            <FunctionalitySignPdfIcon name='ArrowForwardIos' />
          </IconButton>
          <Stack
            sx={{
              borderRight: '1px solid #e8e8e8',
              height: '100%',
              pr: 2,
            }}
            direction='row'
            alignItems='center'
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__of',
              {
                NUMBER: numPages,
              },
            )}
          </Stack>

          <IconButton size='small' onClick={onSelfAdaption}>
            <FunctionalitySignPdfIcon
              name={isSelfAdaption ? 'ZoomInMapOutlined' : 'ZoomOutMapOutlined'}
            />
          </IconButton>

          <IconButton
            size='small'
            disabled={selfAdaptionWidth === 200}
            onClick={() => onChangeSize('reduce')}
          >
            <FunctionalitySignPdfIcon name='RemoveCircleOutlineOutlined' />
          </IconButton>
          <IconButton size='small' onClick={() => onChangeSize('add')}>
            <FunctionalitySignPdfIcon name='AddCircleOutlineOutlined' />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default forwardRef(FunctionalitySignPdfShowPdfViewPdfViewMain);

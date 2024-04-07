import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import { generatePdfPageToImage } from '@/features/functionality_common/utils/getPdfFilePage';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
export interface IPdfPageImageInfo {
  id: string;
  imageUrlString: string;
  isSelect: boolean;
  definedIndex: number;
}
/**
 * pdf转图片类型 工具 的hook
 * @param toType:转换的类型
 */
const usePdfToImageConversion = (toType: 'jpeg' | 'png' = 'png', isNeedPdfHaveImages = true) => {
  const isCancel = useRef(false);
  const [convertedPdfImages, setConvertedPdfImages] = useState<
    IPdfPageImageInfo[]
  >([]);
  const [pdfPageHaveImages, setPdfPageHaveImages] = useState<
    IPdfPageImageInfo[]
  >([]);
  const [pdfIsLoading, setPdfIsLoading] = useState<boolean>(false); //是否加载中

  const [pdfTotalPages, setPdfTotalPages] = useState<number>(0); //总页数
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0); //当前加载页数
  const [pdfViewDefaultSize, setPdfViewDefaultSize] = useState<{
    width: number;
    height: number;
  }>({ width: 500, height: 1000 }); //默认尺寸
  useEffect(() => {
    setPdfTotalPages(0)
    setCurrentPdfActionNum(0)
  }, [pdfIsLoading])
  /**
   * 读取pdf文件并转换为图片
   */
  const onReadPdfToImages = debounce(async (file: File) => {
    try {
      if (!file) {
        return;
      }
      isCancel.current = false;

      setPdfIsLoading(true);
      const buff = await file.arrayBuffer(); // Uint8Array
      const pdfDocument = await pdfjs.getDocument(buff).promise;
      setPdfTotalPages(pdfDocument._pdfInfo.numPages);
      for (let pageNum = 1; pageNum <= pdfDocument._pdfInfo.numPages; pageNum++) {
        if (isCancel.current) return;
        setCurrentPdfActionNum(pageNum);
        const toImageData = await generatePdfPageToImage(pdfDocument, pageNum, 1.6, toType, isNeedPdfHaveImages);
        console.log('simply toImageData', toImageData)
        if (toImageData) {
          if (pdfViewDefaultSize.height !== 1000 && pdfViewDefaultSize.width !== 500) {
            // 不等于默认尺寸，继续
            setPdfViewDefaultSize({
              width: Math.floor(toImageData.width),
              height: Math.floor(toImageData.height),
            });
          }

          setConvertedPdfImages((prev) => [
            ...prev,
            {
              id: uuidV4(),
              imageUrlString: toImageData.imageDataUrl,
              isSelect: true,
              definedIndex: pageNum,
            },
          ]);
          if (toImageData.haveImages) {
            setPdfPageHaveImages((prev) => [...prev, ...(toImageData.haveImages as IPdfPageImageInfo[])])
          }
        }

        if (pageNum === pdfDocument._pdfInfo.numPages) {
          setPdfIsLoading(false);
        }
      }
    } catch (error) {
      console.log('simply onReadPdfToImages', error)
      setPdfIsLoading(false);
    }
  }, 200);

  /**
   * 取消pdf转图片
   */
  const onCancelPdfActive = () => {
    isCancel.current = true;
    setPdfIsLoading(false);
  };

  return {
    pdfPageHaveImages,
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    pdfTotalPages,
    currentPdfActionNum,
    onCancelPdfActive,
    pdfViewDefaultSize,
    setPdfPageHaveImages,
  };
};

export default usePdfToImageConversion;

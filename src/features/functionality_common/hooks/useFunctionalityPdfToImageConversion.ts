import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import { generatePdfPageToImage } from '@/features/functionality_common/utils/functionalityGetPdfFilePageToImage';

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
 * @param isNeedPdfHaveImages:是否需要pdf页内图片，需要大量运行资源
 */
const usePdfToImageConversion = (toType: 'jpeg' | 'png' = 'png', isNeedPdfHaveImages = false) => {
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
    if (pdfIsLoading) {
      setPdfTotalPages(0)
      setCurrentPdfActionNum(0)
    }

  }, [pdfIsLoading])
  /**
   * 读取pdf文件并转换为图片
   */
  const onReadPdfToImages = debounce(async (file: File) => {
    try {
      if (!file) {
        return;
      }
      //simply onReadPdfToImages time 秒数：15.862秒 开启图片预览

      const timeNum = new Date().getTime()
      isCancel.current = false;

      setPdfIsLoading(true);
      const buff = await file.arrayBuffer(); // Uint8Array
      const pdfDocument = await pdfjs.getDocument(buff).promise;
      setPdfTotalPages(pdfDocument._pdfInfo.numPages);
      for (let pageNum = 1; pageNum <= pdfDocument._pdfInfo.numPages; pageNum++) {
        if (isCancel.current) return;
        setCurrentPdfActionNum(pageNum);
        const toImageData = await generatePdfPageToImage(pdfDocument, pageNum, 1.6, toType, isNeedPdfHaveImages);
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
          console.log('simply onReadPdfToImages time', `秒数：${(new Date().getTime() - timeNum) / 1000}秒`)
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

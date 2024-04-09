import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import { generatePdfPageToImage } from '@/features/functionality_common/utils/functionalityGetPdfFilePageToImage';
import snackNotifications from '@/utils/globalSnackbar';

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
export const defaultPdfToImageScale = 1.6

/**
 * pdf转图片类型 工具 的hook
 * @param {string} toType - 转换的类型
 * @param {boolean} isNeedPdfHaveImages - 是否需要pdf页内图片，需要大量运行资源
 * @returns {Object} 包含以下对象：
 * -  convertedPdfImages - pdf 所有page 图片列表
 * -  pdfPageHaveImages - pdf 所有page 含有的图片列表数据
 * -  onReadPdfToImages - 主方法，传入文件开始读取图片
 */
const usePdfToImageConversion = () => {
  const { t } = useTranslation();
  const viewDefaultSize = { width: 500, height: 1000 }
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
  }>({ width: viewDefaultSize.width, height: viewDefaultSize.height }); //默认尺寸
  useEffect(() => {
    if (pdfIsLoading) {
      setPdfTotalPages(0)
      setCurrentPdfActionNum(0)
    }

  }, [pdfIsLoading])
  /**
   * 读取pdf文件并转换为图片
   */
  const onReadPdfToImages = async (file: File, toType: 'jpeg' | 'png' = 'png', isNeedPdfHaveImages = false) => {
    return new Promise(async (resolve) => {
      try {
        if (!file) {
          resolve(false)
          return false;
        }
        const timeNum = new Date().getTime()
        isCancel.current = false;
        setPdfIsLoading(true);
        const buff = await file.arrayBuffer(); // Uint8Array
        await PDFDocument.load(buff); //load来判断pdf是否加密或者无法提取，异常则进入catch
        const pdfDocument = await pdfjs.getDocument(buff).promise;
        setPdfTotalPages(pdfDocument._pdfInfo.numPages);
        for (let pageNum = 1; pageNum <= pdfDocument._pdfInfo.numPages; pageNum++) {
          if (isCancel.current) {
            resolve(true)
            return
          }
          setCurrentPdfActionNum(pageNum);
          const toImageData = await generatePdfPageToImage(pdfDocument, pageNum, defaultPdfToImageScale, toType, isNeedPdfHaveImages);
          if (isCancel.current) {
            resolve(true)
            return

          }
          if (toImageData) {
            if (toImageData.height !== viewDefaultSize.height && toImageData.width !== viewDefaultSize.width) {
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
            console.log('simply onReadPdfToImages time', `用时秒数：${(new Date().getTime() - timeNum) / 1000}秒`)
            resolve(true)
            return true
          }
        }
      } catch (error) {
        snackNotifications.warning(
          `${file.name} ${t(
            'functionality__pdf_merge:components__pdf_merge__pdf_encryption_tip',
          )}`,
          {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          },
        );
        console.log('simply onReadPdfToImages', error)
        setPdfIsLoading(false);
        resolve(false)
        return false
      }
    })
  }

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

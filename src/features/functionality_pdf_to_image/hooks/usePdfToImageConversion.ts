import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

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
const usePdfToImageConversion = (toType: 'jpeg' | 'png' = 'png') => {
  const isCancel = useRef(false);
  const [convertedPdfImages, setConvertedPdfImages] = useState<
    IPdfPageImageInfo[]
  >([]);
  const [pdfPageHaveImages, setPdfPageHaveImages] = useState<
    IPdfPageImageInfo[]
  >([]);
  const [pdfIsLoading, setPdfIsLoading] = useState<boolean>(true); //是否加载中

  const [pdfTotalPages, setPdfTotalPages] = useState<number>(0); //总页数
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0); //当前加载页数
  const [pdfViewDefaultSize, setPdfViewDefaultSize] = useState<{
    width: number;
    height: number;
  }>({ width: 500, height: 1000 }); //默认尺寸

  /**
   * 生成Pdf到图像
   */
  const generatePdfToImage = async (
    pdfDocument: any, //PDFDocumentProxy react-pdfjs没有导出
    pageNum: number,
    scale: number = 1.6,
  ) => {
    try {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext = {
        canvasContext: context!,
        viewport: viewport,
      };
      const renderTask = page.render(renderContext);
      await renderTask.promise;
      await findPdfToImage(page);
      const imageDataUrl = canvas.toDataURL(`image/${toType}`);
      return {
        imageDataUrl,
        viewport,
      };
    } catch (e) {
      console.log('simply generatePdfToImage error', e);
      return null;
    }
  };
  /**
   * 查找Pdf的图像
   */
  const findPdfToImage = async (page: any) => {
    // 获取操作列表
    const ops = await page.getOperatorList();
    // 提取图片
    const imageNames = ops.fnArray.reduce((acc, curr, i) => {
      if (
        [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintXObject].includes(curr)
      ) {
        acc.push(ops.argsArray[i][0]);
      }
      return acc;
    }, []);
    for (const imageName of imageNames) {
      page.objs.get(imageName, (image) => {
        (async () => {
          try {
            const bmp = image.bitmap;
            const resizeScale = 1;
            const width = bmp.width * resizeScale;
            const height = bmp.height * resizeScale;
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('bitmaprenderer');
            bmp &&
              (ctx as ImageBitmapRenderingContext)?.transferFromImageBitmap(
                bmp,
              ); //as 因为 build检测类型报错   并且   try catch 会拦截异常
            const blob = await (
              canvas as OffscreenCanvas & { convertToBlob: () => Blob }
            ).convertToBlob(); //as 因为 build检测类型报错  并且 try catch 会拦截异常
            if (blob) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64Data = reader.result?.toString() || '';
                setPdfPageHaveImages((prev) => [
                  ...prev,
                  {
                    id: uuidV4(),
                    imageUrlString: base64Data,
                    isSelect: true,
                    definedIndex: 1,
                  },
                ]);
              };
            }
          } catch (e) {
            console.log('simply findPdfToImage error get', e);
          }
        })();
      });
    }
  };
  /**
   * 读取pdf文件并转换为图片
   */
  const onReadPdfToImages = debounce(async (file: File) => {
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
      const toImageData = await generatePdfToImage(pdfDocument, pageNum, 1.6);
      if (toImageData) {
        setPdfViewDefaultSize({
          width: Math.floor(toImageData.viewport.width),
          height: Math.floor(toImageData.viewport.height),
        });
        setConvertedPdfImages((prev) => [
          ...prev,
          {
            id: uuidV4(),
            imageUrlString: toImageData.imageDataUrl,
            isSelect: true,
            definedIndex: pageNum,
          },
        ]);
      }

      if (pageNum === pdfDocument._pdfInfo.numPages) {
        setPdfIsLoading(false);
      }
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

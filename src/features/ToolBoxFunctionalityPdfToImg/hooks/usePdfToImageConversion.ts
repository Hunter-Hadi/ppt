import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import snackNotifications from '@/utils/globalSnackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
export interface IPdfPageImageInfo {
  id: string;
  imgString: string;
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
  const [pdfPageHaveImgs, setPdfPageHaveImgs] = useState<IPdfPageImageInfo[]>(
    [],
  );
  const [pdfIsLoad, setPdfIsLoad] = useState<boolean>(true); //是否加载中

  const [pdfTotalPages, setPdfTotalPages] = useState<number>(0); //总页数/总下载页书
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0); //当前加载页数/当前下载页书进度
  const [pdfViewDefaultSize, setPdfViewDefaultSize] = useState<{
    width: number;
    height: number;
  }>({ width: 500, height: 1000 }); //默认尺寸

  /**
   * 生成Pdf到图像
   */
  const generatePdfToImage = async (
    pdfDoc: any, //PDFDocumentProxy react-pdfjs没有导出
    pageNum: number,
    scale: number = 1.6,
  ) => {
    const page = await pdfDoc.getPage(pageNum);
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
          const bmp = image.bitmap;
          const resizeScale = 1;
          const width = bmp.width * resizeScale;
          const height = bmp.height * resizeScale;
          const canvas = new OffscreenCanvas(width, height);
          const ctx = canvas.getContext('bitmaprenderer');
          ctx?.transferFromImageBitmap(bmp);
          const blob = await canvas.convertToBlob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64Data = reader.result?.toString() || '';
            console.log('base64Data: ', base64Data); // base64 encoded image
            setPdfPageHaveImgs((prev) => [
              ...prev,
              {
                id: uuidV4(),
                imgString: base64Data,
                isSelect: true,
                definedIndex: 1,
              },
            ]);
          };
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

    setPdfIsLoad(true);
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDoc = await pdfjs.getDocument(buff).promise;
    setPdfTotalPages(pdfDoc._pdfInfo.numPages);
    for (let pageNum = 1; pageNum <= pdfDoc._pdfInfo.numPages; pageNum++) {
      if (isCancel.current) return;
      setCurrentPdfActionNum(pageNum);
      const { imageDataUrl, viewport } = await generatePdfToImage(
        pdfDoc,
        pageNum,
        1.6,
      );
      setPdfViewDefaultSize({
        width: Math.floor(viewport.width),
        height: Math.floor(viewport.height),
      });

      setConvertedPdfImages((prev) => [
        ...prev,
        {
          id: uuidV4(),
          imgString: imageDataUrl,
          isSelect: true,
          definedIndex: pageNum,
        },
      ]);
      if (pageNum === pdfDoc._pdfInfo.numPages) {
        setPdfIsLoad(false);
      }
    }
  }, 200);

  /**
   * 取消pdf转图片
   */
  const onCancelPdfActive = () => {
    isCancel.current = true;
    setPdfIsLoad(false);
  };

  /**
   * 下载图片的zip格式文件
   * @param scale - 代表多少倍放大
   * @param file - 传入file原文件，不会用base64来放大操作，应该拿取图片的源文件操作放大，不让图片损失
   */
  const onDownloadPdfImagesZip = async (scale?: number, file?: File) => {
    const zip = new JSZip();
    const images = zip.folder('images');
    const selectedImages = convertedPdfImages.filter((image) => image.isSelect);
    //如果有file则会执行PDFJS
    const buff = await file?.arrayBuffer(); // Uint8Array
    const pdfDoc = buff ? await pdfjs.getDocument(buff).promise : undefined;
    //进行下载进度显示
    setCurrentPdfActionNum(0);
    setPdfTotalPages(selectedImages.length);
    setPdfIsLoad(true);
    isCancel.current = false;
    //开始处理单个文件
    for (let i = 0; i < selectedImages.length; i++) {
      if (isCancel.current) return;
      if (!scale) {
        images?.file(
          `image-${i + 1}.${toType}`,
          dataURLtoBlob(selectedImages[i].imgString),
          {
            base64: true,
          },
        );
      } else if (pdfDoc && scale) {
        const { imageDataUrl } = await generatePdfToImage(
          pdfDoc,
          selectedImages[0].definedIndex,
          scale,
        );

        images?.file(`image-${i + 1}.${toType}`, dataURLtoBlob(imageDataUrl), {
          base64: true,
        });
      }
      setCurrentPdfActionNum(i + 1);
    }
    console.log('simply ok');
    setPdfIsLoad(false);
    if (isCancel.current) return;
    if (selectedImages.length > 0) {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'images(MaxAI.me).zip');
      });
    } else {
      snackNotifications.warning('Please select at least one image.', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const dataURLtoBlob = async (base64Str: string) => {
    const arr = base64Str.split(',');
    const mime = arr?.[0].match(/:(.*?);/)?.[1];
    const bstr = Buffer.from(arr[1], 'base64').toString('binary');
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime,
    });
  };

  return {
    pdfPageHaveImgs,
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoad,
    onReadPdfToImages,
    onDownloadPdfImagesZip,
    pdfTotalPages,
    currentPdfActionNum,
    onCancelPdfActive,
    pdfViewDefaultSize,
    setPdfPageHaveImgs,
  };
};

export default usePdfToImageConversion;
